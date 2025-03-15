import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import CreateDiscussion from "./components/createDiscussion";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={null}/>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;
