const http = require('http');
const express = require('express');
const userRoutes = require('./routes/UserRoutes');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use(userRoutes);

const server = http.createServer(app);
server.listen(3000);
