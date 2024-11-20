import React, { useState } from 'react';
import axios from 'axios';

function Recommendation() {
    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState([]);

    const fetchRecommendations = async () => {
        try {
            const response = await axios.get('/api/spotify/search', {
                params: { q: query },
            });
            setSongs(response.data);
        } catch (error) {
            console.error('Error fetching songs:', error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchRecommendations();
    };

    return (
        <div className="recommendation-container">
            <h1>Insert a song to get started!</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a song"
                    className="search-input"
                />
                <button type="submit" className="search-button">Generate</button>
            </form>
            <h2>You might like these</h2>
            <div className="song-list">
                {songs.map((song, index) => (
                    <div key={index} className="song-card">
                        <div className="song-details">
                            <p className="song-name">{song.name}</p>
                            <p className="song-artist">By {song.artist}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recommendation;
