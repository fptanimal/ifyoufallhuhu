export default async function handler(req, res) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Max-Age', '86400');
        return res.status(204).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const targetUrl = 'https://ollama.com/api/chat';

        // Forward the request to Ollama
        const proxyHeaders = {
            'Content-Type': 'application/json'
        };

        // Forward Authorization header if present
        if (req.headers.authorization) {
            proxyHeaders['Authorization'] = req.headers.authorization;
        }

        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: proxyHeaders,
            body: JSON.stringify(req.body)
        });

        const data = await response.json();

        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(response.status).json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(502).json({
            error: 'Proxy error',
            message: error.message
        });
    }
}
