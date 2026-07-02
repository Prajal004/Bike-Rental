const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide full name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false,
  },
  preferredLanguage: {
    type: String,
    enum: ['ne', 'en'],
    default: 'en',
  },
  profileImage: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  drivingLicense: {
    licenseNumber: String,
    imageUrl: String,
    verified: { type: Boolean, default: false },
  },
  referralCode: {
    type: String,
    unique: true,
    sparse: true,
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  walletBalance: {
    type: Number,
    default: 0,
  },
  totalReferrals: {
    type: Number,
    default: 0,
  },
  referralCreditsEarned: {
    type: Number,
    default: 0,
  },
  emergencyContacts: [
    {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      relation: { type: String, required: true },
    },
  ],
  defaultPaymentMethod: {
    type: String,
    enum: ['esewa', 'khalti', 'fonepay', 'cash'],
    default: 'cash',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    code: String,
    expiresAt: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.updatedAt = Date.now();
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate referral code if not exists
userSchema.pre('save', async function (next) {
  if (!this.referralCode && this.isNew) {
    const baseCode = this.fullName.substring(0, 4).toUpperCase() + 
                     this.phone.slice(-4);
    this.referralCode = baseCode;
    
    let existingUser = await mongoose.model('User').findOne({ referralCode: this.referralCode });
    let counter = 1;
    while (existingUser) {
      this.referralCode = `${baseCode}${counter}`;
      existingUser = await mongoose.model('User').findOne({ referralCode: this.referralCode });
      counter++;
    }
  }
  next();
});

module.exports = mongoose.model('User', userSchema);