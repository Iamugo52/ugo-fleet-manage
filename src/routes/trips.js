const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  id: String,
  driverId: String,
  vehicleId: String,
  startDate: Date,
  endDate: Date,
  startLocation: String,
  endLocation: String,
  status: String, // "scheduled", "in_progress", "completed"
});

const Trip = mongoose.model('Trip', tripSchema);

// GET all trips
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET trip by ID
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).send('Trip not found');
    res.json(trip);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST new trip
router.post('/', async (req, res) => {
  try {
    const trip = new Trip(req.body);
    await trip.save();
    res.json(trip);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// PUT update trip
router.put('/:id', async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!trip) return res.status(404).send('Trip not found');
    res.json(trip);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// DELETE trip
router.delete('/:id', async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trip deleted' });
  } catch (err) {
    res.status(404).send('Trip not found');
  }
});

// GET trips by driver ID
router.get('/driver/:driverId', async (req, res) => {
  try {
    const trips = await Trip.find({ driverId: req.params.driverId });
    res.json(trips);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET trips by vehicle ID
router.get('/vehicle/:vehicleId', async (req, res) => {
  try {
    const trips = await Trip.find({ vehicleId: req.params.vehicleId });
    res.json(trips);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;

