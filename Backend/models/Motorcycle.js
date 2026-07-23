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
  nameNepali: {
    type: DataTypes.STRING,
    field: 'name_nepali',
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
  pricePerWeek: {
    type: DataTypes.FLOAT,
    field: 'price_per_week',
  },
  pricePerMonth: {
    type: DataTypes.FLOAT,
    field: 'price_per_month',
  },
  securityDeposit: {
    type: DataTypes.FLOAT,
    defaultValue: 1000,
    field: 'security_deposit',
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  description: {
    type: DataTypes.TEXT,
  },
  descriptionNepali: {
    type: DataTypes.TEXT,
    field: 'description_nepali',
  },
  specifications: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
  shopId: {
    type: DataTypes.UUID,
    allowNull: true,  // ✅ Made optional
    field: 'shop_id',
  },
  locationLat: {
    type: DataTypes.FLOAT,
    field: 'location_lat',
  },
  locationLng: {
    type: DataTypes.FLOAT,
    field: 'location_lng',
  },
  locationAddress: {
    type: DataTypes.STRING,
    field: 'location_address',
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  totalRentals: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'total_rentals',
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  registrationCertificate: {
    type: DataTypes.STRING,
    field: 'registration_certificate',
  },
  insuranceDocument: {
    type: DataTypes.STRING,
    field: 'insurance_document',
  },
  pollutionCertificate: {
    type: DataTypes.STRING,
    field: 'pollution_certificate',
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
}, {
  tableName: 'motorcycles',
  timestamps: true,
});

module.exports = Motorcycle;
