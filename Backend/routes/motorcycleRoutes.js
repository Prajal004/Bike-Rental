const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getMotorcycles,
  getFeaturedMotorcycles,
  getMotorcycleById,
  getNearbyMotorcycles,
  searchMotorcycles,
  addMotorcycle,
  updateMotorcycle,
  deleteMotorcycle,
} = require('../controllers/motorcycleController');

// Public routes
router.get('/', getMotorcycles);
router.get('/featured', getFeaturedMotorcycles);
router.get('/nearby', getNearbyMotorcycles);
router.get('/search', searchMotorcycles);
router.get('/:id', getMotorcycleById);

// Protected routes
router.post('/', protect, addMotorcycle);
router.put('/:id', protect, updateMotorcycle);
router.delete('/:id', protect, deleteMotorcycle);

module.exports = router;
