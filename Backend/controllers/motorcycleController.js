const { sequelize } = require('../config/database');
const Motorcycle = require('../models/Motorcycle');

// @desc    Get all motorcycles
// @route   GET /api/motorcycles
// @access  Public
const getMotorcycles = async (req, res) => {
  try {
    const { page = 1, limit = 20, featured, brand, minPrice, maxPrice } = req.query;
    
    const where = { available: true };
    
    if (featured === 'true') {
      where.featured = true;
    }
    
    if (brand) {
      where.brand = brand;
    }
    
    if (minPrice || maxPrice) {
      where.pricePerDay = {};
      if (minPrice) where.pricePerDay.$gte = parseInt(minPrice);
      if (maxPrice) where.pricePerDay.$lte = parseInt(maxPrice);
    }
    
    const motorcycles = await Motorcycle.findAll({
      where,
      order: [['featured', 'DESC'], ['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    
    const total = await Motorcycle.count({ where });
    
    res.status(200).json({
      success: true,
      motorcycles,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Get featured motorcycles (Around You)
// @route   GET /api/motorcycles/featured
// @access  Public
const getFeaturedMotorcycles = async (req, res) => {
  try {
    const motorcycles = await Motorcycle.findAll({
      where: { featured: true, available: true },
      limit: 10,
    });
    
    res.status(200).json({
      success: true,
      motorcycles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Get single motorcycle
// @route   GET /api/motorcycles/:id
// @access  Public
const getMotorcycleById = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findByPk(req.params.id);
    
    if (!motorcycle) {
      return res.status(404).json({
        success: false,
        message: 'Motorcycle not found',
      });
    }
    
    res.status(200).json({
      success: true,
      motorcycle,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Get motorcycles nearby
// @route   GET /api/motorcycles/nearby
// @access  Public
const getNearbyMotorcycles = async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude required',
      });
    }
    
    // Sequelize geospatial query
    const motorcycles = await Motorcycle.findAll({
      where: { available: true },
      // Note: For geospatial queries, you might need PostGIS extension
      // For now, return all and filter in code
    });
    
    // Simple distance filter (in production, use PostGIS)
    const nearbyMotorcycles = motorcycles.filter(bike => {
      if (!bike.locationLat || !bike.locationLng) return false;
      const distance = calculateDistance(
        parseFloat(lat),
        parseFloat(lng),
        bike.locationLat,
        bike.locationLng
      );
      return distance <= radius;
    });
    
    res.status(200).json({
      success: true,
      motorcycles: nearbyMotorcycles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// Helper function to calculate distance
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// @desc    Search motorcycles
// @route   GET /api/motorcycles/search
// @access  Public
const searchMotorcycles = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query required',
      });
    }
    
    const { Op } = require('sequelize');
    const motorcycles = await Motorcycle.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${q}%` } },
          { nameNepali: { [Op.iLike]: `%${q}%` } },
          { brand: { [Op.iLike]: `%${q}%` } },
        ],
        available: true,
      },
      limit: 20,
    });
    
    res.status(200).json({
      success: true,
      motorcycles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Add motorcycle (Shop owner)
// @route   POST /api/motorcycles
// @access  Private
const addMotorcycle = async (req, res) => {
  try {
    const {
      name,
      nameNepali,
      brand,
      year,
      cc,
      pricePerDay,
      pricePerWeek,
      pricePerMonth,
      securityDeposit,
      images,
      description,
      descriptionNepali,
      specifications,
      locationLat,
      locationLng,
      locationAddress,
    } = req.body;

    const motorcycle = await Motorcycle.create({
      name,
      nameNepali,
      brand,
      year,
      cc,
      pricePerDay,
      pricePerWeek,
      pricePerMonth,
      securityDeposit: securityDeposit || 1000,
      images: images || [],
      description,
      descriptionNepali,
      specifications: specifications || {},
      locationLat,
      locationLng,
      locationAddress,
      available: true,
      featured: false,
    });

    res.status(201).json({
      success: true,
      message: 'Motorcycle added successfully',
      motorcycle,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Update motorcycle
// @route   PUT /api/motorcycles/:id
// @access  Private
const updateMotorcycle = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findByPk(req.params.id);
    
    if (!motorcycle) {
      return res.status(404).json({
        success: false,
        message: 'Motorcycle not found',
      });
    }

    await motorcycle.update(req.body);

    res.status(200).json({
      success: true,
      message: 'Motorcycle updated successfully',
      motorcycle,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Delete motorcycle
// @route   DELETE /api/motorcycles/:id
// @access  Private
const deleteMotorcycle = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findByPk(req.params.id);
    
    if (!motorcycle) {
      return res.status(404).json({
        success: false,
        message: 'Motorcycle not found',
      });
    }

    await motorcycle.destroy();

    res.status(200).json({
      success: true,
      message: 'Motorcycle deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

module.exports = {
  getMotorcycles,
  getFeaturedMotorcycles,
  getMotorcycleById,
  getNearbyMotorcycles,
  searchMotorcycles,
  addMotorcycle,
  updateMotorcycle,
  deleteMotorcycle,
};
