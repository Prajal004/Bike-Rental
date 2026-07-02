const Location = require('../models/Location');

// @desc    Get all locations
// @route   GET /api/locations
// @access  Public
const getLocations = async (req, res) => {
  try {
    const { type } = req.query;
    
    const query = { isActive: true };
    if (type) {
      query.type = type;
    }
    
    const locations = await Location.find(query);
    
    res.status(200).json({
      success: true,
      locations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
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
    
    // Simple distance calculation (in production, use geospatial queries)
    const locations = await Location.find({ isActive: true });
    
    // Calculate distance and filter
    const nearbyLocations = locations.filter(location => {
      if (!location.coordinates) return false;
      const distance = calculateDistance(
        parseFloat(lat),
        parseFloat(lng),
        location.coordinates.lat,
        location.coordinates.lng
      );
      return distance <= radius;
    });
    
    res.status(200).json({
      success: true,
      locations: nearbyLocations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
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
    
    const locations = await Location.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { nameNepali: { $regex: q, $options: 'i' } },
        { address: { $regex: q, $options: 'i' } },
      ],
      isActive: true,
    }).limit(20);
    
    res.status(200).json({
      success: true,
      locations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Validate location serviceability
// @route   POST /api/locations/validate
// @access  Public
const validateLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    
    // Check if location is within serviceable areas
    const serviceableLocations = await Location.find({ 
      isActive: true, 
      serviceable: true 
    });
    
    let isServiceable = false;
    let nearestLocation = null;
    let minDistance = Infinity;
    
    for (const location of serviceableLocations) {
      if (location.coordinates) {
        const distance = calculateDistance(
          lat,
          lng,
          location.coordinates.lat,
          location.coordinates.lng
        );
        
        if (distance < minDistance) {
          minDistance = distance;
          nearestLocation = location;
        }
        
        if (distance <= 5) { // Within 5km
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
        : 'Location is outside service area. Please select a pickup location from our list.',
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
  getLocations,
  getNearbyLocations,
  searchLocations,
  validateLocation,
};