const express = require('express');
const router = express.Router();
const { GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithCredential, signOut } = require('firebase/auth');
const jwt = require('jsonwebtoken');
const {auth, secret_key} = require('../utils/firebaseConfig');

// Middleware checks token is valid before continuing with request
function checkToken(req, res, next) {
  let cookie = req.cookies['session'] || '';
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
    res.sendStatus(200);
  })
  .catch(res.status(400).send('Incorrect Details'))
});

router.post('/login/google', (req, res) => {
  const idToken = req.body.idToken; 
  const credential = GoogleAuthProvider.credential(idToken);
  signInWithCredential(auth, credential)
  .then(userCredentials => {
    let uidToken = {id: userCredentials.user.uid};
    let sessionCookie = jwt.sign(uidToken, secret_key, {expiresIn: 90000});
    res.cookie('session', sessionCookie, {httpOnly: true, sameSite: true});
    console.log(auth.currentUser.displayName);
    res.sendStatus(200);
  })
});

router.post('/signup/email',(req,res) => {
  createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
  .then(userCredentials => {
    let uidToken = {id: userCredentials.user.uid};
    let sessionCookie = jwt.sign(uidToken, secret_key, {expiresIn: 90000});
    res.cookie('session', sessionCookie, {httpOnly: true, sameSite: true});
    res.sendStatus(200);
  })
  .catch((error) => {
      res.status(400).send(error.message);
  })
});


router.get('/signout',(req,res) => {
  console.log('signing out');
  signOut(auth);
  res.clearCookie('session', {httpOnly: true, sameSite: true});
  res.redirect('/');
});

// Middleware added to anything in /protected route
router.use('/protected', checkToken);


module.exports = router;
