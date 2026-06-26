const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = {
  '.html':'text/html','.css':'text/css','.js':'text/javascript',
  '.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml',
  '.ico':'image/x-icon','.webp':'image/webp','.woff2':'font/woff2',
  '.json':'application/json'
};
http.createServer((req, res) => {
  let file = req.url === '/' ? '/index.html' : req.url;
  file = path.join(__dirname, file);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('404'); return; }
    const ext = path.extname(file);
    res.writeHead(200, {'Content-Type': mime[ext] || 'application/octet-stream'});
    res.end(data);
  });
}).listen(5051, () => console.log('ok'));
