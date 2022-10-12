/*----------------------------------- Initialize variables ------------------------------------------*/
const http = require('http');
const express = require('express');
const authRoutes = require('./routes/AuthRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/UserRoutes');
const protectedRoutes = require('./routes/ProtectedRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
/*----------------------------------- Server config ------------------------------------------*/
const app = express();
// Setup ejs template engine:
app.set("view engine", 'ejs');
app.set('views', 'views'); // point to 'views' folder
app.use(cors());
app.use(express.json());
app.use(cookieParser())
// specify static files and routes to use:
app.use(express.static(path.join(__dirname, 'public')));
app.use(serviceRoutes);
app.use(authRoutes);
app.use(protectedRoutes);
app.use(userRoutes);
// Create server and listen on PORT:
const server = http.createServer(app);
const PORT = process.env.port || 3000;
server.listen(PORT);
