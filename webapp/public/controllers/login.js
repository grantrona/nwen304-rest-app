const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    if (email.trim() === '' || password.trim() === '') {
        alert('Fill in all the fields');
        return;
    }
    fetch("/login/email", {
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