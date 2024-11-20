const express = require('express');
const axios = require('axios');
const router = express.Router();
const mongoose = require('mongoose'); // Use the existing connection from server.js

require('dotenv').config();

// Spotify credentials
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let accessToken = null;

// Mongoose model for saved songs
const SavedSongSchema = new mongoose.Schema({
  name: String,
  artist: String,
  songId: String,
});

const SavedSong = mongoose.model('SavedSong', SavedSongSchema);

// Function to get an access token
async function getAccessToken() {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'client_credentials',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      },
    });
    accessToken = response.data.access_token;
    console.log('Access Token successfully fetched:', accessToken);
  } catch (error) {
    console.error('Error fetching access token:', error.response?.data || error.message);
    throw new Error('Failed to fetch access token');
  }
}

// Middleware to ensure a valid access token
async function checkAccessToken(req, res, next) {
  if (!accessToken) {
    await getAccessToken();
  }
  next();
}

// Spotify search route
router.get('/search', checkAccessToken, async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { q: query, type: 'track', limit: 5 },
    });
    const tracks = response.data.tracks.items.map((track) => ({
      name: track.name,
      artist: track.artists.map((artist) => artist.name).join(', '),
      songId: track.id,
    }));
    res.json(tracks);
  } catch (error) {
    console.error('Error fetching songs:', error.response?.data || error.message);
    res.status(500).send('Error fetching songs');
  }
});

// Save a song
router.post('/save', async (req, res) => {
  const { name, artist, songId } = req.body;
  try {
    const savedSong = new SavedSong({ name, artist, songId });
    await savedSong.save();
    res.status(201).json({ message: 'Song saved successfully', song: savedSong });
  } catch (error) {
    console.error('Error saving song:', error.message);
    res.status(500).send('Error saving song');
  }
});

// Get saved songs
router.get('/saved', async (req, res) => {
  try {
    const savedSongs = await SavedSong.find();
    res.json(savedSongs);
  } catch (error) {
    console.error('Error fetching saved songs:', error.message);
    res.status(500).send('Error fetching saved songs');
  }
});

module.exports = router;
