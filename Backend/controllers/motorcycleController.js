const Motorcycle = require('../models/Motorcycle');
const Shop = require('../models/Shop');

exports.addMotorcycle = async (req, res) => {
  try {
    const {
      shopId,
      name,
      brand,
      model,
      year,
      color,
      pricePerHour,
      pricePerDay,
      securityDeposit,
      images,
      features,
      status
    } = req.body;

    if (!shopId || !name || !brand || !model || !year || !pricePerHour || !pricePerDay) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: shopId, name, brand, model, year, pricePerHour, pricePerDay'
      });
    }

    const shop = await Shop.findByPk(shopId);
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: 'Shop not found'
      });
    }

    if (shop.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not own this shop'
      });
    }

    const motorcycle = await Motorcycle.create({
      shopId,
      name,
      brand,
      model,
      year,
      color: color || 'Black',
      pricePerHour,
      pricePerDay,
      securityDeposit: securityDeposit || 0,
      images: images || [],
      features: features || [],
      status: status || 'available'
    });

    res.status(201).json({
      success: true,
      message: 'Motorcycle added successfully',
      data: motorcycle
    });
  } catch (error) {
    console.error('Add Motorcycle Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

exports.getMotorcycles = async (req, res) => {
  try {
    const motorcycles = await Motorcycle.findAll({
      where: { isActive: true },
      include: [
        {
          model: Shop,
          as: 'shop',  // ✅ 'as' keyword थप्नुहोस्
          attributes: ['id', 'name', 'address', 'phone', 'email']
        }
      ]
    });

    res.json({
      success: true,
      data: motorcycles
    });
  } catch (error) {
    console.error('Get Motorcycles Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

exports.getMotorcycleById = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findByPk(req.params.id, {
      include: [
        {
          model: Shop,
          as: 'shop',  // ✅ 'as' keyword थप्नुहोस्
          attributes: ['id', 'name', 'address', 'phone', 'email']
        }
      ]
    });

    if (!motorcycle) {
      return res.status(404).json({
        success: false,
        message: 'Motorcycle not found'
      });
    }

    res.json({
      success: true,
      data: motorcycle
    });
  } catch (error) {
    console.error('Get Motorcycle Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

exports.updateMotorcycle = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      brand,
      model,
      year,
      color,
      pricePerHour,
      pricePerDay,
      securityDeposit,
      features,
      status
    } = req.body;

    const motorcycle = await Motorcycle.findByPk(id);

    if (!motorcycle) {
      return res.status(404).json({
        success: false,
        message: 'Motorcycle not found'
      });
    }

    const shop = await Shop.findByPk(motorcycle.shopId);
    if (shop.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not own this motorcycle'
      });
    }

    await motorcycle.update({
      name,
      brand,
      model,
      year,
      color,
      pricePerHour,
      pricePerDay,
      securityDeposit,
      features,
      status
    });

    res.json({
      success: true,
      message: 'Motorcycle updated successfully',
      data: motorcycle
    });
  } catch (error) {
    console.error('Update Motorcycle Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

exports.deleteMotorcycle = async (req, res) => {
  try {
    const { id } = req.params;

    const motorcycle = await Motorcycle.findByPk(id);

    if (!motorcycle) {
      return res.status(404).json({
        success: false,
        message: 'Motorcycle not found'
      });
    }

    const shop = await Shop.findByPk(motorcycle.shopId);
    if (shop.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not own this motorcycle'
      });
    }

    motorcycle.isActive = false;
    await motorcycle.save();

    res.json({
      success: true,
      message: 'Motorcycle deleted successfully'
    });
  } catch (error) {
    console.error('Delete Motorcycle Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
