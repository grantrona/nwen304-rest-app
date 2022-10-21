const {db} = require('../utils/firebaseConfig');
const { 
    addDoc, 
    collection, 
    query, 
    where, 
    getDocs, 
    deleteDoc, 
    setDoc, 
    doc, 
    limit 
} = require('firebase/firestore');
const moment = require('moment');

/**
 * Adds the given post to the database.
 * 
 * @param {Post} newPost Post to add to the database.
 */
function addPost(newPost){
    addDoc(collection(db, 'posts'), {...newPost});
}

/**
 * Returns the specified number of posts, ordered by post time.
 * @param {number} count How many posts to retrieve
 */
function getPosts(count){
    const userQuery = query(
        collection(db, "posts"), 
        limit(count)
    );

    return getDocs(userQuery)
        .then(postsSnapshot=> {
            let posts = [];
            postsSnapshot.forEach(postDoc => {
                posts.push({...postDoc.data(), id: postDoc.id});
            });
            const timeStampFormat = 'MM/DD/YY hh:mm:ss A';
            posts.sort((a, b) => {
                const aMoment = new moment(a.date, timeStampFormat);
                const bMoment = new moment(b.date, timeStampFormat);
                return bMoment.diff(aMoment);
            });
            return posts;
        });
}

/**
 * Returns the specified number of posts from the specified creator.
 * 
 * Ordered by date/time.
 * 
 * @param {number} count How many posts to retrieve
 * @param {string} creatorID Identifier of a user
 * 
 * @return {Post[]} Array of posts from database, returns an empty array on failure.
 */
 function getCreatorPosts(count, creatorID){
    const userQuery = query(
        collection(db, "posts"), 
        where("creatorID", "==", creatorID), 
        limit(count)
    );

    getDocs(userQuery)
    .then(postsSnapshot=> {
        let posts = [];
        postsSnapshot.forEach(postDoc => {
            posts.push({...postDoc.data(), id: postDoc.id});
        });
        const timeStampFormat = 'MM/DD/YY hh:mm:ss A';
        posts.sort((a, b) => {
            const aMoment = new moment(a.date, timeStampFormat);
            const bMoment = new moment(b.date, timeStampFormat);
            return bMoment.diff(aMoment);
        });
        return posts;
    })
    .catch((err)=> {
        console.log(err);
        return [];
    })
}

/**
 * Deletes post in the database specified by postID.
 * 
 * @param {string} postID Unique identifier for post to delete
 * 
 * @return {number} Returns the response code (200 for success, 400 for failure).
 */
function deletePost(postID){
    deleteDoc(doc(db,'posts',postID))
    .then(() =>{
        return 200;
    })
    .catch(()=>{
        return 403;
    });
}

/**
 * Updates the specified post (postID) with updatedPost.
 * 
 * @param {Post} updatedPost The replacing post.
 * @param {string} postID Unique identifier for the post to update.
 * 
 * @return {number} Returns the response code (200 for success, 400 for failure).
 */
function updatePost(updatedPost, postID){
    setDoc(doc(db, 'posts', postID), updatedPost)
    .then(() => {
        return 200;
    })
    .catch(() => {
        return 400;
    });
}

module.exports = {addPost, getCreatorPosts, getPosts, deletePost, updatePost};