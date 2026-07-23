const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Rider = sequelize.define('Rider', {
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
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'full_name',
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  // Driving License
  licenseNumber: {
    type: DataTypes.STRING,
    field: 'license_number',
  },
  licenseImage: {
    type: DataTypes.STRING,
    field: 'license_image',
  },
  licenseExpiry: {
    type: DataTypes.DATE,
    field: 'license_expiry',
  },
  // Citizenship
  citizenshipNumber: {
    type: DataTypes.STRING,
    field: 'citizenship_number',
  },
  citizenshipImage: {
    type: DataTypes.STRING,
    field: 'citizenship_image',
  },
  // Verification
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_verified',
  },
  verificationStatus: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
    field: 'verification_status',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'updated_at',
  },
}, {
  tableName: 'riders',
  timestamps: true,
});

module.exports = Rider;