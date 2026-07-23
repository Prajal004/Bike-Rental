const express = require('express');
const router = express.Router();
const {
  getLocations,
  getNearbyLocations,
  searchLocations,
  validateLocation,
} = require('../controllers/locationController');

// Public routes
router.get('/', getLocations);
router.get('/nearby', getNearbyLocations);
router.get('/search', searchLocations);
router.post('/validate', validateLocation);

module.exports = router;
