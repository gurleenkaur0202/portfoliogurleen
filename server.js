const http = require('http');
const fs = require('fs');
const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

//  Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, "public")));

//  Serve your index.html when someone opens the URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log( 'Website is running on port ${PORT}');
});
    const hostname = 'localhost'; // or process.env.HOSTNAME
    const port = 3000; // or process.env.PORT
    
const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';  // default file
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(500);
                res.end('Server Error: ${error.code}');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
});
