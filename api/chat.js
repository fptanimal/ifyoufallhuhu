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

    // --- GIỮ NGUYÊN PHẦN TRÊN CỦA CÁC EM (Dòng 1-17) ---

    // 1. Lấy dữ liệu từ yêu cầu của người dùng
    const { prompt, history } = req.body;

    // 2. Kiểm tra API Key (đã đặt trong .env.local)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "Thiếu GEMINI_API_KEY trong cấu hình hệ thống." });
    }

    try {
        const { GoogleGenerativeAI } = require("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(apiKey);
        
        // Sử dụng model Flash cho tốc độ nhanh và phản hồi tức thì
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            // Đây là nơi thiết lập "Bác sĩ AI" nghiêm túc, không bị lừa
            systemInstruction: "Bạn là Bác sĩ AI (Mô phỏng). Trả lời dựa trên kiến thức y khoa thực tế. Nếu người dùng đưa tin giả hoặc sai lệch, hãy đính chính ngay. Luôn kèm cảnh báo kết quả chỉ mang tính tham khảo.",
        });

        // 3. Khởi tạo chat với lịch sử phiên (Session) để AI nhớ bối cảnh
        const chat = model.startChat({
            history: history || [], 
            generationConfig: {
                temperature: 0.2, // Giữ độ chính xác cao, chống 'chém gió'
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();

        // 4. Trả kết quả về cho Frontend
        res.setHeader('Access-Control-Allow-Origin', '*'); // Đảm bảo trả về header cho trình duyệt
        return res.status(200).json({ text });

    } catch (error) {
        console.error("Lỗi API Gemini:", error);
        return res.status(500).json({ error: "AI đang bận, vui lòng thử lại sau!" });
    }
}
async function handleGemini(req, res, messages, apiKey) {
    try {
        const { GoogleGenerativeAI } = require("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: "Bạn là Bác sĩ AI (Mô phỏng). Trả lời dựa trên kiến thức y tế. Nếu người dùng đưa tin giả, hãy đính chính ngay. Luôn kèm cảnh báo kết quả chỉ mang tính tham khảo.",
        });

        // Chuyển đổi định dạng tin nhắn cho phù hợp với Gemini
        // Gemini cần 'user' và 'model', các em có thể cần map lại nếu frontend gửi khác
        const chat = model.startChat({
            history: messages.slice(0, -1).map(msg => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }],
            })),
        });

        const lastMessage = messages[messages.length - 1].content;
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(200).json({ text: response.text() });
    } catch (error) {
        console.error("Lỗi Gemini:", error);
        return res.status(500).json({ error: "AI đang bận, thử lại sau nhé!" });
    }
}