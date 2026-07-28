const Shop = require('../models/Shop');
const User = require('../models/User');

exports.createShop = async (req, res) => {
  try {
    const { name, address, phone, email, description, registrationNumber, panNumber } = req.body;

    const existingShop = await Shop.findOne({
      where: { registrationNumber }
    });

    if (existingShop) {
      return res.status(400).json({
        success: false,
        message: 'Shop with this registration number already exists'
      });
    }

    const shop = await Shop.create({
      userId: req.user.id,
      name,
      address,
      phone,
      email,
      description,
      registrationNumber,
      panNumber,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Shop created successfully',
      data: shop
    });
  } catch (error) {
    console.error('Create Shop Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.findAll({
      where: { status: 'approved', isActive: true },
      include: [{ model: User, attributes: ['name', 'email'] }]
    });

    res.json({ success: true, data: shops });
  } catch (error) {
    console.error('Get Shops Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['name', 'email'] }]
    });

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: 'Shop not found'
      });
    }

    res.json({ success: true, data: shop });
  } catch (error) {
    console.error('Get Shop Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

exports.getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({
      where: { userId: req.user.id }
    });

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: 'Shop not found'
      });
    }

    res.json({ success: true, data: shop });
  } catch (error) {
    console.error('Get My Shop Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

exports.updateShop = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, phone, email, description } = req.body;

    const shop = await Shop.findOne({
      where: { id, userId: req.user.id }
    });

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: 'Shop not found'
      });
    }

    await shop.update({ name, address, phone, email, description });

    res.json({
      success: true,
      message: 'Shop updated successfully',
      data: shop
    });
  } catch (error) {
    console.error('Update Shop Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

exports.deleteShop = async (req, res) => {
  try {
    const { id } = req.params;

    const shop = await Shop.findOne({
      where: { id, userId: req.user.id }
    });

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: 'Shop not found'
      });
    }

    shop.isActive = false;
    await shop.save();

    res.json({
      success: true,
      message: 'Shop deleted successfully'
    });
  } catch (error) {
    console.error('Delete Shop Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
