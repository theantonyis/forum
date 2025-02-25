import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm'; // Import the RegisterForm component
import LoginForm from './components/LoginForm'; // Import the LoginForm component
import Header from './components/Header';
import Discussion from "./components/Discussion";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Discussion />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </Router>
    );
}

export default App;
