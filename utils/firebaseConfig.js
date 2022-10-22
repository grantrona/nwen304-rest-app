require("dotenv").config();

const secret_key = process.env.SECRET_KEY || 'secret_key';
const secret_message = process.env.SECRET_MESSAGE || 'secret_message';
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getAuth } = require('firebase/auth');
/*----------------------------------- Firebase config ------------------------------------------*/

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "nwen304-rest-app.firebaseapp.com",
  projectId: "nwen304-rest-app",
  storageBucket: "nwen304-rest-app.appspot.com",
  messagingSenderId: "852370644536",
  appId: "1:852370644536:web:a9b5224f4b0de9cd7650cd"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

module.exports = {app: firebaseApp, db: db, auth: auth, secret_key: secret_key, secret_message: secret_message};