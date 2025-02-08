import React from 'react';

// If you are using React Router
import { useNavigate  } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate(); // useNavigate hook to programmatically navigate

    const handleLogout = () => {
        // Clear the token cookie
        document.cookie = 'token=; Max-Age=0';

        // Redirect to the login page using navigate()
        navigate('/login');

        // Log a message for debugging purposes
        console.log("Logged out");
    };

    return (
        <header className="header">
            <h1>Forum</h1>
            <button className="link" id="logout" onClick={handleLogout}>Logout</button>
        </header>
    );
};

export default Header;