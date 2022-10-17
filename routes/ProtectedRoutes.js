const express = require('express');
const router = express.Router();
const {db, secret_key} = require('../utils/firebaseConfig');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { addDoc, collection, query, where, getDocs, deleteDoc, setDoc, doc } = require('firebase/firestore');

// Add Post
router.post('/protected/addPost', (req, res) =>{
    let timestamp = moment().format('MM/DD/YY hh:mm:ss A');
    let creatorID = jwt.decode(req.cookies['session'], secret_key).id;
    let newPost = new Post(req.body.title, req.body.content, timestamp, creatorID);
    addDoc(collection(db, 'posts'), {...newPost});
    res.redirect('/');
}); 

router.get('/protected/myposts', (req, res) => {
    let creatorID = jwt.decode(req.cookies['session'], secret_key).id;
    const timeStampFormat = 'MM/DD/YY hh:mm:ss A';

    const userQuery = query(collection(db, "posts"), where("creatorID", "==", creatorID));
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
        res.render('my-posts', {posts: posts, isAuth: true});
    })
    .catch((err)=> {
        res.sendStatus(400);
        console.log(err);
    })
});

router.get('/protected/profile', (req, res) => {
    const user = {id: 2, name: "Todd Howard"}; // temp fake user

    res.render('profile', {user: user});
});

router.delete('/protected/deletePost', (req,res)=> {
    if (req.body.postID == undefined || req.body.postID == null) res.sendStatus(404);
    let postID = req.body.postID; 
    deleteDoc(doc(db,'posts',postID))
    .then(() =>{
        res.sendStatus(200);
    })
    .catch(()=>{
        res.sendStatus(403);
    })
})


router.put('/protected/editPost', (req, res)=> {
    let postContent = {
        creatorID: req.body.creatorID,
        content: req.body.content, 
        title: req.body.title, 
        date: moment().format('MM/DD/YY hh:mm:ss A'),
    }
    setDoc(doc(db, 'posts', req.body.postID), postContent)
    .then(() => {
        res.sendStatus(200);
    })
    .catch(() => {
        res.sendStatus(400);
    });
});

module.exports = router;