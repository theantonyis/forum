import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm'; // Import the RegisterForm component
import LoginForm from './components/LoginForm'; // Import the LoginForm component
import Header from './components/Header';
import CreateDiscussion from "./components/createDiscussion";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<CreateDiscussion />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </Router>
    );
}

export default App;
