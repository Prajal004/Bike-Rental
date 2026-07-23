const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createRental,
  getUserRentals,
  getRentalById,
  cancelRental
} = require('../controllers/rentController');

// Routes
router.post('/create', protect, createRental);
router.get('/user', protect, getUserRentals);
router.get('/:id', protect, getRentalById);
router.put('/:id/cancel', protect, cancelRental);

module.exports = router;