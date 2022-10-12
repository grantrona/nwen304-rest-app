const express = require('express');
const router = express.Router();
const { addPost, getPosts } = require('../controller/database');

/**
 * Responds to GET requests by sending JSON of posts.
 * 
 * GET request expects a count parameter, but will default to 5
 * posts if it is missing.
 */
router.get('/service', (req, res) => {
    countQuery = req.query.count;
    count = countQuery === undefined ? 5 : countQuery;
    
    getPosts(count)
        .then((posts) => {
            res
                .status(200)
                .json(posts)
        });
});

router.post('/service', (req, res) => {
    
});

module.exports = router;