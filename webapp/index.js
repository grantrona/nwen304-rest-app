const http = require('http');
const express = require('express');
const userRoutes = require('./routes/UserRoutes');
const path = require('path');

const app = express();

// Setup ejs template engine:
app.set("view engine", 'ejs');
app.set('views', 'views'); // point to 'views' folder

// specify static files and routes to use:
app.use(express.static(path.join(__dirname, 'public')));
app.use(userRoutes);

// Create server and listen on port 3000:
const server = http.createServer(app);
server.listen(3000);
