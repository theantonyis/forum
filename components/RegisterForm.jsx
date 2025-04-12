import '../styles/style.css';
import '../styles/discussion.css';
import React, { useState } from 'react';

const RegisterForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
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
                window.location.href = '/login'; // Redirect to login page if registration is successful
            } else {
                const error = await response.text();
                setErrorMessage(error);
            }
        } catch (error) {
            setErrorMessage('Error: ' + error.message);
        }
    };

    return (
        <main>
            <header className="header">
                <h1>RoboChat</h1>
                <a className="link" href="/login">Login</a>
            </header>
            <form className="register-form" onSubmit={handleSubmit} id="register-form">
                <div className="register-form__container">
                    <h1 className="register-form__title">Register page</h1>
                    {errorMessage && <p>{errorMessage}</p>}

                    <label htmlFor="login" className="register-form__label">Login</label>
                    <input
                        type="text"
                        id="login"
                        name="login"
                        className="register-form__input"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="Login"
                    />

                    <label htmlFor="password" className="register-form__label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="register-form__input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />

                    <label htmlFor="passwordRepeat" className="register-form__label">Repeat Password</label>
                    <input
                        type="password"
                        id="passwordRepeat"
                        name="passwordRepeat"
                        className="register-form__input"
                        value={passwordRepeat}
                        onChange={(e) => setPasswordRepeat(e.target.value)}
                        placeholder="Repeat Password"
                    />

                    <button type="submit" className="register-form__button">Submit</button>
                </div>
            </form>
        </main>
    );
};

export default RegisterForm;
