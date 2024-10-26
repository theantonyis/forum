const registerForm = document.getElementById('register-form');
// const loginForm = document.getElementById('login-form');

registerForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const login = registerForm.elements['login'].value;
    const password = registerForm.elements['password'].value;
    const passwordRepeat = registerForm.elements['passwordRepeat'].value;
    if(password.value !== passwordRepeat.value) {
        return alert('Паролі не співпадають')
    }
    const user = JSON.stringify({
        login: login.value,
        password: password.value
    });

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const result = await response.text(); // or response.json() if the response is JSON
        if (!response.ok) {
            throw new Error(result); // Handle HTTP errors
        }
        alert(result); // Success message
    } catch (error) {
        alert('Error: ' + error.message); // Display error message
    }
});

// loginForm?.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const {login, password} = loginForm;
//     const user = JSON.stringify({
//         login: login.value,
//         password: password.value
//     });
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', '/api/login');
//     xhr.send(user);
//     xhr.onload = () => {
//         if(xhr.status === 200) {
//             const token = xhr.response;
//             document.cookie = `token=${token}`;
//             window.location.assign('/');
//         }
//         else {
//             return alert(xhr.response);
//         }
//     }
// });