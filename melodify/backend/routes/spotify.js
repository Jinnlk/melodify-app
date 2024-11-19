require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let accessToken = "BQCUus_m378uz6YR7USX6Fr_qPA8PjWPMtlrKpgihR9MYY8jxYlI8VumdOAzH98tHX2vj-8Kf-NbyQt3mph6bcFmhAmhkCSZ6HHFEw1W4A2wC1uzOGc";

console.log('Client ID:', clientId);
console.log('Client Secret:', clientSecret);


// Function to get an access token
// async function getAccessToken() {
//     try {
//         const response = await axios.post('https://accounts.spotify.com/api/token', null, {
//             params: {
//                 grant_type: 'client_credentials',
//             },
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
//             },
//         });
//         accessToken = response.data.access_token;
//         console.log('Access Token successfully fetched:', accessToken);
//     } catch (error) {
//         console.error('Error fetching access token:', error.response?.data || error.message);
//         throw new Error('Failed to fetch access token');
//     }
// }


// Middleware to ensure a valid access token is available
// async function checkAccessToken(req, res, next) {
//     try {
//         if (!accessToken) {
//             await getAccessToken();
//         }
//         next();
//     } catch (error) {
//         res.status(500).send('Failed to authenticate with Spotify API');
//     }
// }

console.log(accessToken);

// Route to search for songs
router.get('/search', async (req, res) => {
    
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
