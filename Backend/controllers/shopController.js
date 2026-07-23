const Shop = require('../models/Shop');

// @desc    Register a shop
// @route   POST /api/shops/register
// @access  Private
const registerShop = async (req, res) => {
  try {
    const {
      shopName,
      shopNameNepali,
      description,
      address,
      latitude,
      longitude,
      phone,
      email,
      registrationNumber,
      panNumber,
      documentImage,
      images,
      openTime,
      closeTime,
    } = req.body;

    // Validate required fields
    if (!shopName || !address || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Shop name, address and phone are required',
      });
    }

    // Check if user already has a shop
    const existingShop = await Shop.findOne({ 
      where: { userId: req.user.id } 
    });
    
    if (existingShop) {
      return res.status(400).json({
        success: false,
        message: 'You already have a shop registered',
      });
    }

    const shop = await Shop.create({
      userId: req.user.id,
      shopName,
      shopNameNepali: shopNameNepali || null,
      description: description || null,
      address,
      latitude: latitude || null,
      longitude: longitude || null,
      phone,
      email: email || null,
      registrationNumber: registrationNumber || null,
      panNumber: panNumber || null,
      documentImage: documentImage || null,
      images: images || [],
      openTime: openTime || null,
      closeTime: closeTime || null,
    });

    res.status(201).json({
      success: true,
      message: 'Shop registered successfully',
      shop,
    });
  } catch (error) {
    console.error('Shop Registration Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Get all shops
// @route   GET /api/shops
// @access  Public
const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.findAll({
      where: { isVerified: true },
    });

    res.status(200).json({
      success: true,
      shops,
      total: shops.length,
    });
  } catch (error) {
    console.error('Get Shops Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Get shop by ID
// @route   GET /api/shops/:id
// @access  Public
const getShopById = async (req, res) => {
  try {
    const shop = await Shop.findByPk(req.params.id);
    
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: 'Shop not found',
      });
    }

    res.status(200).json({
      success: true,
      shop,
    });
  } catch (error) {
    console.error('Get Shop Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

module.exports = {
  registerShop,
  getAllShops,
  getShopById,
};
