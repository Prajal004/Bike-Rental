const Motorcycle = require('../models/Motorcycle');

// @desc    Get all motorcycles
// @route   GET /api/motorcycles
// @access  Public
const getMotorcycles = async (req, res) => {
  try {
    const { page = 1, limit = 20, featured, brand, minPrice, maxPrice } = req.query;
    
    const query = { available: true };
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (brand) {
      query.brand = brand;
    }
    
    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice) query.pricePerDay.$gte = parseInt(minPrice);
      if (maxPrice) query.pricePerDay.$lte = parseInt(maxPrice);
    }
    
    const motorcycles = await Motorcycle.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Motorcycle.countDocuments(query);
    
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
      message: 'Server error',
    });
  }
};

// @desc    Get featured motorcycles (Around You)
// @route   GET /api/motorcycles/featured
// @access  Public
const getFeaturedMotorcycles = async (req, res) => {
  try {
    const motorcycles = await Motorcycle.find({ featured: true, available: true })
      .limit(10);
    
    res.status(200).json({
      success: true,
      motorcycles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get single motorcycle
// @route   GET /api/motorcycles/:id
// @access  Public
const getMotorcycleById = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findById(req.params.id);
    
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
      message: 'Server error',
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
    
    const motorcycles = await Motorcycle.find({
      available: true,
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: radius * 1000, // Convert km to meters
        },
      },
    }).limit(20);
    
    res.status(200).json({
      success: true,
      motorcycles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

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
    
    const motorcycles = await Motorcycle.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { nameNepali: { $regex: q, $options: 'i' } },
        { brand: { $regex: q, $options: 'i' } },
      ],
      available: true,
    }).limit(20);
    
    res.status(200).json({
      success: true,
      motorcycles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  getMotorcycles,
  getFeaturedMotorcycles,
  getMotorcycleById,
  getNearbyMotorcycles,
  searchMotorcycles,
};