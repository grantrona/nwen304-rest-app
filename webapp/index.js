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
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use(cookieParser)
app.use('/',auth);

// TODO: Send index.ejs file
app.get('/',(req, res) => {
  res.send("Hello from server")
})

const HOSTNAME = '127.0.0.1';
const PORT = process.env.port || 3001;
const serverFunction = () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
}

server.listen(PORT, HOSTNAME, serverFunction);
module.exports = db;
