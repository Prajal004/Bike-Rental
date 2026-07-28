const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { isShopOwner } = require('../middleware/roleMiddleware');
const {
  createShop,
  getShops,
  getShopById,
  updateShop,
  deleteShop,
  getMyShop
} = require('../controllers/shopController');

// Public routes
router.get('/', getShops);
router.get('/:id', getShopById);

// Protected routes
router.post('/', protect, isShopOwner, createShop);
router.get('/my-shop', protect, isShopOwner, getMyShop);
router.put('/:id', protect, isShopOwner, updateShop);
router.delete('/:id', protect, isShopOwner, deleteShop);

module.exports = router;
