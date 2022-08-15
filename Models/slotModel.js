const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  time: Number,
  lastHold: Date,
  isBooked: Boolean,
  reservation: {
    type: mongoose.Schema.ObjectId,
    ref: 'Reservation',
    required: false
  }
});

slotSchema.methods.checkAvailability = function(skip) {
  if (skip || Date.now() - this.lastHold.getTime() > 10 * 60 * 1000) {
    this.lastHold = Date.now() - 1000;
    return true;
  } else return false;
};

slotSchema.methods.releaseHold = function() {
  this.lastHold = new Date('January 1, 2000, 12:00:00');
  return true;
};

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
