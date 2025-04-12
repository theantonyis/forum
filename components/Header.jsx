import '../styles/style.css';
import '../styles/discussion.css';
import { useRouter } from 'next/router';

const Header = () => {
    const router = useRouter();

    const handleLogout = () => {
        // Clear token cookie (just an example — consider secure cookie handling in real apps)
        document.cookie = 'token=; Max-Age=0; path=/';

        // Redirect to login page
        router.push('/login');

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
