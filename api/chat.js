import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { prompt } = req.body;
    const apiKey = process.env.AI_API_KEY;

    if (!apiKey) return res.status(500).json({ error: "Lỗi: Vercel chưa có AI_API_KEY" });

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt || "Xin chào");
        const response = await result.response;
        return res.status(200).json({ text: response.text() });
    } catch (error) {
        return res.status(500).json({ error: "Lỗi Gemini: " + error.message });
    }
}