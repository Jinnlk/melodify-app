const express = require('express');
const cors = require('cors');
const spotifyRoutes = require('./routes/spotify'); // Ensure this path is correct

const app = express();

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());
app.use('/api/spotify', spotifyRoutes); // This maps to the "/api/spotify" prefix

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
