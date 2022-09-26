const express = require('express');
const router = express.Router();

// Direct user to login page
router.use('/login', (req, res) => {
    res.render('auth-pages/login');
});

// Direct user to sign up page
router.use('/signup', (req, res) => {
    res.render('auth-pages/register');
});

// Add Post
// TODO: add new post to database
router.post('/addPost', (req, res) =>{
    console.log("Post add attempt");

    const postTitle = req.body.pTitle;
    const postContent = req.body.pContent;

    console.log("Title: ", postTitle, " Content: ", postContent);
    res.redirect('/');
})

// Navigate to add post html file
router.get('/addPost', (req, res) =>{
    res.render('add-post');
})


router.use('/', (req, res) => {
    //Render index.ejs, passing the variable 'ExampleVariable'
    res.render('index', {'ExampleVariable' : 'wow'})
});

module.exports=router