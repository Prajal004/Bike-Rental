const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { isCustomer } = require('../middleware/roleMiddleware');
const {
  initiateEsewa,
  initiateKhalti,
  initiateFonepay,
  getPaymentStatus,
  getMyPayments
} = require('../controllers/paymentController');

// Protected routes
router.post('/esewa', protect, isCustomer, initiateEsewa);
router.post('/khalti', protect, isCustomer, initiateKhalti);
router.post('/fonepay', protect, isCustomer, initiateFonepay);
router.get('/:id/status', protect, getPaymentStatus);
router.get('/my-payments', protect, getMyPayments);

module.exports = router;
