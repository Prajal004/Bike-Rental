const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  addLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation
} = require('../controllers/locationController');

// Public routes
router.get('/', getLocations);
router.get('/:id', getLocationById);

// Protected routes
router.post('/', protect, addLocation);
router.put('/:id', protect, updateLocation);
router.delete('/:id', protect, deleteLocation);

module.exports = router;
