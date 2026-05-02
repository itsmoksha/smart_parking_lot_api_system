const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const slotRoutes = require('./routes/slotRoutes');
const parkingRoutes = require('./routes/parkingRoutes');

const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Logging middleware


// Routes
app.use('/api/slots', slotRoutes);
app.use('/api/parking', parkingRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Smart Parking Lot API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
