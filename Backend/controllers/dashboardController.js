const Shop = require('../models/Shop');
const Motorcycle = require('../models/Motorcycle');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');
const User = require('../models/User');

// Get Shop Owner Dashboard
exports.getShopDashboard = async (req, res) => {
  try {
    // Find shop by user id
    const shop = await Shop.findOne({
      where: { userId: req.user.id }
    });

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: 'Shop not found for this user'
      });
    }

    const shopId = shop.id;
    
    const [totalBikes, totalBookings, totalRevenue, pendingBookings] = await Promise.all([
      Motorcycle.count({ where: { shopId, isActive: true } }),
      Booking.count({ where: { shopId } }),
      Payment.sum('amount', { where: { shopId, status: 'success' } }),
      Booking.count({ where: { shopId, status: 'pending' } })
    ]);

    const recentBookings = await Booking.findAll({
      where: { shopId },
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [{ model: User, attributes: ['name', 'email'] }]
    });

    res.json({
      success: true,
      data: {
        shop: {
          id: shop.id,
          name: shop.name,
          address: shop.address,
          status: shop.status
        },
        totalBikes,
        totalBookings,
        totalRevenue: totalRevenue || 0,
        pendingBookings,
        recentBookings
      }
    });
  } catch (error) {
    console.error('Shop Dashboard Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Get Customer Dashboard
exports.getCustomerDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const [totalBookings, activeBookings, completedBookings] = await Promise.all([
      Booking.count({ where: { customerId: userId } }),
      Booking.count({ where: { customerId: userId, status: 'active' } }),
      Booking.count({ where: { customerId: userId, status: 'completed' } })
    ]);

    const recentBookings = await Booking.findAll({
      where: { customerId: userId },
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [
        { model: Motorcycle, attributes: ['name', 'brand', 'images'] },
        { model: Shop, attributes: ['name', 'address'] }
      ]
    });

    res.json({
      success: true,
      data: {
        totalBookings,
        activeBookings,
        completedBookings,
        recentBookings
      }
    });
  } catch (error) {
    console.error('Customer Dashboard Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Get Admin Dashboard
exports.getAdminDashboard = async (req, res) => {
  try {
    const [totalUsers, totalShops, totalBikes, totalBookings, totalRevenue] = await Promise.all([
      User.count(),
      Shop.count(),
      Motorcycle.count(),
      Booking.count(),
      Payment.sum('amount', { where: { status: 'success' } })
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalShops,
        totalBikes,
        totalBookings,
        totalRevenue: totalRevenue || 0
      }
    });
  } catch (error) {
    console.error('Admin Dashboard Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
