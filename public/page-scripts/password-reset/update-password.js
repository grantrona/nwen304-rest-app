const loginForm = document.getElementById('resetForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('newPasswordInput').value;
    const passwordConfirm = document.getElementById('newPasswordInputConfirm').value;

    if (password.trim() === '' || passwordConfirm.trim() === '') {
        alert('Fill in all the fields');
        return;
    }

    if(password !== passwordConfirm){
        alert('Passwords do not match');
        return;
    }

    fetch("/reset-password/submit", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userID,
            password,
        }),
    })
    .then((response) => {
        if (response.status == 200){
            alert("Password successfully updated");
            window.location.href = '/';
        }
    })
})