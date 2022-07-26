const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
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

dateSchema.methods.checkAvailability = function(index) {
  if (!this.schedule[index].isBooked) {
    this.schedule[index].isBooked = true;
    return true;
  } else return false;
};

dateSchema.methods.cancelBooking = function(index) {
  this.schedule[index].isBooked = false;
  return true;
};

const DateS = mongoose.model('DateS', dateSchema);

module.exports = DateS;
