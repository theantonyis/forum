import React, { useState } from 'react';

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, password }),
            });

            if (response.ok) {
                window.location.href = '/';
            } else {
                const error = await response.text();
                setErrorMessage(error);
            }
        } catch (error) {
            setErrorMessage('Error: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {errorMessage && <p>{errorMessage}</p>}
            <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
