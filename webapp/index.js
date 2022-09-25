const http = require('http');
const express = require('express');
const userRoutes = require('./routes/UserRoutes');

const app = express();

app.use(userRoutes);

const server = http.createServer(app);
server.listen(3000);
