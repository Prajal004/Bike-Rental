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
    allowNull: true,
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
  role: {
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_verified',
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active',
  },
  referralCode: {
    type: DataTypes.STRING,
    field: 'referral_code',
  },
  referredBy: {
    type: DataTypes.UUID,
    field: 'referred_by',
  },
  otpCode: {
    type: DataTypes.STRING,
    field: 'otp_code',
  },
  otpExpiresAt: {
    type: DataTypes.DATE,
    field: 'otp_expires_at',
  },
  walletBalance: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    field: 'wallet_balance',
  },
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        console.log('🔐 Password hashed for new user');
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        console.log('🔐 Password hashed for update');
      }
    }
  }
});

// ✅ Compare password method
User.prototype.comparePassword = async function(enteredPassword) {
  console.log('🔐 Comparing password...');
  console.log('📝 Entered:', enteredPassword);
  console.log('📝 Stored hash:', this.password);
  const result = await bcrypt.compare(enteredPassword, this.password);
  console.log('🔑 Result:', result);
  return result;
};

module.exports = User;
