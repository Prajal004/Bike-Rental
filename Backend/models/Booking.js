const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Booking = sequelize.define('Booking', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  bookingId: { type: DataTypes.STRING, unique: true, allowNull: false },
  customerId: { type: DataTypes.UUID, allowNull: false },
  motorcycleId: { type: DataTypes.UUID, allowNull: false },
  shopId: { type: DataTypes.UUID, allowNull: false },
  pickupLocation: { type: DataTypes.STRING, allowNull: false },
  dropoffLocation: { type: DataTypes.STRING, allowNull: true },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  totalHours: { type: DataTypes.FLOAT, allowNull: false },
  totalDays: { type: DataTypes.FLOAT, allowNull: false },
  pricePerHour: { type: DataTypes.FLOAT, allowNull: false },
  pricePerDay: { type: DataTypes.FLOAT, allowNull: false },
  subtotal: { type: DataTypes.FLOAT, allowNull: false },
  tax: { type: DataTypes.FLOAT, defaultValue: 0 },
  discount: { type: DataTypes.FLOAT, defaultValue: 0 },
  totalAmount: { type: DataTypes.FLOAT, allowNull: false },
  securityDeposit: { type: DataTypes.FLOAT, defaultValue: 0 },
  status: { type: DataTypes.ENUM('pending', 'confirmed', 'active', 'completed', 'cancelled', 'rejected'), defaultValue: 'pending' },
  paymentStatus: { type: DataTypes.ENUM('pending', 'paid', 'refunded', 'failed'), defaultValue: 'pending' },
  paymentMethod: { type: DataTypes.ENUM('esewa', 'khalti', 'fonepay', 'cash'), allowNull: true },
  paymentId: { type: DataTypes.STRING, allowNull: true },
  specialRequests: { type: DataTypes.TEXT, allowNull: true },
  rating: { type: DataTypes.FLOAT, min: 0, max: 5 },
  review: { type: DataTypes.TEXT, allowNull: true },
  completedAt: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: 'bookings',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Booking;
