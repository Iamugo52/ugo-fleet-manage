const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

// Get all vehicles
router.get('/', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

// Create new vehicle
router.post('/', async (req, res) => {
  const vehicle = new Vehicle(req.body);
  await vehicle.save();
  res.json(vehicle);
});

// Get vehicle by ID
router.get('/:id', async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  res.json(vehicle);
});

// Update vehicle
router.put('/:id', async (req, res) => {
  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body);
  res.json(vehicle);
});

// Delete vehicle
router.delete('/:id', async (req, res) => {
  await Vehicle.findByIdAndRemove(req.params.id);
  res.json({ message: 'Vehicle deleted' });
});

module.exports = router;

