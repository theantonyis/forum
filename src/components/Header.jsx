import React from 'react';

const Header = () => {
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
