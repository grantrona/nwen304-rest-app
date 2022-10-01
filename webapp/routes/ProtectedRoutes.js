const express = require('express');
const router = express.Router();
const {db, auth, secret_key} = require('../utils/firebaseConfig');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { addDoc, collection } = require('firebase/firestore');

// Add Post
// TODO: add new post to database
router.post('/protected/addPost', (req, res) =>{
    let timestamp = moment().format('MM/DD/YY hh:mm:ss A');
    let creatorID = jwt.decode(req.cookies['session'], secret_key).id;
    let newPost = new Post(req.body.title, req.body.content, timestamp, creatorID);
    addDoc(collection(db, 'posts'), {...newPost});
    res.redirect('/');
}); 

router.get('/protected/myposts', (req, res) => {

});

module.exports = router;