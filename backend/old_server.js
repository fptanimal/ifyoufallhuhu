const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8899;
const STATIC_DIR = __dirname;
const OLLAMA_TARGET = 'http://localhost:11434';

const MIME = {
    '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif',
    '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.json': 'application/json',
    '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
    // ── PROXY: /api/* → ollama.com/api/* ──
    if (req.url.startsWith('/api/')) {
        const targetUrl = OLLAMA_TARGET + req.url;
        const parsed = new URL(targetUrl);

        const proxyHeaders = { ...req.headers, host: parsed.host };
        delete proxyHeaders['origin'];
        delete proxyHeaders['referer'];

        const requestModule = parsed.protocol === 'https:' ? https : http;
        const proxyReq = requestModule.request({
            hostname: parsed.hostname,
            port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
            path: parsed.pathname + (parsed.search || ''),
            method: req.method,
            headers: proxyHeaders
        }, (proxyRes) => {
            res.writeHead(proxyRes.statusCode, {
                ...proxyRes.headers,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            });
            proxyRes.pipe(res);
        });

        proxyReq.on('error', (e) => {
            res.writeHead(502, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Proxy error: ' + e.message }));
        });

        if (req.method === 'OPTIONS') {
            res.writeHead(204, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            });
            return res.end();
        }

        req.pipe(proxyReq);
        return;
    }

    // ── STATIC FILE SERVER ──
    let filePath = path.join(STATIC_DIR, url.parse(req.url).pathname);
    if (filePath.endsWith(path.sep)) filePath += 'index.html';
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('Not Found');
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log('\n  ╔══════════════════════════════════════════╗');
    console.log('  ║  IF YOU FALL — Server + API Proxy        ║');
    console.log('  ║  http://localhost:' + PORT + '                  ║');
    console.log('  ║  /api/* → ' + OLLAMA_TARGET + '/api/*                ║');
    console.log('  ╚══════════════════════════════════════════╝\n');
});
