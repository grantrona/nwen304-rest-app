const secret_key = process.env.SECRET_KEY || 'secret_key';
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getAuth } = require('firebase/auth');
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
const auth = getAuth(firebaseApp);

module.exports = {app: firebaseApp, db: db, auth: auth, secret_key: secret_key};