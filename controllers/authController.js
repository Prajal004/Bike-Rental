const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { generateOTPWithExpiry } = require('../utils/generateOTP');
const { sendOTP } = require('../utils/sendSMS');
const { generateReferralCode } = require('../utils/generateReferralCode');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { fullName, email, phone, password, referralCode } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or phone',
      });
    }

    // Create user
    const user = await User.create({
      fullName,
      email,
      phone,
      password,
    });

    // Handle referral code if provided (FEATURE 2)
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        user.referredBy = referrer._id;
        await user.save();
        
        // Create referral record
        const Referral = require('../models/Referral');
        await Referral.create({
          referrer: referrer._id,
          referee: user._id,
          referralCode: referralCode,
          status: 'pending',
        });
      }
    }

    // Generate and send OTP
    const { otp, expiresAt } = generateOTPWithExpiry();
    user.otp = { code: otp, expiresAt };
    await user.save();

    // Send OTP via SMS
    await sendOTP(phone, otp);

    res.status(201).json({
      success: true,
      message: 'User registered. OTP sent to your phone.',
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate and send OTP
    const { otp, expiresAt } = generateOTPWithExpiry();
    user.otp = { code: otp, expiresAt };
    await user.save();

    // Send OTP via SMS
    await sendOTP(user.phone, otp);

    res.status(200).json({
      success: true,
      message: 'OTP sent to your phone',
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check OTP
    if (!user.otp || user.otp.code !== otp || user.otp.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP',
      });
    }

    // Clear OTP
    user.otp = undefined;
    user.isVerified = true;
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Return user data (without sensitive info)
    const userData = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      preferredLanguage: user.preferredLanguage,
      referralCode: user.referralCode,
      walletBalance: user.walletBalance,
      emergencyContacts: user.emergencyContacts,
    };

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      token,
      user: userData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
// @access  Public
const resendOTP = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Generate new OTP
    const { otp, expiresAt } = generateOTPWithExpiry();
    user.otp = { code: otp, expiresAt };
    await user.save();

    // Send OTP via SMS
    await sendOTP(user.phone, otp);

    res.status(200).json({
      success: true,
      message: 'OTP resent successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update language preference (FEATURE 3)
// @route   PUT /api/auth/language
// @access  Private
const updateLanguage = async (req, res) => {
  try {
    const { language } = req.body; // 'ne' or 'en'
    
    if (!['ne', 'en'].includes(language)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid language. Use "ne" or "en"',
      });
    }

    const user = await User.findById(req.user._id);
    user.preferredLanguage = language;
    await user.save();

    res.status(200).json({
      success: true,
      message: `Language updated to ${language === 'ne' ? 'Nepali' : 'English'}`,
      preferredLanguage: language,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password -otp');
    
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update emergency contacts (FEATURE 4)
// @route   PUT /api/auth/emergency-contacts
// @access  Private
const updateEmergencyContacts = async (req, res) => {
  try {
    const { emergencyContacts } = req.body;
    
    const user = await User.findById(req.user._id);
    user.emergencyContacts = emergencyContacts;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Emergency contacts updated',
      emergencyContacts: user.emergencyContacts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  register,
  login,
  verifyOTP,
  resendOTP,
  updateLanguage,
  getProfile,
  updateEmergencyContacts,
};