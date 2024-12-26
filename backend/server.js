const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const helmet = require('helmet');
const cors = require('cors');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Sample Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));