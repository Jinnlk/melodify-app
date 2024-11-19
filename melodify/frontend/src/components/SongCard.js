// src/components/SongCard.js
import React from 'react';
import '../css/SongCard.css';

function SongCard({ name, artist }) {
    return (
        <div className="song-card">
            <div className="song-thumbnail"></div>
            <div className="song-info">
                <p className="song-name">{name}</p>
                <p className="song-artist">{artist}</p>
            </div>
        </div>
    );
}

export default SongCard;
