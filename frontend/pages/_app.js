import '@styles/style.css';
import '@styles/discussion.css';
import '@styles/globals.css'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('authToken');
            const isLoginPage = router.pathname === '/login';
            const isRegisterPage = router.pathname === '/register';

            // Redirect to /login if not logged in and not already on the login or register page
            if (!token && !isLoginPage && !isRegisterPage) {
                router.push('/login');
            }
        }
    }, [router.pathname]);

    return <Component {...pageProps} />;
}

export default MyApp;