const mongoose = require('mongoose');

const dateScheduleSchema = new mongoose.Schema({
  year: {
    type: Number,
    require: true
  },
  month: {
    type: Number,
    require: true
  },
  date: {
    type: Number,
    require: true
  },
  isFull: Boolean,
  schedule: [
    {
      time: Number,
      isBooked: Boolean,
      customerName: String,
      phone: String,
      email: String
    }
  ]
});

const DateSchedule = mongoose.model('DateSchedule', dateScheduleSchema);

module.exports = DateSchedule;
