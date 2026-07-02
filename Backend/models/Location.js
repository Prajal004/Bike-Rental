const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nameNepali: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  addressNepali: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },
  type: {
    type: String,
    enum: ['pickup', 'return', 'both'],
    default: 'both',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  serviceable: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Location', locationSchema);