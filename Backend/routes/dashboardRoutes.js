const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');
const { isShopOwner, isCustomer, isAdmin } = require('../middleware/roleMiddleware');

router.get('/shop', protect, isShopOwner, dashboardController.getShopDashboard);
router.get('/customer', protect, isCustomer, dashboardController.getCustomerDashboard);
router.get('/admin', protect, isAdmin, dashboardController.getAdminDashboard);

module.exports = router;
