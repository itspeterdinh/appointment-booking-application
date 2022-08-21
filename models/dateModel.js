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
  schedule: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Slot'
    }
  ]
});

dateSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'schedule',
    select: 'time lastHold isBooked booking'
  });

  next();
});

const DateS = mongoose.model('DateS', dateSchema);

module.exports = DateS;
