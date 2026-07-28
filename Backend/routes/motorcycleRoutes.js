const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { isShopOwner } = require('../middleware/roleMiddleware');
const {
  addMotorcycle,
  getMotorcycles,
  getMotorcycleById,
  updateMotorcycle,
  deleteMotorcycle
} = require('../controllers/motorcycleController');

// Public routes
router.get('/', getMotorcycles);
router.get('/:id', getMotorcycleById);

// Protected routes
router.post('/', protect, isShopOwner, addMotorcycle);
router.put('/:id', protect, isShopOwner, updateMotorcycle);
router.delete('/:id', protect, isShopOwner, deleteMotorcycle);

module.exports = router;
