const express = require('express');
const router = express.Router();

// Any http request will be handled by rendering index.ejs:
router.use('/', (req, res) => {
    //Render index.ejs, passing the variable 'ExampleVariable'
    res.render('index', {'ExampleVariable' : 'wow'})
});

module.exports=router