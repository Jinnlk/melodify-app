import React from 'react';
import SongCard from './SongCard';
import '../css/Saved.css';

function Saved() {
    return (
        <div className="saved">
            <h2>saved songs</h2>
            <div className="song-list">
                <SongCard name="Song Name" artist="Artist Name" />
                <SongCard name="Song Name" artist="Artist Name" />
                <SongCard name="Song Name" artist="Artist Name" />
            </div>
        </div>
    );
}

export default Saved;
