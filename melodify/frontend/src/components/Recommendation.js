import React, { useState } from 'react';
import axios from 'axios';

function Recommendation() {
    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState([]);

    const fetchRecommendations = async () => {
        try {
            const response = await axios.get('/api/spotify/search', {
                params: {
                    q: query,
                },
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
        <div>
            <h1>Insert a song to get started!</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a song"
                />
                <button type="submit">Generate</button>
            </form>
            <h2>You might like these</h2>
            <ul>
                {songs.map((song, index) => (
                    <li key={index}>
                        <strong>{song.name}</strong> by {song.artist}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Recommendation;
