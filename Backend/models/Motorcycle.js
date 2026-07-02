const mongoose = require('mongoose');

const motorcycleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nameNepali: {
    type: String,
    default: '',
  },
  brand: {
    type: String,
    required: true,
    enum: ['Honda', 'Yamaha', 'Suzuki', 'TVS', 'Bajaj', 'Hero', 'Other'],
  },
  year: {
    type: Number,
    required: true,
  },
  cc: {
    type: Number,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  pricePerWeek: {
    type: Number,
  },
  pricePerMonth: {
    type: Number,
  },
  securityDeposit: {
    type: Number,
    default: 1000,
  },
  images: [{
    type: String,
  }],
  description: {
    type: String,
  },
  descriptionNepali: {
    type: String,
  },
  specifications: {
    engine: String,
    mileage: String,
    fuelType: { type: String, default: 'Petrol' },
    transmission: { type: String, enum: ['Manual', 'Automatic'] },
    maxPower: String,
    weight: String,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere',
    },
    address: String,
    addressNepali: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  available: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  totalRentals: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create geospatial index
motorcycleSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Motorcycle', motorcycleSchema);