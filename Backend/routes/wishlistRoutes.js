const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  checkWishlist,
} = require('../controllers/wishlistController');

router.post('/add', protect, addToWishlist);
router.get('/', protect, getWishlist);
router.delete('/:id', protect, removeFromWishlist);
router.get('/check/:motorcycleId', protect, checkWishlist);

module.exports = router;
