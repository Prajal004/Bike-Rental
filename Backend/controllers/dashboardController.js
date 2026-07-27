const { sequelize } = require('../config/database');
const { User, Shop, Motorcycle, Booking, Payment } = require('../models');

// Get Shop Owner Dashboard Stats
exports.getShopDashboard = async (req, res) => {
  try {
    const shopId = req.user.shopId;
    
    const [totalBikes, totalBookings, totalRevenue, pendingBookings] = await Promise.all([
      Motorcycle.count({ where: { shopId, isActive: true } }),
      Booking.count({ where: { shopId } }),
      Payment.sum('amount', { where: { shopId, status: 'completed' } }),
      Booking.count({ where: { shopId, status: 'pending' } })
    ]);

    // Recent bookings
    const recentBookings = await Booking.findAll({
      where: { shopId },
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [{ model: User, attributes: ['name', 'email'] }]
    });

    res.json({
      success: true,
      data: {
        totalBikes,
        totalBookings,
        totalRevenue: totalRevenue || 0,
        pendingBookings,
        recentBookings
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Customer Dashboard Stats
exports.getCustomerDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const [totalBookings, activeBookings, completedBookings] = await Promise.all([
      Booking.count({ where: { customerId: userId } }),
      Booking.count({ where: { customerId: userId, status: 'active' } }),
      Booking.count({ where: { customerId: userId, status: 'completed' } })
    ]);

    // Recent bookings
    const recentBookings = await Booking.findAll({
      where: { customerId: userId },
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [{ model: Motorcycle, attributes: ['name', 'brand', 'images'] }]
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Admin Dashboard Stats
exports.getAdminDashboard = async (req, res) => {
  try {
    const [totalUsers, totalShops, totalBikes, totalBookings, totalRevenue] = await Promise.all([
      User.count(),
      Shop.count(),
      Motorcycle.count(),
      Booking.count(),
      Payment.sum('amount', { where: { status: 'completed' } })
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
    res.status(500).json({ success: false, message: error.message });
  }
};
