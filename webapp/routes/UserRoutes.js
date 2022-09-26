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

// TODO: add new post to database
router.post('/addPost/add', (req, res) =>{
    console.log("Post add attempt");
    res.redirect('/');
})

router.get('/addPost', (req, res) =>{
    res.render('add-post');
})


router.use('/', (req, res) => {
    //Render index.ejs, passing the variable 'ExampleVariable'
    res.render('index', {'ExampleVariable' : 'wow'})
});

module.exports=router