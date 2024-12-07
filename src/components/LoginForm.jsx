import React, { useState } from 'react';

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // To store and display error messages

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { login, password };

        try {
            // Send login credentials to the backend API
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            // If the response is not okay, throw an error
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            // Extract the token from the response
            const token = await response.text();
            document.cookie = `token=${token}`; // Set the token in a cookie
            window.location.assign('/'); // Redirect to home page (or wherever you want)
        } catch (error) {
            setErrorMessage('Error: ' + error.message); // Show error if something goes wrong
        }
    };

    return (
        <form className="register-form" id="login-form" onSubmit={handleSubmit}>
            <div className="register-form__container">
                <h1 className="register-form__title">Login page</h1>

                {/* Display error message if there is any */}
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <label htmlFor="login" className="register-form__label">Login</label>
                <input
                    type="text"
                    id="login"
                    name="login"
                    className="register-form__input"
                    placeholder="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)} // Update login state
                />

                <label htmlFor="password" className="register-form__label">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="register-form__input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                />

                <button type="submit" className="register-form__button">Submit</button>
            </div>
        </form>
    );
};

export default LoginForm;
