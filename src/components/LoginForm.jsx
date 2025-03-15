import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, password }),
                credentials: 'include', // Make sure cookies are included
            });

            if (response.ok) {
                const data = await response.json();

                localStorage.setItem('authToken', data.token);
                navigate('/');
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
                <h1>Forum</h1>
                <a className="link" href="/register">Register</a>
            </header>
            <form className="register-form" onSubmit={handleSubmit} id="login-form">
                <div className="register-form__container">
                    <h1 className="register-form__title">Login page</h1>

                    {/* Display error message if there is one */}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <label htmlFor="login" className="register-form__label">Login</label>
                    <input
                        type="text"
                        id="login"
                        name="login"
                        className="register-form__input"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="Username"
                        required
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
                        required
                    />

                    <button type="submit" className="register-form__button">Submit</button>
                </div>
            </form>
        </main>
    );
};

export default LoginForm;
