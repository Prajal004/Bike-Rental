const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Location = sequelize.define('Location', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nameNepali: {
    type: DataTypes.STRING,
    field: 'name_nepali',
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressNepali: {
    type: DataTypes.STRING,
    field: 'address_nepali',
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
  },
  type: {
    type: DataTypes.ENUM('pickup', 'return', 'both'),
    defaultValue: 'both',
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active',
  },
  serviceable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'locations',
  timestamps: true,  // ✅ Sequelize automatically adds createdAt & updatedAt
});

module.exports = Location;
