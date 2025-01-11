import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/login', { login, password });

            if (response.status === 200) {
                navigate('/'); // Redirect after successful login
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status code outside 2xx range
                setErrorMessage(error.response.data || 'Login failed');
            } else if (error.request) {
                // No response received from the server
                setErrorMessage('No response from server');
            } else {
                // Error setting up the request
                setErrorMessage('Error: ' + error.message);
            }
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
