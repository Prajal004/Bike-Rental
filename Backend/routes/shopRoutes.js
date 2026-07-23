const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  registerShop, 
  getAllShops, 
  getShopById 
} = require('../controllers/shopController');

// Public routes
router.get('/', getAllShops);
router.get('/:id', getShopById);

// Protected routes
router.post('/register', protect, registerShop);

module.exports = router;
