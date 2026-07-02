const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    unique: true,
    required: true,
  },
  rental: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rental',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  originalAmount: {
    type: Number,
    required: true,
  },
  discountApplied: {
    type: Number,
    default: 0,
  },
  walletUsed: {
    type: Number,
    default: 0,
  },
  method: {
    type: String,
    enum: ['esewa', 'khalti', 'fonepay', 'cash'],
    required: true,
  },
  transactionId: {
    type: String,
  },
  transactionData: {
    type: mongoose.Schema.Types.Mixed,
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending',
  },
  paidAt: {
    type: Date,
  },
  refundedAt: Date,
  refundAmount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Generate payment ID before saving
paymentSchema.pre('save', function (next) {
  if (!this.paymentId) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.paymentId = `PAY${year}${month}${random}`;
  }
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);