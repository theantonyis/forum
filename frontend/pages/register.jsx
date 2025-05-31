import React from 'react';
import RegisterForm from '../components/RegisterForm';
import Header from '../components/Header'
import Head from "next/head";

const Register = () => {
    return (
        <div>
            <Head>
                Forum | Register
            </Head>
            <Header />
            <RegisterForm />
        </div>
    );
};

export default Register;
