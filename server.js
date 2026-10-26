const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const PORTS = [3000, 3005];

PORTS.forEach(port => {
  const instance = http.createServer((req, res) => {
    // Parse URL
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    let pathname = decodeURIComponent(reqUrl.pathname);

    if (pathname === '/') {
      pathname = '/index.html';
    }

    const filePath = path.join(PUBLIC_DIR, pathname);

    // Security: Prevent directory traversal
    if (!filePath.startsWith(PUBLIC_DIR)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('403 Forbidden');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        // Fallback to index.html for client-side routing
        const indexPath = path.join(PUBLIC_DIR, 'index.html');
        fs.readFile(indexPath, (indexErr, indexData) => {
          if (indexErr) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.end(indexData);
        });
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      fs.readFile(filePath, (readErr, data) => {
        if (readErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('500 Internal Server Error');
          return;
        }
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'no-cache'
        });
        res.end(data);
      });
    });
  });

  instance.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} already active or in use.`);
    } else {
      console.error(`Error on port ${port}:`, err.message);
    }
  });

  instance.listen(port, () => {
    console.log(`🚀 CoBuild Application is active on http://localhost:${port}`);
  });
});

