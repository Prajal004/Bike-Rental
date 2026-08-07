const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// ✅ Temporary mock controllers
const createRental = async (req, res) => {
  try {
    const { motorcycleId, startDate, endDate, pickupLocation, returnLocation, totalPrice } = req.body;
    
    const rental = {
      id: 'RENT-' + Date.now(),
      userId: req.user.id,
      motorcycleId,
      startDate,
      endDate,
      pickupLocation,
      returnLocation,
      totalPrice: totalPrice || 1000,
      status: 'pending',
      createdAt: new Date(),
    };
    
    res.status(201).json({
      success: true,
      message: 'Rental created successfully',
      rental,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

const getUserRentals = async (req, res) => {
  try {
    const rentals = [
      {
        id: 'RENT-1',
        motorcycleId: '1',
        motorcycleName: 'Honda CB Shine',
        startDate: '2026-07-28',
        endDate: '2026-07-29',
        totalPrice: 350,
        status: 'completed',
      },
      {
        id: 'RENT-2',
        motorcycleId: '2',
        motorcycleName: 'Yamaha FZ',
        startDate: '2026-07-27',
        endDate: '2026-07-28',
        totalPrice: 400,
        status: 'ongoing',
      },
    ];
    res.json({ success: true, rentals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getRentalById = async (req, res) => {
  try {
    const rental = {
      id: req.params.id,
      motorcycleId: '1',
      motorcycleName: 'Honda CB Shine',
      startDate: '2026-07-28',
      endDate: '2026-07-29',
      totalPrice: 350,
      status: 'completed',
      pickupLocation: 'Thamel',
      returnLocation: 'Thamel',
    };
    res.json({ success: true, rental });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const cancelRental = async (req, res) => {
  try {
    res.json({ success: true, message: 'Rental cancelled successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Routes
router.post('/create', protect, createRental);
router.get('/user', protect, getUserRentals);
router.get('/:id', protect, getRentalById);
router.put('/:id/cancel', protect, cancelRental);

module.exports = router;
