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

// dateSchema.pre('save', function(next) {
//   next();
// });

dateSchema.methods.checkAvailability = function(index) {
  if (!this.schedule[index].isBooked) {
    this.schedule[index].isBooked = true;
    return true;
  } else return false;
};

const DateS = mongoose.model('DateS', dateSchema);

module.exports = DateS;
