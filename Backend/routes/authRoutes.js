const express = require('express');
const router = express.Router();
const { register, login, verifyOTP, resendOTP, getProfile } = require('../controllers/authController');
const { forgotPassword, resetPassword } = require('../controllers/resetPasswordController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/profile', protect, getProfile);

module.exports = router;
