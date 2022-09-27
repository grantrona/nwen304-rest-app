const express = require('express');
const router = express.Router();
const db = require('../index');

// Add Post
// TODO: add new post to database
router.post('/protected/addPost', (req, res) =>{
    console.log("Post add attempt");

    const postTitle = req.body.title;
    const postContent = req.body.content;

    console.log("Title: ", postTitle, " Content: ", postContent);
    res.redirect('/');
}); 

module.exports = router;