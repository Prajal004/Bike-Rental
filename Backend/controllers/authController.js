const { Op } = require('sequelize');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateOTPWithExpiry } = require('../utils/generateOTP');
const { sendOTP } = require('../utils/sendSMS');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'my_secret_key', {
    expiresIn: '30d',
  });
};

const register = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;
    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    const userExists = await User.findOne({ where: { [Op.or]: [{ email }, { phone }] } });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const user = await User.create({ fullName, email, phone, password });
    const { otp, expiresAt } = generateOTPWithExpiry();
    user.otpCode = otp;
    user.otpExpiresAt = expiresAt;
    await user.save();
    await sendOTP(phone, otp);
    res.status(201).json({ success: true, message: 'User registered. OTP sent.', userId: user.id });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const { otp, expiresAt } = generateOTPWithExpiry();
    user.otpCode = otp;
    user.otpExpiresAt = expiresAt;
    await user.save();
    await sendOTP(user.phone, otp);
    res.status(200).json({ success: true, message: 'OTP sent to your phone', userId: user.id });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// ✅ verifyOTP — Role return garne
const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (!user.otpCode || user.otpCode !== otp || user.otpExpiresAt < new Date()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }
    user.otpCode = null;
    user.otpExpiresAt = null;
    user.isVerified = true;
    await user.save();
    const token = generateToken(user.id);
    
    // ✅ Role return garne
    res.status(200).json({
      success: true,
      message: 'OTP verified',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role || 'customer',  // ✅ Role add!
        walletBalance: user.walletBalance || 0,
      }
    });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

const resendOTP = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const { otp, expiresAt } = generateOTPWithExpiry();
    user.otpCode = otp;
    user.otpExpiresAt = expiresAt;
    await user.save();
    await sendOTP(user.phone, otp);
    res.status(200).json({ success: true, message: 'OTP resent' });
  } catch (error) {
    console.error('Resend OTP Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password', 'otpCode', 'otpExpiresAt'] }
    });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

module.exports = { register, login, verifyOTP, resendOTP, getProfile };
