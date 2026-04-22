// Vercel API endpoint para sa AI Chat
// Nag-forward sa backend server o Gemini API

export default async function handler(req, res) {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Max-Age', '86400');
        return res.status(204).end();
    }

    if (req.method !== 'POST') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(400).json({ error: 'Invalid request: messages array required' });
    }

    try {
        // Try to use Gemini API if key is available
        const apiKey = process.env.GEMINI_API_KEY;
        
        if (apiKey) {
            return handleGemini(req, res, messages, apiKey);
        }
        
        // Fallback: return basic response
        const defaultResponse = 'Xin lỗi, hệ thống AI hiện không khả dụng. Vui lòng thử lại sau hoặc chạy backend server để sử dụng AI Chat.';
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(503).json({
            choices: [{
                message: {
                    role: 'assistant',
                    content: defaultResponse
                }
            }]
        });
        
    } catch (error) {
        console.error('Chat API Error:', error);
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(500).json({
            error: 'Server error',
            message: error.message
        });
    }
}

async function handleGemini(req, res, messages, apiKey) {
    const model = 'gemini-2.0-flash';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    // Convert to Gemini format
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

    const body = {
        contents: geminiContents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
    };

    if (systemInstruction) {
        body.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`Gemini API error: ${data.error?.message || response.statusText}`);
    }

    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Không có phản hồi từ AI';

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({
        choices: [{
            message: {
                role: 'assistant',
                content: aiText
            }
        }]
    });
}
