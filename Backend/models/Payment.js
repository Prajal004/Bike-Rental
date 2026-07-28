const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  paymentId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  rentalId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  originalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  discountApplied: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  walletUsed: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  method: {
    type: DataTypes.ENUM('esewa', 'khalti', 'fonepay', 'cash'),
    allowNull: false
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  transactionData: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'success', 'failed'),
    defaultValue: 'pending'
  },
  paidAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  refundedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  refundAmount: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  }
}, {
  tableName: 'payments',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Payment.associate = function(models) {
  Payment.belongsTo(models.Booking, {
    foreignKey: 'rentalId',
    as: 'booking'
  });
  Payment.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user'
  });
};

module.exports = Payment;
