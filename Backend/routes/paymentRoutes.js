const express = require('express');
const router = express.Router();
const {
  initiateEsewaPayment,
  initiateKhaltiPayment,
  initiateFonepayPayment,
  esewaWebhook,
  getPaymentStatus,
  getInvoice,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// Public webhook
router.post('/esewa/webhook', esewaWebhook);

// Protected routes (FEATURE 1)
router.post('/esewa/initiate', protect, initiateEsewaPayment);
router.post('/khalti/initiate', protect, initiateKhaltiPayment);
router.post('/fonepay/initiate', protect, initiateFonepayPayment);
router.get('/status/:paymentId', protect, getPaymentStatus);
router.get('/invoice/:rentalId', protect, getInvoice);

module.exports = router;