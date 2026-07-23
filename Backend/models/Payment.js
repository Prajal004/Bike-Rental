const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  paymentId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'payment_id',
  },
  rentalId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'rental_id',
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  originalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: 'original_amount',
  },
  discountApplied: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    field: 'discount_applied',
  },
  walletUsed: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    field: 'wallet_used',
  },
  method: {
    type: DataTypes.ENUM('esewa', 'khalti', 'fonepay', 'cash'),
    allowNull: false,
  },
  transactionId: {
    type: DataTypes.STRING,
    field: 'transaction_id',
  },
  transactionData: {
    type: DataTypes.JSONB,
    field: 'transaction_data',
  },
  status: {
    type: DataTypes.ENUM('pending', 'success', 'failed'),
    defaultValue: 'pending',
  },
  paidAt: {
    type: DataTypes.DATE,
    field: 'paid_at',
  },
  refundedAt: {
    type: DataTypes.DATE,
    field: 'refunded_at',
  },
  refundAmount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    field: 'refund_amount',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
}, {
  tableName: 'payments',
  timestamps: true,
  hooks: {
    beforeCreate: (payment) => {
      if (!payment.paymentId) {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        payment.paymentId = `PAY${year}${month}${random}`;
      }
    }
  }
});

module.exports = Payment;