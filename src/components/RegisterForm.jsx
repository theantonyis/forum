import React, { useState } from 'react';

const RegisterForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // To display error messages

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation for matching passwords
        if (password !== passwordRepeat) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        const user = { login, password };

        try {
            // Send registration credentials to the backend API
            const response = await fetch('/api/register', {
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

            // Handle successful registration, maybe redirect to login
            window.location.assign('/login'); // Redirect to login page after registration
        } catch (error) {
            setErrorMessage('Error: ' + error.message); // Show error if something goes wrong
        }
    };

    return (
        <form className="register-form" id="register-form" onSubmit={handleSubmit}>
            <div className="register-form__container">
                <h1 className="register-form__title">Register page</h1>

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

                <label htmlFor="passwordRepeat" className="register-form__label">Repeat password</label>
                <input
                    type="password"
                    id="passwordRepeat"
                    name="passwordRepeat"
                    className="register-form__input"
                    placeholder="Repeat password"
                    value={passwordRepeat}
                    onChange={(e) => setPasswordRepeat(e.target.value)} // Update passwordRepeat state
                />

                <button type="submit" className="register-form__button">Submit</button>
            </div>
        </form>
    );
};

export default RegisterForm;
