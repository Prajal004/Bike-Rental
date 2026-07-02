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
    
    // Calculate days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    // Get motorcycle
    const motorcycle = await Motorcycle.findById(motorcycleId);
    if (!motorcycle) {
      return res.status(404).json({
        success: false,
        message: 'Motorcycle not found'
      });
    }
    
    // Calculate price
    const basePrice = motorcycle.pricePerDay * duration;
    const totalPrice = basePrice + 1000;
    const rentalId = 'RENT' + Date.now();
    
    // Create and SAVE to database
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
    
    // Save to database
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

module.exports = {
  createRental,
  // ... other functions
};
