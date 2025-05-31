import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import '@/styles/style.css';
import '@/styles/discussion.css';
import Head from "next/head";
import React from "react";

const LoginPage = () => {
    return (
        <>
            <Head>
                <title>Forum | Login</title>
            </Head>
            <Header />
            <LoginForm />
        </>
    );
};

export default LoginPage;
