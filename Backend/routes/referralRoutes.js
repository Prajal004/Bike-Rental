const express = require('express');
const router = express.Router();
const {
  validateReferralCode,
  getMyReferralCode,
  getReferralStats,
  getWalletBalance,
  applyReferralCode,
} = require('../controllers/referralController');
const { protect } = require('../middleware/authMiddleware');

// Protected routes (FEATURE 2)
router.post('/validate', validateReferralCode);
router.get('/my-code', protect, getMyReferralCode);
router.get('/stats', protect, getReferralStats);
router.get('/wallet', protect, getWalletBalance);
router.post('/apply', protect, applyReferralCode);

module.exports = router;