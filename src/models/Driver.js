const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

module.exports = mongoose.model('Driver', driverSchema);