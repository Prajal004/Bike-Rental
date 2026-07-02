const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  rentalId: {
    type: String,
    unique: true,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  motorcycle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Motorcycle',
    required: true,
  },
  pickupLocation: {
    address: String,
    coordinates: [Number],
  },
  returnLocation: {
    address: String,
    coordinates: [Number],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  deliveryFee: {
    type: Number,
    default: 0,
  },
  securityDeposit: {
    type: Number,
    default: 1000,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['esewa', 'khalti', 'fonepay', 'cash'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'ongoing', 'completed', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Rental', rentalSchema);
