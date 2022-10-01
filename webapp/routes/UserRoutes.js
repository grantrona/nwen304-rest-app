const express = require('express');
const router = express.Router();
const { db } = require('../utils/firebaseConfig');
const { getDocs, where, query, getDoc, doc, collection} = require('firebase/firestore');
const moment = require('moment');

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
});


router.get('/userPosts', (req, res) => {
    const isAuth = req.cookies['session']? true: false;
    if (req.query.creatorID == undefined) res.sendStatus(400);
    const timeStampFormat = 'MM/DD/YY hh:mm:ss A';
    const userQuery = query(collection(db, "posts"), where("creatorID", "==", req.query.creatorID));
    getDocs(userQuery)
    .then(postsSnapshot=> {
        let posts = [];
        postsSnapshot.forEach(postDoc => {
            posts.push({...postDoc.data(), id: postDoc.id});
        });
        posts.sort((a, b) => {
            const aMoment = new moment(a.date, timeStampFormat);
            const bMoment = new moment(b.date, timeStampFormat);
            return bMoment.diff(aMoment);
        });
        getDoc(doc(db,'users',req.query.creatorID))
        .then(docSnapshot => {
            res.render('user-posts', {posts: posts, isAuth: isAuth, displayName: docSnapshot.data().displayName});
        })
    })
    .catch((err)=> {
        res.sendStatus(400);
        console.log(err);
    })
});

/** Temporarily in UserRoutes, should be moved to util perhaps? */
async function getPosts(){
    const posts = [];
    const postsSnapshot = await getDocs(collection(db, "posts"));
    postsSnapshot.forEach((postDoc) =>{
        posts.push({...postDoc.data(), id: postDoc.id});
    });
    return posts;
}

router.use('/', (req, res) => {
    const isAuth = req.cookies['session']? true: false;
    const timeStampFormat = 'MM/DD/YY hh:mm:ss A';
    getPosts().then((posts)=> {
        posts.sort((a, b) => {
            const aMoment = new moment(a.date, timeStampFormat);
            const bMoment = new moment(b.date, timeStampFormat);
            return bMoment.diff(aMoment);
        });
        res.render('index', {posts : posts, isAuth: isAuth});
    });
});

module.exports=router