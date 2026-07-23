const Rental = require('../models/Rental');
const Motorcycle = require('../models/Motorcycle');

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
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    const motorcycle = await Motorcycle.findById(motorcycleId);
    if (!motorcycle) {
      return res.status(404).json({
        success: false,
        message: 'Motorcycle not found'
      });
    }
    
    const basePrice = motorcycle.pricePerDay * duration;
    const totalPrice = basePrice + 1000;
    const rentalId = 'RENT' + Date.now();
    
    const rental = new Rental({
      rentalId: rentalId,
      user: req.user.id,
      motorcycle: motorcycleId,
      pickupLocation: { address: pickupLocation },
      returnLocation: { address: returnLocation },
      startDate: start,
      endDate: end,
      duration: duration,
      basePrice: basePrice,
      deliveryFee: 0,
      securityDeposit: 1000,
      totalPrice: totalPrice,
      paymentMethod: paymentMethod,
      paymentStatus: 'pending',
      status: 'pending'
    });
    
    await rental.save();
    
    res.status(201).json({
      success: true,
      message: 'Rental created successfully',
      rental: {
        rentalId: rental.rentalId,
        totalPrice: rental.totalPrice,
        status: rental.status
      }
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// ✅ ADDED: Get user rentals
const getUserRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({ user: req.user.id })
      .populate('motorcycle', 'name brand pricePerDay images')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      rentals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// ✅ ADDED: Get rental by ID
const getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id)
      .populate('motorcycle')
      .populate('user', 'fullName email phone');
    
    if (!rental) {
      return res.status(404).json({
        success: false,
        message: 'Rental not found'
      });
    }
    
    res.json({
      success: true,
      rental
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// ✅ ADDED: Cancel rental
const cancelRental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    
    if (!rental) {
      return res.status(404).json({
        success: false,
        message: 'Rental not found'
      });
    }
    
    if (rental.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this rental'
      });
    }
    
    if (rental.status === 'completed' || rental.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel this rental'
      });
    }
    
    rental.status = 'cancelled';
    await rental.save();
    
    res.json({
      success: true,
      message: 'Rental cancelled successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  createRental,
  getUserRentals,
  getRentalById,
  cancelRental
};