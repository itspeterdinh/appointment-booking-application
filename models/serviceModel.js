const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  time: {
    type: Number,
    require: true
  },
  price: Number
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
