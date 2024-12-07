import React, { useState } from 'react';

const RegisterForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordRepeat) {
            setErrorMessage('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, password }),
            });

            if (response.ok) {
                window.location.href = '/login';
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
            <h2>Register</h2>
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
            <input
                type="password"
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
                placeholder="Repeat Password"
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
