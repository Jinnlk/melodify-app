import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Saved() {
    const [savedSongs, setSavedSongs] = useState([]);

    useEffect(() => {
        const fetchSavedSongs = async () => {
            try {
                const response = await axios.get('/api/spotify/saved');
                setSavedSongs(response.data);
            } catch (error) {
                console.error('Error fetching saved songs:', error.message);
            }
        };

        fetchSavedSongs();
    }, []);

    return (
        <div className="saved-container">
            <h1>Your Saved Songs</h1>
            <div className="song-list">
                {savedSongs.map((song, index) => (
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

export default Saved;
