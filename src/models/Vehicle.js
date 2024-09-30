const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  licensePlate: String,
  make: String,
  model: String,
  year: Number,
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
