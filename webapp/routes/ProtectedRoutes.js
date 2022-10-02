const express = require('express');
const router = express.Router();
const {db, auth, secret_key} = require('../utils/firebaseConfig');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { addDoc, collection, query, where, getDocs, deleteDoc, setDoc } = require('firebase/firestore');

// Add Post
// TODO: add new post to database
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

router.delete('/protected/deletePost', (req,res)=> {
    if (req.query.postID == undefined || req.query.postID == null) res.sendStatus(403);
    let postID = req.query.postID; 
    deleteDoc(doc(db,'posts', postID))
    .then(() =>{
        res.sendStatus(200);
    })
    .catch(()=>{
        res.sendStatus(404);
    })
})

router.put('/protected/editPost', (req, res)=> {
    let postContent = {
        creatorID: res.body.creatorID,
        content: res.body.content, 
        title: res.body.title, 
        date: moment().format('MM/DD/YY hh:mm:ss A'),
    }
    setDoc(doc(db, 'posts', res.body.postID), postContent)
    .then(() => {
        res.sendStatus(200);
    });
});

module.exports = router;