const { Review } = require('../models/Review');
const { Booking } = require('../models/Booking');
const { Motorcycle } = require('../models/Motorcycle');
const { Shop } = require('../models/Shop');
const { User } = require('../models/User');
const { sequelize } = require('../config/database');

// Create review
exports.createReview = async (req, res) => {
  try {
    const { bookingId, rating, title, comment, pros, cons, isAnonymous } = req.body;
    const userId = req.user.id;

    const booking = await Booking.findOne({
      where: { id: bookingId, customerId: userId, status: 'completed' }
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or not completed'
      });
    }

    const existingReview = await Review.findOne({ where: { bookingId } });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'Review already exists for this booking'
      });
    }

    const review = await Review.create({
      bookingId,
      customerId: userId,
      motorcycleId: booking.motorcycleId,
      shopId: booking.shopId,
      rating,
      title,
      comment,
      pros: pros || [],
      cons: cons || [],
      isAnonymous: isAnonymous || false
    });

    await updateMotorcycleRating(booking.motorcycleId);
    await updateShopRating(booking.shopId);

    res.json({
      success: true,
      message: 'Review submitted successfully',
      data: review
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get reviews for a motorcycle
exports.getMotorcycleReviews = async (req, res) => {
  try {
    const { motorcycleId } = req.params;
    const { limit = 10, offset = 0 } = req.query;

    const reviews = await Review.findAndCountAll({
      where: { motorcycleId, status: 'approved' },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      include: [
        { model: User, attributes: ['id', 'name'] },
        { model: Booking, attributes: ['id'] }
      ]
    });

    const summary = await Review.findAll({
      where: { motorcycleId, status: 'approved' },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalReviews']
      ],
      raw: true
    });

    res.json({
      success: true,
      data: reviews.rows,
      total: reviews.count,
      summary: summary[0],
      hasMore: reviews.count > parseInt(offset) + parseInt(limit)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get reviews for a shop
exports.getShopReviews = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { limit = 10, offset = 0 } = req.query;

    const reviews = await Review.findAndCountAll({
      where: { shopId, status: 'approved' },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      include: [
        { model: User, attributes: ['id', 'name'] }
      ]
    });

    res.json({
      success: true,
      data: reviews.rows,
      total: reviews.count,
      hasMore: reviews.count > parseInt(offset) + parseInt(limit)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update review status (Admin)
exports.updateReviewStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    review.status = status;
    await review.save();

    if (status === 'approved') {
      await updateMotorcycleRating(review.motorcycleId);
      await updateShopRating(review.shopId);
    }

    res.json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Helper: Update motorcycle rating
const updateMotorcycleRating = async (motorcycleId) => {
  const result = await Review.findOne({
    where: { motorcycleId, status: 'approved' },
    attributes: [
      [sequelize.fn('AVG', sequelize.col('rating')), 'avgRating'],
      [sequelize.fn('COUNT', sequelize.col('id')), 'totalReviews']
    ],
    raw: true
  });

  await Motorcycle.update(
    {
      rating: parseFloat(result?.avgRating) || 0,
      totalReviews: parseInt(result?.totalReviews) || 0
    },
    { where: { id: motorcycleId } }
  );
};

// Helper: Update shop rating
const updateShopRating = async (shopId) => {
  const result = await Review.findOne({
    where: { shopId, status: 'approved' },
    attributes: [
      [sequelize.fn('AVG', sequelize.col('rating')), 'avgRating'],
      [sequelize.fn('COUNT', sequelize.col('id')), 'totalReviews']
    ],
    raw: true
  });

  await Shop.update(
    {
      rating: parseFloat(result?.avgRating) || 0,
      totalReviews: parseInt(result?.totalReviews) || 0
    },
    { where: { id: shopId } }
  );
};
