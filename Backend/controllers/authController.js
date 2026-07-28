const { Op } = require('sequelize');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { generateOTPWithExpiry } = require('../utils/generateOTP');
const { sendOTP } = require('../utils/sendSMS');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const register = async (req, res) => {
  try {
    const { fullName, email, phone, password, referralCode } = req.body;

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: fullName, email, phone, password',
      });
    }

    const userExists = await User.findOne({
      where: {
        [Op.or]: [{ email }, { phone }]
      }
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or phone',
      });
    }

    const user = await User.create({
      name: fullName,
      email,
      phone,
      password,
    });

    if (referralCode) {
      const referrer = await User.findOne({
        where: { referralCode }
      });
      if (referrer) {
        user.referredBy = referrer.id;
        await user.save();
      }
    }

    const { otp, expiresAt } = generateOTPWithExpiry();
    user.otpCode = otp;
    user.otpExpiresAt = expiresAt;
    await user.save();

    await sendOTP(phone, otp);

    res.status(201).json({
      success: true,
      message: 'User registered. OTP sent to your phone.',
      userId: user.id,
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const { otp, expiresAt } = generateOTPWithExpiry();
    user.otpCode = otp;
    user.otpExpiresAt = expiresAt;
    await user.save();

    await sendOTP(user.phone, otp);

    res.status(200).json({
      success: true,
      message: 'OTP sent to your phone',
      userId: user.id,
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({
        success: false,
        message: 'userId and otp are required',
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (!user.otpCode || user.otpCode !== otp || user.otpExpiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP',
      });
    }

    user.otpCode = null;
    user.otpExpiresAt = null;
    user.isVerified = true;
    await user.save();

    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        referralCode: user.referralCode,
        walletBalance: user.walletBalance,
        role: user.role || 'customer',
      },
    });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

const resendOTP = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required',
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const { otp, expiresAt } = generateOTPWithExpiry();
    user.otpCode = otp;
    user.otpExpiresAt = expiresAt;
    await user.save();

    await sendOTP(user.phone, otp);

    res.status(200).json({
      success: true,
      message: 'OTP resent successfully',
    });
  } catch (error) {
    console.error('Resend OTP Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password', 'otpCode', 'otpExpiresAt'] }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

module.exports = {
  register,
  login,
  verifyOTP,
  resendOTP,
  getProfile,
};