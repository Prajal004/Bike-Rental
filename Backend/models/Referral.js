const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Referral = sequelize.define('Referral', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  referrerId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'referrer_id',
  },
  refereeId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'referee_id',
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
}, {
  tableName: 'referrals',
  timestamps: true,
});

module.exports = Referral;
