import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    // 1. Cấu hình CORS để Frontend có thể gọi vào
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 2. Lấy dữ liệu và API Key
    const { prompt, history } = req.body;
    const apiKey = process.env.AI_API_KEY; // Khớp với tên bạn đặt trên Vercel

    if (!apiKey) {
        return res.status(500).json({ error: "Lỗi: Thiếu AI_API_KEY trên Vercel." });
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
            model: process.env.AI_MODEL || "gemini-1.5-flash",
            systemInstruction: "Bạn là Bác sĩ AI (Mô phỏng). Trả lời dựa trên kiến thức y khoa. Luôn cảnh báo kết quả chỉ mang tính tham khảo.",
        });

        const chat = model.startChat({
            history: history || [], 
            generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 1000,
            },
        });

        // Nếu prompt trống thì mặc định là xin chào
        const result = await chat.sendMessage(prompt || "Xin chào bác sĩ");
        const response = await result.response;
        
        return res.status(200).json({ text: response.text() });

    } catch (error) {
        console.error("Lỗi Gemini:", error);
        return res.status(500).json({ error: "AI lỗi: " + error.message });
    }
}