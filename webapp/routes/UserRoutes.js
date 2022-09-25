const path = require('path')
const express = require('express');
const router = express.Router();

router.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports=router