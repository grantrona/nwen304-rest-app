/*----------------------------------- Initialize variables ------------------------------------------*/
const http = require('http');
const express = require('express');
const authRoutes = require('./routes/AuthRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/UserRoutes');
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');


/*----------------------------------- Firebase config ------------------------------------------*/
const firebaseConfig = {
  apiKey: "AIzaSyBx5tthRrnsBWbmEKdpDOqao-oTZAa851w",
  authDomain: "nwen304-rest-app.firebaseapp.com",
  projectId: "nwen304-rest-app",
  storageBucket: "nwen304-rest-app.appspot.com",
  messagingSenderId: "852370644536",
  appId: "1:852370644536:web:a9b5224f4b0de9cd7650cd"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);


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
app.use(userRoutes);
app.use(authRoutes);
// Create server and listen on PORT:
const server = http.createServer(app);
const PORT = process.env.port || 3000;
server.listen(PORT);
module.exports = db;
