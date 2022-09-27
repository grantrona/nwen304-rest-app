const loginForm = document.getElementById('signupForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const passwordConf = document.getElementById('passwordConfInput').value;
    if (email.trim() === '' || password.trim() === '' || passwordConf.trim() === '') {
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
            password
        }),
    })
    .then(() => {
        console.log('sent request');
    })
})