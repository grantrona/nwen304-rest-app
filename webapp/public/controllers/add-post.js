const loginForm = document.getElementById('addPostForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('pTitle').value;
    const content = document.getElementById('pContent').value;
    if (title.trim() === '' || content.trim() === '') {
        alert('Fill in all the fields');
        return;
    }
    fetch("/addPost", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            content: content
        }),
    })
    .then(() => {
        console.log('Post added');
    })
})