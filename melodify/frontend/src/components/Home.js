import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

function Home() {
    // Initialize navigate function
    const navigate = useNavigate();

    // Function to handle navigation on button click
    const goToRecommendation = () => {
        navigate('/recommendation'); // Specify the path of your Recommendation page
    };

    return (
        <div className="home">
            <div className="home-content">
                <p>find your next new track...</p>
                <button className="discover-btn" onClick={goToRecommendation}>
                    discover now
                </button>
            </div>
        </div>
    );
}

export default Home;
