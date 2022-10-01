const express = require('express');
const authRoutes = express.Router();
const { GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithCredential, signOut, updateProfile } = require('firebase/auth');
const { getDoc, setDoc, doc } = require('firebase/firestore');
const jwt = require('jsonwebtoken');
const {db, auth, secret_key} = require('../utils/firebaseConfig');

// Middleware checks token is valid before continuing with request
function checkToken(req, res, next) {
  let cookie = req.cookies['session'] || '';
  jwt.verify(cookie, secret_key, (err, data)=>{
    if (err) res.sendStatus(400);
    else next();
  });
} 

// Based on code from Firebase demos 
authRoutes.post('/login/email',(req,res) => {
  // Sign In with firebase function
  signInWithEmailAndPassword(auth, req.body.email, req.body.password)
  .then(userCredentials => {
    let uidToken = {id: userCredentials.user.uid};
    let sessionCookie = jwt.sign(uidToken, secret_key, {expiresIn: 90000});
    res.cookie('session', sessionCookie, {httpOnly: true, sameSite: true});
    res.sendStatus(200);
  })
  .catch(err=> {
    res.status(400).send(err.message)
  })

});

authRoutes.post('/login/google', (req, res) => {
  const idToken = req.body.idToken; 
  const credential = GoogleAuthProvider.credential(idToken);
  signInWithCredential(auth, credential)
  .then(userCredentials => {
    let uidToken = {id: userCredentials.user.uid};
    let sessionCookie = jwt.sign(uidToken, secret_key, {expiresIn: 90000});
    getDoc(doc(db,'users',userCredentials.user.uid))
    .then(docSnapshot => {
      if (!docSnapshot.exists()){
        setDoc(doc(db,'users',userCredentials.user.uid), {displayName: userCredentials.user.displayName})
        .then(()=>{
          res.cookie('session', sessionCookie, {httpOnly: true, sameSite: true});
          res.sendStatus(200);
        });
      } else {
        res.cookie('session', sessionCookie, {httpOnly: true, sameSite: true});
        res.sendStatus(200);
      }
    })
  })
});

authRoutes.post('/signup/email',(req,res) => {
  createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
  .then(userCredentials => {
    let uidToken = {id: userCredentials.user.uid};
    let sessionCookie = jwt.sign(uidToken, secret_key, {expiresIn: 90000});
    updateProfile(userCredentials.user, {displayName: req.body.displayName});
    setDoc(doc(db,'users',userCredentials.user.uid), {displayName: req.body.displayName})
    .then(()=>{
      res.cookie('session', sessionCookie, {httpOnly: true, sameSite: true});
      res.sendStatus(200);
    });
  })
  .catch((error) => {
      res.status(400).send(error.message);
  })
});


authRoutes.get('/signout',(req,res) => {
  signOut(auth)
  .then(()=>{
    res.clearCookie('session', {httpOnly: true, sameSite: true});
    res.redirect('/');
  })
});

// Middleware added to anything in /protected route
authRoutes.use('/protected', checkToken);


module.exports = authRoutes;
