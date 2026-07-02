const User = require('../models/User');
const Referral = require('../models/Referral');
const Rental = require('../models/Rental');
const { sendReferralBonusSMS } = require('../utils/sendSMS');

// @desc    Validate referral code
// @route   POST /api/referrals/validate
// @access  Public
const validateReferralCode = async (req, res) => {
  try {
    const { referralCode } = req.body;
    
    const referrer = await User.findOne({ referralCode });
    
    if (!referrer) {
      return res.status(404).json({
        success: false,
        message: 'Invalid referral code',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Valid referral code',
      referrerName: referrer.fullName,
      discountAmount: 100, // Rs 100 discount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get user's referral code
// @route   GET /api/referrals/my-code
// @access  Private
const getMyReferralCode = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.status(200).json({
      success: true,
      referralCode: user.referralCode,
      totalReferrals: user.totalReferrals,
      referralCreditsEarned: user.referralCreditsEarned,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get referral statistics
// @route   GET /api/referrals/stats
// @access  Private
const getReferralStats = async (req, res) => {
  try {
    const successfulReferrals = await Referral.find({
      referrer: req.user._id,
      status: 'completed',
    }).populate('referee', 'fullName phone createdAt');
    
    const pendingReferrals = await Referral.find({
      referrer: req.user._id,
      status: 'pending',
    });
    
    const totalEarned = req.user.referralCreditsEarned;
    const currentWallet = req.user.walletBalance;
    
    res.status(200).json({
      success: true,
      stats: {
        totalReferrals: successfulReferrals.length,
        pendingReferrals: pendingReferrals.length,
        totalEarned,
        currentWallet,
        successfulReferrals,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get wallet balance
// @route   GET /api/referrals/wallet
// @access  Private
const getWalletBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.status(200).json({
      success: true,
      walletBalance: user.walletBalance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Apply referral code to rental (FEATURE 2)
// @route   POST /api/referrals/apply
// @access  Private
const applyReferralCode = async (req, res) => {
  try {
    const { referralCode, rentalId } = req.body;
    
    // Find referrer
    const referrer = await User.findOne({ referralCode });
    if (!referrer) {
      return res.status(404).json({
        success: false,
        message: 'Invalid referral code',
      });
    }
    
    // Check if user already used a referral
    const existingReferral = await Referral.findOne({
      referee: req.user._id,
      status: { $in: ['pending', 'completed'] },
    });
    
    if (existingReferral) {
      return res.status(400).json({
        success: false,
        message: 'You have already used a referral code',
      });
    }
    
    // Create referral record
    const referral = await Referral.create({
      referrer: referrer._id,
      referee: req.user._id,
      referralCode,
      status: 'pending',
      rental: rentalId,
    });
    
    res.status(200).json({
      success: true,
      message: 'Referral code applied successfully',
      discountAmount: 100, // Rs 100 discount
      referralId: referral._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Complete referral after first rental
// @route   Internal function
const completeReferral = async (referralId, rental) => {
  try {
    const referral = await Referral.findById(referralId);
    if (!referral || referral.status === 'completed') return;
    
    // Update referral status
    referral.status = 'completed';
    referral.completedAt = new Date();
    await referral.save();
    
    // Add bonus to referrer
    const referrer = await User.findById(referral.referrer);
    referrer.walletBalance += referral.referrerBonus;
    referrer.referralCreditsEarned += referral.referrerBonus;
    referrer.totalReferrals += 1;
    await referrer.save();
    
    // Send SMS notification
    await sendReferralBonusSMS(referrer.phone, referral.referrerBonus, 'earned');
    
    return { success: true };
  } catch (error) {
    console.error('Error completing referral:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  validateReferralCode,
  getMyReferralCode,
  getReferralStats,
  getWalletBalance,
  applyReferralCode,
  completeReferral,
};