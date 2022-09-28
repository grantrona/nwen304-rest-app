const express = require('express');
const router = express.Router();
const path = require('path');

// Direct user to login page
router.use('/login', (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
    res.render('login', {isAuth: false})
});

// Direct user to sign up page
router.use('/signup', (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'public', 'register.html'));
    res.render('register', {isAuth: false})
});

// Navigate to add post html file
router.get('/addPost', (req, res) =>{
    // res.sendFile(path.join(__dirname, '..', 'public', 'add-post.html'));
    res.render('add-post', {isAuth: false})
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
    res.render('index', {posts : posts, isAuth: false})
});

module.exports=router