import '@/styles/style.css';
import '@/styles/discussion.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username: login,
                password,
            }, {
                withCredentials: true
            });


            localStorage.setItem('authToken', response.data.token);
            await router.push('/discussions');
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data?.message || 'Login failed');
            } else {
                setErrorMessage('Error: ' + error.message);
            }
        }
    };

    return (
        <main>
            <header className="header">
                <h1>Forum</h1>
                <Link className="link" href="/register">Register</Link>
            </header>
            <form className="register-form" onSubmit={handleSubmit} id="login-form">
                <div className="register-form__container">
                    <h1 className="register-form__title">Login page</h1>

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
