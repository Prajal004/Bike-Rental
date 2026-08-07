const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SosAlert = sequelize.define('SosAlert', {
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
  location: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'sos_alerts',
  timestamps: true,
});

module.exports = SosAlert;
