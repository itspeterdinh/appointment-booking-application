const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  customerName: {
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

const Service = mongoose.model('Appointment', appointmentSchema);
