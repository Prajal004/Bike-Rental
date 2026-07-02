const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  referee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  referralCode: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'expired'],
    default: 'pending',
  },
  referrerBonus: {
    type: Number,
    default: 50, // Rs 50 for referrer
  },
  refereeDiscount: {
    type: Number,
    default: 100, // Rs 100 discount for referee
  },
  completedAt: {
    type: Date,
  },
  rental: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rental',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Referral', referralSchema);