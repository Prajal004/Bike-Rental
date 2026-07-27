const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Motorcycle = sequelize.define('Motorcycle', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  shopId: { type: DataTypes.UUID, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  brand: { type: DataTypes.STRING, allowNull: false },
  model: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  color: { type: DataTypes.STRING, defaultValue: 'Black' },
  pricePerHour: { type: DataTypes.FLOAT, allowNull: false },
  pricePerDay: { type: DataTypes.FLOAT, allowNull: false },
  securityDeposit: { type: DataTypes.FLOAT, defaultValue: 0 },
  images: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  features: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  status: { type: DataTypes.ENUM('available', 'rented', 'maintenance', 'unavailable'), defaultValue: 'available' },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 },
  totalReviews: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'motorcycles',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Motorcycle;
