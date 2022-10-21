const { db, secret_key } = require('../utils/firebaseConfig');
const { 
  collection, 
  query, 
  where, 
  getDocs, 
  limit, 
  doc, 
  getDoc, 
  setDoc
} = require('firebase/firestore');
const { sha256 } = require('js-sha256');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('./mail');

/**
 * Returns doc for the user specified by the given email.
 * 
 * @param {string} email Email address of user to get.
 * @return {Document} Returns a Firestore Document of the user.
 */
 function getUserByEmail(email){
  return getDocs(query(collection(db,'users'), where("email", "==", email), limit(1)))
    .then((docSnapshot) => {
      if (docSnapshot.empty) {return null;}
      for(const doc of docSnapshot.docs){
        if (doc.exists()) {
          return doc;
        }
      }
      return null;
    })
}

/**
 * Returns the doc on the user specified by the given user ID.
 * 
 * @param {string} id ID of user to get.
 * @return {Document} Returns a Firestore Document of the user.
 */
 function getUserByID(id){
  return getDoc(doc(db,'users', id))
    .then((doc) => {
        if (doc.exists()) {
          return doc;
        }
      return null;
    })
}

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
    return getUserByEmail(email)
      .then((doc) => {
        if(doc === null) return null;
        if (sha256(password) == doc.data()['password']) {
          return doc.id; // doc id should be the creatorID
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.error(err);
        return null;
      })
}

/**
 * Updates the password of the user specified by given email address.
 * 
 * @param {string} email Email of the user to update.
 */
function sendPasswordResetEmail(email){
  return getUserByEmail(email)
    .then((doc) => {
      if(doc === null) return false; // user doesnt exist
      if(doc.get('password') === null) return false; // google account
      const user = doc.data();
      const secret = secret_key + doc.password;
      const token = jwt.sign(
        {email: user.email, id: doc.id}, 
        secret, 
        {expiresIn: 300} // 5 minutes
      ); 
      const link = `http://localhost:3000/reset-password/${doc.id}/${token}`;
      console.log(link);

      const subject = "NWEN304 Chirper: password reset";
      const content = `Click the following link to reset your Chirper password:\n${link}`;
      sendEmail(email, subject, content);
      
      return true;
    });
}

/**
 * Checks that the given token is valid for the given user.
 * 
 * @param {string} id User ID to check.
 * @param {string} token Token to check against the user.
 * @returns True if the given token fits with the given user, false otherwise.
 */
function isValidToken(id, token){
  const user = getUserByID(id);
  if(user === null) return false;

  const secret = secret_key + user.password;
  try {
    const verify = jwt.verify(token, secret);
    return true;
  }catch (err){
    return false;
  }
}

/**
 * Updates the user specified with a given id.
 * 
 * @param {string} id Id of the user to update.
 * @param {string} name New name to update to.
 * @param {string} email New email to update to.
 * @param {string} password New password to update to
 * @returns A Promise<void>, which resolves once doc us successfully updated.
 */
function updateUser(id, name, email, password){
  const updatedUser = {
    displayName: name,
    email: email,
    password: password,
  };

  return setDoc(doc(db, "users", id), updatedUser);
}

/**
 * Updates the password of the specified user to newPassword.
 * 
 * Uses the updateUser method to change the password, which updates all fields.
 * 
 * @param {string} id ID of the user to change.
 * @param {string} newPassword The new password to update to.
 */
function updatePassword(id, newPassword){
  const encryptedPassword = sha256(newPassword);
  getUserByID(id).then((oldUserDoc) => {
    const oldUser = oldUserDoc.data();
    console.log("Old user: ", oldUser);
    updateUser(id, oldUser.displayName, oldUser.email, encryptedPassword)
    .then(() => {
      getUserByID(id)
      .then((newUserDoc) => {
        console.log("New User: ", newUserDoc.data());
      });
    });
  });
  
  
}

module.exports = { 
  serviceLogin, 
  sendPasswordResetEmail, 
  isValidToken, 
  updatePassword 
};