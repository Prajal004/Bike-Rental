const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Import controllers (temporary mock)
const createRental = async (req, res) => {
  try {
    const {
      motorcycleId,
      startDate,
      endDate,
      pickupLocation,
      returnLocation,
      paymentMethod
    } = req.body;
    
    // Calculate days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const basePrice = 280 * duration;
    const totalPrice = basePrice + 1000;
    const rentalId = 'RENT' + Date.now();
    
    res.status(201).json({
      success: true,
      message: 'Rental created successfully',
      rental: {
        rentalId: rentalId,
        totalPrice: totalPrice,
        status: 'pending'
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

const getUserRentals = async (req, res) => {
  res.json({ success: true, rentals: [] });
};

const getRentalById = async (req, res) => {
  res.json({ success: true, rental: null });
};

const cancelRental = async (req, res) => {
  res.json({ success: true, message: 'Rental cancelled' });
};

// Routes
router.post('/create', protect, createRental);
router.get('/user', protect, getUserRentals);
router.get('/:id', protect, getRentalById);
router.put('/:id/cancel', protect, cancelRental);

module.exports = router;
