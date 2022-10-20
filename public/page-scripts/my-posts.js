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
    .then((response) => {
        if (response.status == 200){
            window.location.reload();
        } else {
            response.text()
            .then((data) => {
                alert(data);
            })
        }
    })
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
    .then((response) => {
        if (response.status == 200){
            window.location.reload();
        } else {
            response.text()
            .then((data) => {
                alert(data);
            })
        }
    })
}