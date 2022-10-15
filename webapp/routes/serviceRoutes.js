const express = require('express');
const router = express.Router();
const { addPost, getPosts } = require('../controller/database');
const { serviceLogin } = require('../controller/auth');

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

/**
 * Responsed to POST requests by authenticating the request and adding a post.
 * 
 * The request body requires email, password, title and content parameters.
 *  - email and password must be for a valid registered user.
 *  - title and content are used to define to post to add.
 */
router.post('/service', (req, res) => {
    // body should contain email, password, title and content

    const creatorID = serviceLogin(req.body.email, req.body.password);
    if(creatorID === null){ // Unable to retrieve email / password login
        res.sendStatus(401); // Unauthorized
        return;
    }

    const timestamp = moment().format('MM/DD/YY hh:mm:ss A')
    const newPost = new Post(req.body.title, req.body.content, timestamp, creatorID);
    addPost(newPost);
});

module.exports = router;