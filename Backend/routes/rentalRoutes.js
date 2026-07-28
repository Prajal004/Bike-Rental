const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { isCustomer, isShopOwner } = require('../middleware/roleMiddleware');
const {
  createRental,
  getRentals,
  getRentalById,
  getMyRentals,
  updateRentalStatus,
  cancelRental
} = require('../controllers/rentController');

// Public routes
router.get('/', getRentals);
router.get('/:id', getRentalById);

// Protected routes
router.post('/', protect, isCustomer, createRental);
router.get('/my-rentals', protect, getMyRentals);
router.put('/:id/cancel', protect, isCustomer, cancelRental);
router.put('/:id/status', protect, isShopOwner, updateRentalStatus);

module.exports = router;
