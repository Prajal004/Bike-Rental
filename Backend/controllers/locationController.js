const { Op } = require('sequelize');  // ✅ Import Op
const Location = require('../models/Location');

// @desc    Get all locations
// @route   GET /api/locations
// @access  Public
const getLocations = async (req, res) => {
  try {
    const { type } = req.query;
    
    const where = { isActive: true };
    if (type) {
      where.type = type;
    }
    
    const locations = await Location.findAll({ where });
    
    res.status(200).json({
      success: true,
      locations,
      total: locations.length,
    });
  } catch (error) {
    console.error('Error in getLocations:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Get nearby locations
// @route   GET /api/locations/nearby
// @access  Public
const getNearbyLocations = async (req, res) => {
  try {
    const { lat, lng, radius = 5 } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude required',
      });
    }
    
    const locations = await Location.findAll({ where: { isActive: true } });
    
    const nearbyLocations = locations.filter(location => {
      if (!location.latitude || !location.longitude) return false;
      const distance = calculateDistance(
        parseFloat(lat),
        parseFloat(lng),
        parseFloat(location.latitude),
        parseFloat(location.longitude)
      );
      return distance <= radius;
    });
    
    res.status(200).json({
      success: true,
      locations: nearbyLocations,
      total: nearbyLocations.length,
    });
  } catch (error) {
    console.error('Error in getNearbyLocations:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// Helper function to calculate distance
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// @desc    Search locations
// @route   GET /api/locations/search
// @access  Public
const searchLocations = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query required',
      });
    }
    
    const locations = await Location.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${q}%` } },
          { nameNepali: { [Op.iLike]: `%${q}%` } },
          { address: { [Op.iLike]: `%${q}%` } },
        ],
        isActive: true,
      },
      limit: 20,
    });
    
    res.status(200).json({
      success: true,
      locations,
      total: locations.length,
    });
  } catch (error) {
    console.error('Error in searchLocations:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Validate location
// @route   POST /api/locations/validate
// @access  Public
const validateLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    
    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude required',
      });
    }
    
    const locations = await Location.findAll({ 
      where: { isActive: true, serviceable: true } 
    });
    
    let isServiceable = false;
    let nearestLocation = null;
    let minDistance = Infinity;
    
    for (const location of locations) {
      if (location.latitude && location.longitude) {
        const distance = calculateDistance(
          lat,
          lng,
          parseFloat(location.latitude),
          parseFloat(location.longitude)
        );
        
        if (distance < minDistance) {
          minDistance = distance;
          nearestLocation = location;
        }
        
        if (distance <= 5) {
          isServiceable = true;
          break;
        }
      }
    }
    
    res.status(200).json({
      success: true,
      isServiceable,
      nearestLocation: nearestLocation ? {
        name: nearestLocation.name,
        address: nearestLocation.address,
        distance: minDistance.toFixed(1),
      } : null,
      message: isServiceable 
        ? 'Location is serviceable' 
        : 'Location is outside service area.',
    });
  } catch (error) {
    console.error('Error in validateLocation:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

module.exports = {
  getLocations,
  getNearbyLocations,
  searchLocations,
  validateLocation,
};
