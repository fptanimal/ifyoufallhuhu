require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8899;

// Middleware
app.use(cors());
app.use(express.json());

// Phục vụ giao diện Frontend (từ thư mục ../frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// ── HELPER: Gọi Gemini API với auto-retry ──
async function callGemini(messages, retries = 2) {
    const apiKey = process.env.AI_API_KEY;
    const model = process.env.AI_MODEL || 'gemini-2.0-flash';

    if (!apiKey) throw new Error('NO_API_KEY');

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    // Convert OpenAI-style messages to Gemini format
    let systemInstruction = '';
    const geminiContents = [];

    messages.forEach(msg => {
        if (msg.role === 'system') {
            systemInstruction = msg.content;
        } else {
            geminiContents.push({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            });
        }
    });

    const geminiBody = {
        contents: geminiContents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
    };

    if (systemInstruction) {
        geminiBody.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiBody)
    });

    // Auto-retry on rate limit (429)
    if (response.status === 429 && retries > 0) {
        console.log(`⏳ Rate limited. Retrying in 5s... (${retries} retries left)`);
        await new Promise(r => setTimeout(r, 5000));
        return callGemini(messages, retries - 1);
    }

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API Error:', response.status);
        throw new Error(`GEMINI_ERROR_${response.status}`);
    }

    const data = await response.json();
    let aiText = '';
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
        aiText = data.candidates[0].content.parts.map(p => p.text).join('');
    }
    return aiText;
}

// ── API: GỌI AI CHATBOT ──
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        const aiText = await callGemini(messages);

        // Trả về định dạng OpenAI-compatible cho frontend
        res.json({
            choices: [{
                message: { role: 'assistant', content: aiText }
            }]
        });

    } catch (error) {
        console.error('Backend Error:', error.message);

        // Trả lỗi rõ ràng để frontend fallback offline
        let userMsg = 'Lỗi kết nối AI.';
        if (error.message === 'NO_API_KEY') {
            userMsg = 'Chưa cấu hình API Key.';
        } else if (error.message.includes('429')) {
            userMsg = 'Đã vượt giới hạn gọi API miễn phí. Vui lòng thử lại sau 1 phút.';
        }

        res.status(500).json({ error: userMsg, details: error.message });
    }
});

// Chuyển hướng về trang chủ
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Khởi động Server
app.listen(PORT, () => {
    const hasKey = !!process.env.AI_API_KEY;
    console.log('\n  ╔══════════════════════════════════════════╗');
    console.log('  ║  IF YOU FALL — FULLSTACK ARCHITECTURE    ║');
    console.log(`  ║  Server is running: http://localhost:${PORT} ║`);
    console.log(`  ║  AI Engine: Google Gemini ${hasKey ? '✅ KEY OK' : '❌ NO KEY'}        ║`);
    console.log('  ╚══════════════════════════════════════════╝\n');
});
