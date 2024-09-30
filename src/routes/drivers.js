const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  phone: String,
  licenseNumber: String,
  licenseExpiry: Date,
  vehicleId: String,
});

const Driver = mongoose.model('Driver', driverSchema);

// GET all drivers
router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET driver by ID
router.get('/:id', async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) return res.status(404).send('Driver not found');
    res.json(driver);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST new driver
router.post('/', async (req, res) => {
  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.json(driver);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// PUT update driver
router.put('/:id', async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!driver) return res.status(404).send('Driver not found');
    res.json(driver);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// DELETE driver
router.delete('/:id', async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.json({ message: 'Driver deleted' });
  } catch (err) {
    res.status(404).send('Driver not found');
  }
});

module.exports = router;


