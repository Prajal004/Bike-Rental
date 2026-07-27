const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

router.post('/', protect, reviewController.createReview);
router.get('/motorcycle/:motorcycleId', reviewController.getMotorcycleReviews);
router.get('/shop/:shopId', reviewController.getShopReviews);
router.put('/:id/status', protect, isAdmin, reviewController.updateReviewStatus);

module.exports = router;
