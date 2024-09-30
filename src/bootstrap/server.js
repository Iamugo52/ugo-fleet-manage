const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const driversRouter = require('./routes/drivers');
const tripsRouter = require('./routes/trips');
const authRouter = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fleet-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/drivers', driversRouter);
app.use('/trips', tripsRouter);
app.use('/auth', authRouter);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: 'Internal Server Error' });
});

// Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
