const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Shop = sequelize.define('Shop', {
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
  shopName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'shop_name',
  },
  shopNameNepali: {
    type: DataTypes.STRING,
    field: 'shop_name_nepali',
  },
  description: {
    type: DataTypes.TEXT,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  registrationNumber: {
    type: DataTypes.STRING,
    field: 'registration_number',
  },
  panNumber: {
    type: DataTypes.STRING,
    field: 'pan_number',
  },
  documentImage: {
    type: DataTypes.STRING,
    field: 'document_image',
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_verified',
  },
  verificationStatus: {
    type: DataTypes.ENUM('pending', 'verified', 'rejected'),
    defaultValue: 'pending',
    field: 'verification_status',
  },
  verificationNote: {
    type: DataTypes.TEXT,
    field: 'verification_note',
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0,
  },
  totalRentals: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'total_rentals',
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active',
  },
  openTime: {
    type: DataTypes.TIME,
    field: 'open_time',
  },
  closeTime: {
    type: DataTypes.TIME,
    field: 'close_time',
  },
}, {
  tableName: 'shops',
  timestamps: true,
});

module.exports = Shop;
