const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Wishlist = sequelize.define('Wishlist', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
}, {
  tableName: 'wishlists',
  timestamps: true,
});

module.exports = Wishlist;
