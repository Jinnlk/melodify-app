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

require('dotenv').config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1); // Exit the server if MongoDB fails to connect
  });