const express = require('express');
const router = express.Router();
const moment = require('moment');
const { addPost, getPosts } = require('../controller/database');
const { serviceLogin } = require('../controller/auth');
const Post = require('../models/Post');

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
    if(req.body.email === undefined || req.body.password === undefined
        || req.body.title === undefined || req.body.content === undefined){
        res.sendStatus(400);
        return;
    }

    serviceLogin(req.body.email, req.body.password)
        .then((creatorID) => {
            if(creatorID === null || creatorID === undefined){ // Unable to retrieve email / password login
                res.sendStatus(401); // Unauthorized
                return;
            }
            
            const timestamp = moment().format('MM/DD/YY hh:mm:ss A')
            const newPost = new Post(req.body.title, req.body.content, timestamp, creatorID);
            addPost(newPost);
            res.sendStatus(200)
        })
        .catch((err) => {
            res.sendStatus(500);
        });
});

module.exports = router;