const express = require('express');
const router = express.Router();
const {
  getMotorcycles,
  getFeaturedMotorcycles,
  getMotorcycleById,
  getNearbyMotorcycles,
  searchMotorcycles,
} = require('../controllers/motorcycleController');

// Public routes
router.get('/', getMotorcycles);
router.get('/featured', getFeaturedMotorcycles);
router.get('/nearby', getNearbyMotorcycles);
router.get('/search', searchMotorcycles);
router.get('/:id', getMotorcycleById);

module.exports = router;