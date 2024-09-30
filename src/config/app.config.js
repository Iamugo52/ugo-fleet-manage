// Import dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to MongoDB
mongoose.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true });

// Import routes
const vehicleRoutes = require('./routes/vehicles');
const driverRoutes = require('./routes/drivers');
const tripRoutes = require('./routes/trips');

// Use routes
app.use('/vehicles', vehicleRoutes);
app.use('/drivers', driverRoutes);
app.use('/trips', tripRoutes);

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
