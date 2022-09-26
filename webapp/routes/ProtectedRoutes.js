const express = require('express');
const router = express.Router();
const db = require('../index');

router.post('/post', (req,res) => {
    let sessionCookie = req.cookies.session || '';
    // TODO 
    res.send('home');
});