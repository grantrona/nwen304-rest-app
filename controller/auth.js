const {db} = require('../utils/firebaseConfig');
const { collection, query, where, getDocs, limit} = require('firebase/firestore');
const { sha256 } = require('js-sha256');
const { getAuth, sendPasswordResetEmail } = require('firebase/auth');

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
  return getDocs(query(collection(db,'users'), where("email", "==", email), limit(1)))
    .then((docSnapshot) => {
      if (docSnapshot.empty) {return null;}
      for(doc of docSnapshot.docs){
        if (doc.exists()) {
          if (sha256(password) == doc.data()['password']) {
            console.log("MATCH: ", doc.id);
            return doc.id; // doc id should be the creatorID
          } else {
            console.log("NON-MATCH");
            return null;
          }
        }
      }
      console.log("HOW DID I GET HERE");
      return null;
    })
    .catch(err=> {
      return null;
    })
}

/**
 * Returns the current user based on the creatorID in 
 */
function getCurrentUser(){
  
}

function sendPasswordReset(email){
  return sendPasswordResetEmail(getAuth(), email);
}

module.exports = { serviceLogin, sendPasswordReset };