const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  date: {
    type: String,
    require: true,
    trim: true
  },
  time: {
    type: String,
    require: true,
    trim: true
  },
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
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  service: String,
  isCancelled: {
    type: Boolean,
    require: true,
    default: false
  },
  slot: {
    type: String,
    trim: true,
    require: true
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
