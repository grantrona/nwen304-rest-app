const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello There');
});


const hostname = '127.0.0.1';
const port = 3001;
const serverFunction = () => {
    console.log(`Server running at http://${hostname}:${port}/`);
}

server.listen(port, hostname, serverFunction);
