const {db, secret_key} = require('../utils/firebaseConfig');
const jwt = require('jsonwebtoken');
const { collection, query, where, getDocs} = require('firebase/firestore');

/**
 * Attempts to find the user with the given email and checks their hashed password matches.
 * 
 * Will return null if user cannot be found or an error occurs.
 * 
 * @param {string} email Email to login with.
 * @param {string} password Password to login with.
 * @return {string} The creatorID of the given account, or null if unable to retrieve.
 */
function serviceLogin(email, password){
    getDocs(query(collection(db,'users'), where("email", "==", email), limit(1)))
    .then((docSnapshot) => {
      if (docSnapshot.empty) {return null;}
      docSnapshot.forEach(doc => {
        if (doc.exists()) {
          if (sha256(password) == doc.data()['password']) {
            return doc.data()['creatorID'];
          } else {
            return null;
          }
        }
      })
    })
    .catch(err=> {
        return null;
    })
}

module.exports = { serviceLogin };