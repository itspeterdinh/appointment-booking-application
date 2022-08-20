const mongoose = require('mongoose');
const slugify = require('slugify');

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  slug: String,
  avatar: String,
  description: {
    type: String,
    trim: true
  },
  hours: [
    {
      date: String,
      time: String
    }
  ],
  email: {
    type: String,
    require: true,
    trim: true
  },
  phone: String,
  instagram: String,
  services: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Service'
    }
  ]
});

businessSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

businessSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'services',
    select: 'name description time price'
  });

  next();
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
