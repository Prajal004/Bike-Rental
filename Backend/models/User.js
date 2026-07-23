const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'full_name',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preferredLanguage: {
    type: DataTypes.ENUM('ne', 'en'),
    defaultValue: 'en',
    field: 'preferred_language',
  },
  profileImage: {
    type: DataTypes.STRING,
    defaultValue: '',
    field: 'profile_image',
  },
  address: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  referralCode: {
    type: DataTypes.STRING,
    unique: true,
    field: 'referral_code',
  },
  referredBy: {
    type: DataTypes.UUID,
    field: 'referred_by',
  },
  walletBalance: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    field: 'wallet_balance',
  },
  totalReferrals: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'total_referrals',
  },
  referralCreditsEarned: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    field: 'referral_credits_earned',
  },
  emergencyContacts: {
    type: DataTypes.JSONB,
    defaultValue: [],
    field: 'emergency_contacts',
  },
  defaultPaymentMethod: {
    type: DataTypes.ENUM('esewa', 'khalti', 'fonepay', 'cash'),
    defaultValue: 'cash',
    field: 'default_payment_method',
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_verified',
  },
  otpCode: {
    type: DataTypes.STRING,
    field: 'otp_code',
  },
  otpExpiresAt: {
    type: DataTypes.DATE,
    field: 'otp_expires_at',
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
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  }
});

// Instance method to compare password
User.prototype.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User;
