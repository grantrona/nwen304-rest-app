const loginForm = document.getElementById('resetForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    if (email.trim() === '') {
        alert('Fill in all the fields');
        return;
    }

    fetch("/reset-password/send", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
        }),
    })
    .then((response) => {
        if (response.status == 200){
            alert("Check your email address for password reset link");
            window.location.href = '/';
        }
    })
})