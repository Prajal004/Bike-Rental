const Booking = require('../models/Booking');
const Motorcycle = require('../models/Motorcycle');
const Shop = require('../models/Shop');
const User = require('../models/User');

// Create Rental/Booking
exports.createRental = async (req, res) => {
  try {
    const {
      motorcycleId,
      shopId,
      pickupLocation,
      dropoffLocation,
      startDate,
      endDate,
      totalHours,
      totalDays,
      specialRequests
    } = req.body;

    if (!motorcycleId || !shopId || !pickupLocation || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: motorcycleId, shopId, pickupLocation, startDate, endDate'
      });
    }

    // Check if motorcycle exists and is available
    const motorcycle = await Motorcycle.findByPk(motorcycleId);
    if (!motorcycle) {
      return res.status(404).json({
        success: false,
        message: 'Motorcycle not found'
      });
    }

    if (motorcycle.status !== 'available') {
      return res.status(400).json({
        success: false,
        message: 'Motorcycle is not available for rent'
      });
    }

    // Check if shop exists
    const shop = await Shop.findByPk(shopId);
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: 'Shop not found'
      });
    }

    // Calculate total amount
    const pricePerHour = motorcycle.pricePerHour || 0;
    const pricePerDay = motorcycle.pricePerDay || 0;
    const subtotal = (totalHours * pricePerHour) + (totalDays * pricePerDay);
    const tax = subtotal * 0.13; // 13% VAT
    const totalAmount = subtotal + tax;

    // ✅ Generate bookingId manually
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const bookingId = `BK${year}${month}${day}${random}`;

    // Create booking
    const booking = await Booking.create({
      bookingId: bookingId,  // ✅ Manual bookingId
      customerId: req.user.id,
      motorcycleId,
      shopId,
      pickupLocation,
      dropoffLocation: dropoffLocation || pickupLocation,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalHours: totalHours || 0,
      totalDays: totalDays || 0,
      pricePerHour,
      pricePerDay,
      subtotal,
      tax,
      totalAmount,
      securityDeposit: motorcycle.securityDeposit || 0,
      status: 'pending',
      paymentStatus: 'pending',
      specialRequests: specialRequests || null
    });

    // Update motorcycle status
    await motorcycle.update({ status: 'rented' });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    console.error('Create Rental Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Get all rentals
exports.getRentals = async (req, res) => {
  try {
    const rentals = await Booking.findAll({
      include: [
        { model: Motorcycle, attributes: ['id', 'name', 'brand', 'model'] },
        { model: Shop, attributes: ['id', 'name', 'address'] },
        { model: User, as: 'customer', attributes: ['id', 'name', 'email'] }
      ]
    });

    res.json({
      success: true,
      data: rentals
    });
  } catch (error) {
    console.error('Get Rentals Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Get rental by ID
exports.getRentalById = async (req, res) => {
  try {
    const rental = await Booking.findByPk(req.params.id, {
      include: [
        { model: Motorcycle, attributes: ['id', 'name', 'brand', 'model'] },
        { model: Shop, attributes: ['id', 'name', 'address'] },
        { model: User, as: 'customer', attributes: ['id', 'name', 'email'] }
      ]
    });

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: rental
    });
  } catch (error) {
    console.error('Get Rental Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Get my rentals (for customer)
exports.getMyRentals = async (req, res) => {
  try {
    const rentals = await Booking.findAll({
      where: { customerId: req.user.id },
      include: [
        { model: Motorcycle, attributes: ['id', 'name', 'brand', 'model'] },
        { model: Shop, attributes: ['id', 'name', 'address'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: rentals
    });
  } catch (error) {
    console.error('Get My Rentals Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Update rental status (Shop Owner)
exports.updateRentalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const rental = await Booking.findByPk(id);

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if shop owner owns this rental
    const shop = await Shop.findByPk(rental.shopId);
    if (shop.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not own this rental'
      });
    }

    await rental.update({ status });

    // If booking is completed, update motorcycle status
    if (status === 'completed') {
      await Motorcycle.update(
        { status: 'available' },
        { where: { id: rental.motorcycleId } }
      );
    }

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: rental
    });
  } catch (error) {
    console.error('Update Rental Status Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Cancel rental (Customer)
exports.cancelRental = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const rental = await Booking.findByPk(id);

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if customer owns this rental
    if (rental.customerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not own this booking'
      });
    }

    // Check if booking can be cancelled
    if (rental.status === 'completed' || rental.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking cannot be cancelled'
      });
    }

    await rental.update({
      status: 'cancelled',
      cancellationReason: reason || 'Cancelled by customer'
    });

    // Update motorcycle status back to available
    await Motorcycle.update(
      { status: 'available' },
      { where: { id: rental.motorcycleId } }
    );

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: rental
    });
  } catch (error) {
    console.error('Cancel Rental Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
