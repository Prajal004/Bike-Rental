const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Motorcycle = sequelize.define('Motorcycle', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cc: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pricePerDay: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: 'price_per_day',
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_verified',  // ✅ Database column name
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  shopId: {
    type: DataTypes.UUID,
    field: 'shop_id',
  },
}, {
  tableName: 'motorcycles',
  timestamps: true,
});

module.exports = Motorcycle;
