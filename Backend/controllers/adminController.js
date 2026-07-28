const { User } = require('../models/User');
const { Shop } = require('../models/Shop');
const { Motorcycle } = require('../models/Motorcycle');
const { Booking } = require('../models/Booking');
const { Payment } = require('../models/Payment');
const { sequelize } = require('../config/database');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password', 'otpCode', 'otpExpiresAt'] },
      include: [{ model: Shop, attributes: ['id', 'name', 'status'] }]
    });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all shops
exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.findAll({
      include: [{ model: User, attributes: ['name', 'email'] }]
    });
    res.json({ success: true, data: shops });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Approve/Reject Shop
exports.updateShopStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const shop = await Shop.findByPk(id);
    if (!shop) {
      return res.status(404).json({ success: false, message: 'Shop not found' });
    }

    shop.status = status;
    await shop.save();

    res.json({ success: true, data: shop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: User, attributes: ['name', 'email'] },
        { model: Motorcycle, attributes: ['name', 'brand'] },
        { model: Shop, attributes: ['name'] }
      ]
    });
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get platform stats
exports.getPlatformStats = async (req, res) => {
  try {
    const stats = await sequelize.query(`
      SELECT 
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM shops WHERE status = 'approved') as active_shops,
        (SELECT COUNT(*) FROM motorcycles WHERE status = 'available') as available_bikes,
        (SELECT COUNT(*) FROM bookings) as total_bookings,
        (SELECT COALESCE(SUM(amount), 0) FROM payments WHERE status = 'success') as total_revenue
    `, { type: sequelize.QueryTypes.SELECT });

    res.json({ success: true, data: stats[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
