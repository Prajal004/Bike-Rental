const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// ✅ Temporary mock controllers
const initiateEsewaPayment = async (req, res) => {
  try {
    const { rentalId } = req.body;
    res.json({
      success: true,
      message: 'eSewa payment initiated',
      paymentUrl: 'https://esewa.com.np/pay',
      paymentId: 'PAY-' + Date.now(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const initiateKhaltiPayment = async (req, res) => {
  try {
    const { rentalId } = req.body;
    res.json({
      success: true,
      message: 'Khalti payment initiated',
      paymentUrl: 'https://khalti.com/pay',
      paymentId: 'PAY-' + Date.now(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const initiateFonepayPayment = async (req, res) => {
  try {
    const { rentalId } = req.body;
    res.json({
      success: true,
      message: 'Fonepay payment initiated',
      qrCode: 'data:image/png;base64,...',
      paymentId: 'PAY-' + Date.now(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPaymentStatus = async (req, res) => {
  try {
    res.json({
      success: true,
      payment: {
        id: req.params.paymentId,
        status: 'success',
        amount: 350,
        method: 'esewa',
        createdAt: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getInvoice = async (req, res) => {
  try {
    res.json({
      success: true,
      invoice: {
        id: 'INV-' + Date.now(),
        rentalId: req.params.rentalId,
        amount: 350,
        status: 'paid',
        createdAt: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Routes
router.post('/esewa/initiate', protect, initiateEsewaPayment);
router.post('/khalti/initiate', protect, initiateKhaltiPayment);
router.post('/fonepay/initiate', protect, initiateFonepayPayment);
router.get('/status/:paymentId', protect, getPaymentStatus);
router.get('/invoice/:rentalId', protect, getInvoice);

module.exports = router;
