const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  phone: {
    type: String,
    require: true,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  notes: String
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
