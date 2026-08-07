const Motorcycle = require('../models/Motorcycle');

// @desc    Get all motorcycles
const getMotorcycles = async (req, res) => {
  try {
    const motorcycles = await Motorcycle.findAll();
    res.json({ success: true, motorcycles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get featured motorcycles
const getFeaturedMotorcycles = async (req, res) => {
  try {
    const motorcycles = await Motorcycle.findAll({ where: { featured: true } });
    res.json({ success: true, motorcycles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get motorcycle by ID
const getMotorcycleById = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findByPk(req.params.id);
    if (!motorcycle) {
      return res.status(404).json({ success: false, message: 'Motorcycle not found' });
    }
    res.json({ success: true, motorcycle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get nearby motorcycles
const getNearbyMotorcycles = async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query;
    const motorcycles = await Motorcycle.findAll();
    res.json({ success: true, motorcycles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Search motorcycles
const searchMotorcycles = async (req, res) => {
  try {
    const { q } = req.query;
    const { Op } = require('sequelize');
    const motorcycles = await Motorcycle.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${q}%` } },
          { brand: { [Op.iLike]: `%${q}%` } },
        ],
      },
    });
    res.json({ success: true, motorcycles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add motorcycle
const addMotorcycle = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json({ success: true, motorcycle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update motorcycle
const updateMotorcycle = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findByPk(req.params.id);
    if (!motorcycle) {
      return res.status(404).json({ success: false, message: 'Motorcycle not found' });
    }
    await motorcycle.update(req.body);
    res.json({ success: true, motorcycle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete motorcycle
const deleteMotorcycle = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findByPk(req.params.id);
    if (!motorcycle) {
      return res.status(404).json({ success: false, message: 'Motorcycle not found' });
    }
    await motorcycle.destroy();
    res.json({ success: true, message: 'Motorcycle deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
