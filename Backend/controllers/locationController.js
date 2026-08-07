const Location = require('../models/Location');
const { Op } = require('sequelize');

const getLocations = async (req, res) => {
  try {
    const locations = await Location.findAll({ where: { isActive: true } });
    res.json({ success: true, locations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getNearbyLocations = async (req, res) => {
  try {
    const { lat, lng, radius = 5 } = req.query;
    const locations = await Location.findAll({ where: { isActive: true } });
    res.json({ success: true, locations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const searchLocations = async (req, res) => {
  try {
    const { q } = req.query;
    const locations = await Location.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${q}%` } },
          { address: { [Op.iLike]: `%${q}%` } },
        ],
        isActive: true,
      },
      limit: 20,
    });
    res.json({ success: true, locations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const validateLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    res.json({ success: true, isValid: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getLocationById = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }
    res.json({ success: true, location });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getLocations,
  getNearbyLocations,
  searchLocations,
  validateLocation,
  getLocationById,
};
