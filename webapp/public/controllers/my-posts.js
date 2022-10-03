function editPost(postID, creatorID){
    let title = document.getElementById("title"+postID).value;
    let content = document.getElementById("content"+postID).value
    fetch("/protected/editPost", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title, 
            content, 
            postID, 
            creatorID,
        }),
    })
    .then(() => {window.location.reload()});
}

function deletePost(postID) {
    fetch("/protected/deletePost", {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            postID,
        }),
    })
    .then(() => {window.location.reload()});
}