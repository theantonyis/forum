const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

registerForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const login = registerForm.elements['login'].value;
    const password = registerForm.elements['password'].value;
    const passwordRepeat = registerForm.elements['passwordRepeat'].value;
    if(password.value !== passwordRepeat.value) {
        return alert('Паролі не співпадають')
    }
    const user = {
        login: login,
        password: password
    };

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

loginForm?.addEventListener('submit', async(event) => {
    event.preventDefault();
    const login = loginForm.elements['login'].value;
    const password = loginForm.elements['password'].value;
    const user = {
        login: login,
        password: password
    };


    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        const token = await response.text();
        document.cookie = `token=${token}`;
        window.location.assign('/');
    } catch (error) {
        alert('Error: ' + error.message);
    }
});