const express = require('express');
const router = express.Router();
const { db } = require('../utils/firebaseConfig');
const { doc, getDocs, collection, getDoc } = require('firebase/firestore');

// Direct user to login page
router.use('/login', (req, res) => {
    res.render('login', {isAuth: req.cookies['session']? true: false})
});

// Direct user to sign up page
router.use('/signup', (req, res) => {
    res.render('register', {isAuth: req.cookies['session']? true: false})
});

// Navigate to add post html file
router.get('/addPost', (req, res) =>{
    res.render('add-post', {isAuth: req.cookies['session']? true: false})
})

/** Temporarily in UserRoutes, should be moved to util perhaps? */
async function getPosts(){
    const posts = [];
    const postsSnapshot = await getDocs(collection(db, "posts"));
    postsSnapshot.forEach((postDoc) =>{
        posts.push(postDoc.data())
    });
    return posts
}

router.use('/', (req, res) => {
    const isAuth = req.cookies['session']? true: false;
    getPosts().then((posts)=> {
        res.render('index', {posts : posts, isAuth: isAuth})
    });
});

module.exports=router