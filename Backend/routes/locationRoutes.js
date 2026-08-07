const express = require('express');
const router = express.Router();
const {
  getLocations,
  getNearbyLocations,
  searchLocations,
  validateLocation,
  getLocationById,
} = require('../controllers/locationController');

// ✅ Public routes (specific routes pehle)
router.get('/', getLocations);
router.get('/nearby', getNearbyLocations);
router.get('/search', searchLocations);  // ✅ Search pehle
router.post('/validate', validateLocation);
router.get('/:id', getLocationById);     // ✅ :id pachi

module.exports = router;
