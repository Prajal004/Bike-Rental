const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

router.use(protect, isAdmin);

router.get('/users', adminController.getAllUsers);
router.get('/shops', adminController.getAllShops);
router.put('/shops/:id/status', adminController.updateShopStatus);
router.get('/bookings', adminController.getAllBookings);
router.get('/stats', adminController.getPlatformStats);

module.exports = router;
