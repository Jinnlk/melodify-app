import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <h1 className="navbar-logo">melodify</h1>
            <div className="navbar-links">
                <Link to="/">home</Link>
                <Link to="/recommendation">recommender</Link>
                <Link to="/saved">saved</Link>
            </div>
            <div className="navbar-profile">J</div>
        </nav>
    );
}

export default Navbar;
