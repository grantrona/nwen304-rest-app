const express = require('express');
const router = express.Router();
const { GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');
const googleProvider = new GoogleAuthProvider();
// const {auth, secret_key} = require('../index');
const jwt = require('jsonwebtoken');
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


function checkToken(req, res) {
  let cookie = req.cookie.session || '';
  jwt.verify(cookie, secret_key, (err, data)=>{
    if (err) res.sendStatus(400);
    else next();
  });
} 

// Based on code from Firebase demos 
router.post('/login/email',(req,res) => {
  // Sign In with firebase function
  signInWithEmailAndPassword(auth, req.body.email, req.body.password)
  .then(userCredentials => {
    let uidToken = {id: userCredentials.user.uid};
    let sessionCookie = jwt.sign(uidToken, secret_key, {expiresIn: 90000});
    res.cookie('session', sessionCookie, {httpOnly: true, sameSite: true});
    res.render('index');
  })
  .catch(res.status(400).send('Incorrect Details'))
});

router.post('/login/google', (req, res) => {

});

router.post('/signup/email',(req,res) => {
  createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
  .then(userCredentials => {
    console.log('DILI YOU ARE HERE');
    let uidToken = {id: userCredentials.user.uid};
    let sessionCookie = jwt.sign(uidToken, secret_key, {expiresIn: 90000});
    res.cookie('session', sessionCookie, {httpOnly: true, sameSite: true});
    res.render('index');
  })
  .catch((error) => {
      res.status(400).send(error.message);
  })
});

router.post('/signup/google', (req, res) => {
  
});

router.post('/logout',(req,res) => {
    const sessionCookie = req.cookies.session || '';
    res.clearCookie('session');
    getAuth()
        .verifySessionCookie(sessionCookie)
        .then((decodedClaims) => {
            return getAuth().revokeRefreshTokens(decodedClaims.sub);
        })
        .then(() => {
            res.redirect('/');
        })
        .catch((error) => {
            res.redirect('/');
        });

});

router.use('/protected', checkToken);


module.exports = router;
