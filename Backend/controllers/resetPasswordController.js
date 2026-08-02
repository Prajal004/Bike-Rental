const User = require('../models/User');
const { generateOTPWithExpiry } = require('../utils/generateOTP');
const { sendSMS } = require('../config/smsConfig');

// Forgot Password - Send OTP
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with this email'
      });
    }

    const { otp, expiresAt } = generateOTPWithExpiry();
    user.otpCode = otp;
    user.otpExpiresAt = expiresAt;
    await user.save();

    await sendSMS(user.phone, `Your password reset code is: ${otp}. Valid for 10 minutes.`);

    res.status(200).json({
      success: true,
      message: 'OTP sent to your phone',
      userId: user.id
    });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Reset Password - Verify OTP and Set New Password
const resetPassword = async (req, res) => {
  try {
    const { userId, otp, newPassword } = req.body;

    if (!userId || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'userId, OTP and newPassword are required'
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!user.otpCode || user.otpCode !== otp || user.otpExpiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Password set garne — model hook le automatically hash gardincha
    user.password = newPassword;
    user.otpCode = null;
    user.otpExpiresAt = null;
    await user.save();

    console.log('✅ Password reset successfully for:', user.email);

    res.status(200).json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

module.exports = { forgotPassword, resetPassword };
