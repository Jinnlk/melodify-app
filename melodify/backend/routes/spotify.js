require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let accessToken = null;

console.log('Client ID:', clientId);
console.log('Client Secret:', clientSecret);



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


async function checkAccessToken(req, res, next) {
    try {
        if (!accessToken) {
            await getAccessToken();
        }
        next();
    } catch (error) {
        res.status(500).send('Failed to authenticate with Spotify API');
    }
}

console.log(accessToken);

// Route to search for songs
router.get('/search', checkAccessToken, async (req, res) => {
    
    const query = req.query.q;
    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                q: query,
                type: 'track',
                limit: 5,
            },
        });
        res.json(response.data.tracks.items);
    } catch (error) {
        console.error('Error fetching songs:', error.message);
        res.status(500).send('Error fetching songs');
    }
});


module.exports = router;
