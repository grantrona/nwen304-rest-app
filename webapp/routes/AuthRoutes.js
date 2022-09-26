const express = require('express');
const router = express.Router();
const db = require('../index');
const { GoogleAuthProvider } = require('firebase/auth');
const googleProvider = new GoogleAuthProvider();
const auth = require('firebase/auth');

// Based on code from Firebase demos 
router.post('/login/email',(req,res) => {
  // Sign In with firebase function
  auth.signInWithEmailAndPassword(req.body.email, req.body.password)
  .then(user => {
      user.getIdToken().then( idToken => {
          const expiresIn = 60 * 60 * 24 * 5 * 1000;
          getAuth()
          .createSessionCookie(idToken, { expiresIn })
          .then(
            (sessionCookie) => {
              // Set cookie policy for session cookie.
              const options = { maxAge: expiresIn, httpOnly: true, secure: true };
              res.cookie('session', sessionCookie, options);
              res.render('home')
            },
            (error) => {
              res.status(401).send('Unauthorized request');
            }
          );
      })
      .catch(res.status(500).send('Internal Server Error'));
  })
  .catch(res.status(400).send('Incorrect Details'))
});

router.post('/login/google', (req, res) => {

});

router.post('/signup/email',(req,res) => {
  auth.createUserWithEmailAndPassword(req.body.email, req.body.password)
  .then(user => {
      user.getIdToken().then( idToken => {
          const expiresIn = 60 * 60 * 24 * 5 * 1000;
          getAuth()
          .createSessionCookie(idToken, { expiresIn })
          .then(
            (sessionCookie) => {
              // Set cookie policy for session cookie.
              const options = { maxAge: expiresIn, httpOnly: true, secure: true };
              res.cookie('session', sessionCookie, options);
              res.render('home')
            },
            (error) => {
              res.status(401).send('Unauthorized request');
            }
          );
      })
      .catch(res.status(500).send('Internal Server Error'));
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

module.exports = router;
