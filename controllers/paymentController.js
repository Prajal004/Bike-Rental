const Payment = require('../models/Payment');
const Rental = require('../models/Rental');
const User = require('../models/User');
const { ESEWA_CONFIG } = require('../config/esewaConfig');
const { KHALTI_CONFIG } = require('../config/khaltiConfig');
const { FONEPAY_CONFIG } = require('../config/fonepayConfig');
const QRCode = require('qrcode');
const axios = require('axios');
const { completeReferral } = require('./referralController');

// @desc    Initiate eSewa payment (FEATURE 1)
// @route   POST /api/payments/esewa/initiate
// @access  Private
const initiateEsewaPayment = async (req, res) => {
  try {
    const { rentalId } = req.body;
    
    const rental = await Rental.findById(rentalId);
    if (!rental) {
      return res.status(404).json({
        success: false,
        message: 'Rental not found',
      });
    }
    
    // Create payment record
    const payment = await Payment.create({
      rental: rentalId,
      user: req.user._id,
      amount: rental.totalPrice,
      originalAmount: rental.totalPrice,
      discountApplied: rental.referralDiscount || 0,
      walletUsed: rental.walletCreditUsed || 0,
      method: 'esewa',
      status: 'pending',
    });
    
    // Update rental with payment ID
    rental.paymentId = payment._id;
    await rental.save();
    
    // Prepare eSewa form data
    const esewaData = {
      amt: rental.totalPrice,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: rental.totalPrice,
      pid: payment.paymentId,
      scd: ESEWA_CONFIG.merchantCode,
      su: `${req.headers.origin}/payment/success`,
      fu: `${req.headers.origin}/payment/failure`,
    };
    
    res.status(200).json({
      success: true,
      paymentId: payment.paymentId,
      esewaUrl: ESEWA_CONFIG.getPaymentUrl(),
      esewaData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Initiate Khalti payment (FEATURE 1)
// @route   POST /api/payments/khalti/initiate
// @access  Private
const initiateKhaltiPayment = async (req, res) => {
  try {
    const { rentalId } = req.body;
    
    const rental = await Rental.findById(rentalId);
    if (!rental) {
      return res.status(404).json({
        success: false,
        message: 'Rental not found',
      });
    }
    
    // Create payment record
    const payment = await Payment.create({
      rental: rentalId,
      user: req.user._id,
      amount: rental.totalPrice,
      originalAmount: rental.totalPrice,
      discountApplied: rental.referralDiscount || 0,
      walletUsed: rental.walletCreditUsed || 0,
      method: 'khalti',
      status: 'pending',
    });
    
    // Update rental with payment ID
    rental.paymentId = payment._id;
    await rental.save();
    
    // Prepare Khalti API request
    const khaltiData = {
      return_url: `${req.headers.origin}/payment/success`,
      website_url: req.headers.origin,
      amount: rental.totalPrice * 100, // Khalti expects paisa
      purchase_order_id: payment.paymentId,
      purchase_order_name: `Rental ${rental.rentalId}`,
      customer_info: {
        name: req.user.fullName,
        email: req.user.email,
        phone: req.user.phone,
      },
    };
    
    const response = await axios.post(KHALTI_CONFIG.getPaymentUrl(), khaltiData, {
      headers: {
        Authorization: `Key ${KHALTI_CONFIG.secretKey}`,
        'Content-Type': 'application/json',
      },
    });
    
    res.status(200).json({
      success: true,
      paymentId: payment.paymentId,
      khaltiPaymentUrl: response.data.payment_url,
      khaltiData: response.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Khalti payment initiation failed',
    });
  }
};

// @desc    Initiate Fonepay QR payment (FEATURE 1)
// @route   POST /api/payments/fonepay/initiate
// @access  Private
const initiateFonepayPayment = async (req, res) => {
  try {
    const { rentalId } = req.body;
    
    const rental = await Rental.findById(rentalId);
    if (!rental) {
      return res.status(404).json({
        success: false,
        message: 'Rental not found',
      });
    }
    
    // Create payment record
    const payment = await Payment.create({
      rental: rentalId,
      user: req.user._id,
      amount: rental.totalPrice,
      originalAmount: rental.totalPrice,
      discountApplied: rental.referralDiscount || 0,
      walletUsed: rental.walletCreditUsed || 0,
      method: 'fonepay',
      status: 'pending',
    });
    
    // Update rental with payment ID
    rental.paymentId = payment._id;
    await rental.save();
    
    // Generate QR code data (simplified - actual Fonepay integration requires more)
    const qrData = {
      merchantId: FONEPAY_CONFIG.merchantId,
      amount: rental.totalPrice,
      transactionId: payment.paymentId,
      merchantName: 'Motorcycle Rental App',
    };
    
    const qrString = JSON.stringify(qrData);
    const qrCode = await QRCode.toDataURL(qrString);
    
    res.status(200).json({
      success: true,
      paymentId: payment.paymentId,
      qrCode,
      amount: rental.totalPrice,
      expiresIn: 300, // 5 minutes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Fonepay QR generation failed',
    });
  }
};

// @desc    Handle eSewa payment webhook/callback
// @route   POST /api/payments/esewa/webhook
// @access  Public
const esewaWebhook = async (req, res) => {
  try {
    const { pid, refId, amt } = req.body;
    
    const payment = await Payment.findOne({ paymentId: pid });
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    
    // Verify payment with eSewa
    const verificationResponse = await axios.get(ESEWA_CONFIG.getVerificationUrl(), {
      params: {
        amt,
        rid: refId,
        pid,
        scd: ESEWA_CONFIG.merchantCode,
      },
    });
    
    if (verificationResponse.data.includes('Success')) {
      // Update payment status
      payment.status = 'success';
      payment.transactionId = refId;
      payment.paidAt = new Date();
      await payment.save();
      
      // Update rental status
      const rental = await Rental.findById(payment.rental);
      rental.paymentStatus = 'paid';
      rental.status = 'confirmed';
      await rental.save();
      
      // Complete referral if applicable
      if (rental.referredBy) {
        const Referral = require('../models/Referral');
        const referral = await Referral.findOne({
          referee: rental.user,
          status: 'pending',
        });
        if (referral) {
          await completeReferral(referral._id, rental);
        }
      }
      
      res.status(200).json({ success: true });
    } else {
      payment.status = 'failed';
      await payment.save();
      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};

// @desc    Get payment status
// @route   GET /api/payments/status/:paymentId
// @access  Private
const getPaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findOne({ paymentId: req.params.paymentId })
      .populate('rental');
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }
    
    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get invoice
// @route   GET /api/invoices/:rentalId
// @access  Private
const getInvoice = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.rentalId)
      .populate('user', 'fullName email phone')
      .populate('motorcycle', 'name brand pricePerDay');
    
    if (!rental) {
      return res.status(404).json({
        success: false,
        message: 'Rental not found',
      });
    }
    
    const payment = await Payment.findOne({ rental: rental._id });
    
    res.status(200).json({
      success: true,
      invoice: {
        rentalId: rental.rentalId,
        date: rental.createdAt,
        customer: rental.user,
        motorcycle: rental.motorcycle,
        duration: rental.duration,
        startDate: rental.startDate,
        endDate: rental.endDate,
        basePrice: rental.basePrice,
        deliveryFee: rental.deliveryFee,
        securityDeposit: rental.securityDeposit,
        referralDiscount: rental.referralDiscount,
        walletCreditUsed: rental.walletCreditUsed,
        totalPrice: rental.totalPrice,
        paymentStatus: rental.paymentStatus,
        paymentMethod: rental.paymentMethod,
        transactionId: payment?.transactionId,
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

module.exports = {
  initiateEsewaPayment,
  initiateKhaltiPayment,
  initiateFonepayPayment,
  esewaWebhook,
  getPaymentStatus,
  getInvoice,
};