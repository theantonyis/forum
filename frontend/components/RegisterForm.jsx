import '@/styles/style.css';
import '@/styles/discussion.css';
import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
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
            const response = await axios.post(
                'http://localhost:5000/api/auth/register',
                {
                    username,
                    email,
                    password
                },
                {
                    withCredentials: true
                }
            );

            if (response.status === 201) {
                window.location.href = '/login';
            }
        } catch (error) {
            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Error: ' + error.message);
            }
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

                    <label htmlFor="username" className="register-form__label">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="register-form__input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />

                    <label htmlFor="email" className="register-form__label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="register-form__input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
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
