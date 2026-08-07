const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Rental = sequelize.define('Rental', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  rentalId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'rental_id',
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
  },
  motorcycleId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'motorcycle_id',
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'start_date',
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'end_date',
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: 'total_price',
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  paymentStatus: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
    field: 'payment_status',
  },
}, {
  tableName: 'rentals',
  timestamps: true,
});

module.exports = Rental;
