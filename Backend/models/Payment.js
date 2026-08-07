const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  rentalId: {
    type: DataTypes.UUID,
    field: 'rental_id',
  },
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
  },
}, {
  tableName: 'payments',
  timestamps: true,
});

module.exports = Payment;
