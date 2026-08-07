const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAllShops,
  getShopById,
  registerShop,
  updateShop,
  deleteShop,
} = require('../controllers/shopController');

router.get('/', getAllShops);
router.get('/:id', getShopById);
router.post('/register', protect, registerShop);
router.put('/:id', protect, updateShop);
router.delete('/:id', protect, deleteShop);

module.exports = router;
