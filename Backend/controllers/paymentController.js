const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const User = require('../models/User');

// Initiate eSewa Payment
exports.initiateEsewa = async (req, res) => {
  try {
    const { rentalId, amount, method } = req.body;

    if (!rentalId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'rentalId and amount are required'
      });
    }

    const booking = await Booking.findByPk(rentalId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.customerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not own this booking'
      });
    }

    const payment = await Payment.create({
      paymentId: `PAY${Date.now()}`,
      rentalId,
      userId: req.user.id,
      amount,
      originalAmount: amount,
      method: method || 'esewa',
      status: 'pending',
      transactionData: {
        bookingId: booking.bookingId,
        customerEmail: req.user.email,
        customerPhone: req.user.phone
      }
    });

    await booking.update({ paymentStatus: 'pending' });

    const esewaUrl = `${process.env.ESEWA_PAYMENT_URL || 'https://esewa.com.np/api/epay/main/v2/form'}`;

    res.json({
      success: true,
      message: 'Payment initiated successfully',
      data: {
        paymentId: payment.id,
        paymentReference: payment.paymentId,
        amount: payment.amount,
        status: payment.status,
        paymentUrl: esewaUrl,
        bookingId: booking.bookingId
      }
    });
  } catch (error) {
    console.error('Initiate eSewa Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Initiate Khalti Payment
exports.initiateKhalti = async (req, res) => {
  try {
    const { rentalId, amount } = req.body;

    if (!rentalId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'rentalId and amount are required'
      });
    }

    const booking = await Booking.findByPk(rentalId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.customerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not own this booking'
      });
    }

    const payment = await Payment.create({
      paymentId: `PAY${Date.now()}`,
      rentalId,
      userId: req.user.id,
      amount,
      originalAmount: amount,
      method: 'khalti',
      status: 'pending',
      transactionData: {
        bookingId: booking.bookingId,
        customerEmail: req.user.email,
        customerPhone: req.user.phone
      }
    });

    await booking.update({ paymentStatus: 'pending' });

    const khaltiUrl = `${process.env.KHALTI_PAYMENT_URL || 'https://khalti.com/api/v2/payment/initiate/'}`;

    res.json({
      success: true,
      message: 'Khalti payment initiated successfully',
      data: {
        paymentId: payment.id,
        paymentReference: payment.paymentId,
        amount: payment.amount,
        status: payment.status,
        paymentUrl: khaltiUrl,
        bookingId: booking.bookingId
      }
    });
  } catch (error) {
    console.error('Initiate Khalti Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Initiate FonePay Payment
exports.initiateFonepay = async (req, res) => {
  try {
    const { rentalId, amount } = req.body;

    if (!rentalId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'rentalId and amount are required'
      });
    }

    const booking = await Booking.findByPk(rentalId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.customerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not own this booking'
      });
    }

    const payment = await Payment.create({
      paymentId: `PAY${Date.now()}`,
      rentalId,
      userId: req.user.id,
      amount,
      originalAmount: amount,
      method: 'fonepay',
      status: 'pending',
      transactionData: {
        bookingId: booking.bookingId,
        customerEmail: req.user.email,
        customerPhone: req.user.phone
      }
    });

    await booking.update({ paymentStatus: 'pending' });

    const fonepayUrl = `${process.env.FONEPAY_PAYMENT_URL || 'https://api.fonepay.com/api/epay/main/v2/form'}`;

    res.json({
      success: true,
      message: 'FonePay payment initiated successfully',
      data: {
        paymentId: payment.id,
        paymentReference: payment.paymentId,
        amount: payment.amount,
        status: payment.status,
        paymentUrl: fonepayUrl,
        bookingId: booking.bookingId
      }
    });
  } catch (error) {
    console.error('Initiate FonePay Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Get payment status
exports.getPaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findByPk(id, {
      include: [
        { 
          model: Booking, 
          as: 'booking',
          attributes: ['bookingId', 'status', 'totalAmount'] 
        },
        { 
          model: User, 
          as: 'user',
          attributes: ['id', 'name', 'email'] 
        }
      ]
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    if (payment.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error('Get Payment Status Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Get my payments
exports.getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      where: { userId: req.user.id },
      include: [
        { 
          model: Booking, 
          as: 'booking',
          attributes: ['bookingId', 'status', 'totalAmount'] 
        }
      ],
      order: [['created_at', 'DESC']]  // ✅ Fixed: createdAt → created_at
    });

    res.json({
      success: true,
      data: payments
    });
  } catch (error) {
    console.error('Get My Payments Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
