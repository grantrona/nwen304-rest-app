const express = require('express');
const authRoutes = express.Router();
const { GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithCredential, signOut, updateProfile, signInWithCustomToken, OAuthCredential } = require('firebase/auth');
const { getDoc, setDoc, doc, getDocs, collection, QuerySnapshot, addDoc, query, where, limit } = require('firebase/firestore');
const jwt = require('jsonwebtoken');
const {db, auth, secret_key, secret_message} = require('../utils/firebaseConfig');
const { sha256 } = require('js-sha256');
const { nanoid } = require('nanoid');
const CryptoJS = require('crypto-js');

/*
  All tokens expire in 300 seconds (5 minutes).
  Can be changed to less or more if we want to demo.  
*/
 
// Middleware checks token is valid before continuing with request
function checkToken(req, res, next) {
  let cookie = req.cookies['session'] || '';
  jwt.verify(cookie, secret_key, (err, data)=>{
    if (err) {
      res.status(401);
      res.render('error',{message: "Credentials expired or incorrect, please login again"});
    }
    else {
      if (!(CryptoJS.AES.decrypt(data['secretID'],secret_key).toString(CryptoJS.enc.Utf8).includes(secret_message))) {
        res.render('error',{message: "Credentials expired or incorrect, please login again"});
      } else {
        next();
      }
    }
  })
} 

function refreshToken(req, res, next) {
  let cookie = req.cookies['session'] || '';
  let data = jwt.decode(cookie, secret_key);
  delete data.iat;
  delete data.exp;
  res.cookie(jwt.sign(data, secret_key, {expiresIn: 300}));
  next();
}

// Based on code from Firebase demos 
authRoutes.post('/login/email',(req,res) => {
  getDocs(query(collection(db,'users'), where("email", "==", req.body.email), limit(1)))
  .then((docSnapshot) => {
    if (docSnapshot.empty) {res.status(400).send("No account with this email found"); return; }
    docSnapshot.forEach(doc => {
      if (doc.exists()) {
        if (sha256(req.body.password) == doc.data()['password']) {
          let secretID = CryptoJS.AES.encrypt(nanoid()+secret_message,secret_key).toString();
          let uidToken = {email: doc.data()['email'],displayName: doc.data()['displayName'],secretID:secretID,id: doc.id};
          let sessionCookie = jwt.sign(uidToken, secret_key, {expiresIn: 300});
          res.cookie('session', sessionCookie, {httpOnly: true, sameSite: true});
          res.sendStatus(200);
        } else {
          res.status(400).send("Incorrect password");
        }
      }
    })
  })
  .catch(err=> {
      res.status(400).send(err.message)
  })
});

authRoutes.post('/login/google', (req, res) => {
  const idToken = req.body.idToken; 
  const credential = GoogleAuthProvider.credential(idToken);
  let email = jwt.decode(credential['idToken'])['email'];
  getDocs(query(collection(db,'users'), where("email","==",email), limit(1)))
  .then(snapshot => {
    if (!snapshot.empty) {
      let doc = snapshot.docs[0];
      let secretID = CryptoJS.AES.encrypt((nanoid()+secret_message),secret_key).toString();
      let uidToken = {...doc.data(),secretID:secretID,id: doc.id};
      let sessionCookie = jwt.sign(uidToken, secret_key, {expiresIn: 300});
      res.cookie('session', sessionCookie, {httpOnly: true, sameSite: true});
      res.sendStatus(200);
      return;
    }
    else {
      signInWithCredential(auth, credential)
      .then(userCredentials => {
        getDoc(doc(db,'users',userCredentials.user.uid))
        .then(docSnapshot => {
          let userData = {
            email:userCredentials.user.email,
            displayName:userCredentials.user.displayName,
          };     
          let secretID = CryptoJS.AES.encrypt(nanoid()+secret_message,secret_key).toString();
          let uidToken = {email: doc.data()['email'],displayName: doc.data()['displayName'],secretID:secretID,id: doc.id};
          let jwtToken = jwt.sign(uidToken, secret_key, {expiresIn: 300});
          if (!docSnapshot.exists()){
            setDoc(doc(db,'users',userCredentials.user.uid), userData)
            .then(()=>{
              res.cookie('session', jwtToken, {httpOnly: true, sameSite: true});
              res.sendStatus(200);
            });
          } else {
            res.cookie('session', jwtToken, {httpOnly: true, sameSite: true});
            res.sendStatus(200);
          }
        })
      })
    }
  })
});

function checkPassword (password) {
  if (password.length <= 6) return "Password must be greater than 6 characters";
  if (password.search(/[A-Z]/) == -1) return "Password must contain an uppercase letter";
  if (password.search(/[0-9]/) == -1) return "Password must contain a number";
  if (password.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) == -1) return "Password must contain a special character";
  return "";
}

/* 
  Get email, password and display name from user.
  Create web token based on this information and a secret key.
  Add web token to data and put in firebase collection.
  
*/
authRoutes.post('/signup/email',(req,res) => {
  let password = req.body.password;
  let passwordResp = checkPassword(password);
  if (passwordResp != "") {
    res.status(400).send(passwordResp);
    return;
  }
  getDocs(query(collection(db,'users'), where("email","==",req.body.email)))
  .then((docsSnapshot) => {
    if (!docsSnapshot.empty) res.status(403).send("User already exists with this email");
    else {
      let userData = {
        email: req.body.email,
        displayName: req.body.displayName,
        password: sha256(password), 
      }
      addDoc(collection(db,'users'), userData)
      .then(
        res.sendStatus(200)
      );
    }
  })  
  .catch((error) => {
    res.status(403).send(error.message);
  })
});


authRoutes.get('/signout',(req,res) => {
  res.clearCookie('session', {httpOnly: true, sameSite: true});
  res.redirect('/');
});

// Middleware added to anything in /protected route
authRoutes.use('/protected', checkToken, refreshToken);


module.exports = authRoutes;
