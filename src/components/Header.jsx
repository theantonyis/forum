import React from 'react';

// If you are using React Router
import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();  // Use React Router's location

    const handleLogout = () => {
        document.cookie = 'token=; Max-Age=0';
        location.assign('/login');
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
