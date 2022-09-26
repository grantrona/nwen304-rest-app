const express = require('express');
const router = express.Router();

// Direct user to login page
router.use('/pages/login', (req, res) => {
    res.render('loginPage');
});

// Direct user to sign up page
router.use('/pages/signup', (req, res) => {
    res.render('signupPage');
});

// Any http request will be handled by rendering index.ejs:
router.use('/', (req, res) => {
    //Render index.ejs, passing the variable 'ExampleVariable'
    res.render('index', {'ExampleVariable' : 'wow'})
});

module.exports=router