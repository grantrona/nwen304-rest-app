const http = require('http');
const express = require('express');
const auth = require('./routes/AuthRoute');
const cookieParser = require('cookie-parser')
const cors = require('cors');
require('firebase/app');
const { getFirestore } = require('firebase/firestore');
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

const app = express();

// Setup ejs template engine:
app.set("view engine", 'ejs');
app.set('views', 'views'); // point to 'views' folder

app.use(cors());
app.use(express.json());
app.use(cookieParser)
app.use('/',auth);

// specify static files and routes to use:
app.use(express.static(path.join(__dirname, 'public')));
app.use(userRoutes);

// Create server and listen on PORT:
const server = http.createServer(app);
const PORT = process.env.port || 3000;
server.listen(PORT);

module.exports = db;
