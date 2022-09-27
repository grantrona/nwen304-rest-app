const express = require('express');
const router = express.Router();
const path = require('path');

// Direct user to login page
router.use('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

// Direct user to sign up page
router.use('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'register.html'));
});

// Navigate to add post html file
router.get('/addPost', (req, res) =>{
    res.sendFile(path.join(__dirname, '..', 'public', 'add-post.html'));
})


router.use('/', (req, res) => {
    const posts = [
        {
            title: "testTitle",
            content: "testContent"
        },
        {
            title: "Another title",
            content: "Another Content"
        }
    ]; // TODO: get list of posts from database.
    res.render('index', {posts : posts})
});

module.exports=router