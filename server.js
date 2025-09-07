/**
 * Servidor de desenvolvimento simples
 * Para uso com Node.js quando não houver servidor HTTP disponível
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8080;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // Redirecionar / para /index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    const filePath = path.join(__dirname, pathname);
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = mimeTypes[ext] || 'application/octet-stream';
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`
                    <html>
                        <head><title>404 - Página não encontrada</title></head>
                        <body>
                            <h1>404 - Página não encontrada</h1>
                            <p>A página solicitada não foi encontrada.</p>
                            <a href="/">Voltar ao início</a>
                        </body>
                    </html>
                `);
            } else {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`
                    <html>
                        <head><title>500 - Erro interno</title></head>
                        <body>
                            <h1>500 - Erro interno do servidor</h1>
                            <p>Ocorreu um erro ao processar sua solicitação.</p>
                        </body>
                    </html>
                `);
            }
        } else {
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(data);
        }
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📁 Servindo arquivos de: ${__dirname}`);
    console.log(`🌐 Abra http://localhost:${PORT} no seu navegador`);
    console.log(`⏹️  Pressione Ctrl+C para parar o servidor`);
});

// Tratamento de sinais para encerramento graceful
process.on('SIGINT', () => {
    console.log('\n🛑 Encerrando servidor...');
    server.close(() => {
        console.log('✅ Servidor encerrado com sucesso!');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Encerrando servidor...');
    server.close(() => {
        console.log('✅ Servidor encerrado com sucesso!');
        process.exit(0);
    });
});
