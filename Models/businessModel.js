const mongoose = require('mongoose');
const slugify = require('slugify');

const businessSchema =  new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true
        },
        slug: String,
        description: {
            type: String,
            trim: true
        },
        hours: [String],
        email: {
            type: String,
            require: true,
            trim: true
        },
        phone: String,
        instagram: String,
    }
)

itemSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;