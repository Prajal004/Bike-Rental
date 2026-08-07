const User = require('../models/User');
const Shop = require('../models/Shop');
const Motorcycle = require('../models/Motorcycle');

// ✅ Try to import models, use fallback if missing
let Rental, Payment, SosAlert, Referral;

try { Rental = require('../models/Rental'); } catch(e) { Rental = { count: async () => 0 }; }
try { Payment = require('../models/Payment'); } catch(e) { Payment = { sum: async () => 0 }; }
try { SosAlert = require('../models/SosAlert'); } catch(e) { SosAlert = { count: async () => 0 }; }
try { Referral = require('../models/Referral'); } catch(e) { Referral = { count: async () => 0 }; }

const getStats = async (req, res) => {
  try {
    console.log('📊 Fetching dashboard stats...');

    const totalCustomers = await User.count({ where: { role: 'customer' } });
    console.log('👥 Customers:', totalCustomers);

    const totalShops = await Shop.count();
    console.log('🏪 Shops:', totalShops);

    const totalBikes = await Motorcycle.count();
    console.log('🏍️ Bikes:', totalBikes);

    const pendingVerifications = await Motorcycle.count({ 
      where: { is_verified: false } 
    });
    console.log('⏳ Pending:', pendingVerifications);

    let totalOrders = 0;
    try { totalOrders = await Rental.count(); } catch(e) { totalOrders = 0; }
    console.log('📋 Orders:', totalOrders);

    let totalRevenue = 0;
    try {
      const result = await Payment.sum('amount', { where: { status: 'success' } });
      totalRevenue = result || 0;
    } catch(e) { totalRevenue = 0; }
    console.log('💰 Revenue:', totalRevenue);

    let activeSOS = 0;
    try { activeSOS = await SosAlert.count({ where: { status: 'active' } }); } catch(e) { activeSOS = 0; }
    console.log('🆘 SOS:', activeSOS);

    let totalReferrals = 0;
    try { totalReferrals = await Referral.count(); } catch(e) { totalReferrals = 0; }
    console.log('🔗 Referrals:', totalReferrals);

    res.status(200).json({
      success: true,
      data: {
        totalCustomers: totalCustomers || 0,
        totalShops: totalShops || 0,
        totalBikes: totalBikes || 0,
        pendingVerifications: pendingVerifications || 0,
        totalOrders: totalOrders || 0,
        totalRevenue: totalRevenue || 0,
        activeSOS: activeSOS || 0,
        totalReferrals: totalReferrals || 0,
      }
    });
  } catch (error) {
    console.error('❌ Dashboard Stats Error:', error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

module.exports = { getStats };
