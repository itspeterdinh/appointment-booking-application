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
      email: String,
      lastHold: Date
    }
  ]
});

dateSchema.methods.checkAvailability = function(index, skip) {
  if (
    skip ||
    !this.schedule[index].lastHold ||
    Date.now() - this.schedule[index].lastHold.getTime() > 10 * 60 * 1000
  ) {
    this.schedule[index].lastHold = Date.now() - 1000;
    return true;
  } else return false;
};

dateSchema.methods.releaseHold = function(index) {
  this.schedule[index].lastHold = new Date('January 1, 2000, 12:00:00');
  return true;
};

const DateS = mongoose.model('DateS', dateSchema);

module.exports = DateS;
