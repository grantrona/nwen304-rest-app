const loginForm = document.getElementById('signupForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const passwordConf = document.getElementById('passwordConfInput').value;
    const displayName = document.getElementById('displayName').value;
    if (email.trim() === '' || displayName.trim() === '' || password.trim() === '' || passwordConf.trim() === '') {
        alert('Fill in all the fields');
        return;
    }
    if (password != passwordConf) {
        alert('Passwords do not match.')
        return;
    }
    fetch("/signup/email", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
            displayName,
        }),
    })
    .then((response) => {
        if (response.status == 200){
            window.location.href = '/';
        }
    })
})