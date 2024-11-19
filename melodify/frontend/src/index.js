import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'; // Import global styles here

// Create a root element using React 18's createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
