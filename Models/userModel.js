const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
  createdAt: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;
