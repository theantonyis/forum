import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/style.css'; // Include CSS styles
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App/>);
