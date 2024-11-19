// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Recommendation from './components/Recommendation';
import Saved from './components/Saved';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recommendation" element={<Recommendation />} />
                <Route path="/saved" element={<Saved />} />
            </Routes>
        </Router>
    );
}

export default App;
