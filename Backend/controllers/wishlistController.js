const Wishlist = require('../models/Wishlist');
const Motorcycle = require('../models/Motorcycle');

// Add to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { motorcycleId } = req.body;
    const userId = req.user.id;

    const existing = await Wishlist.findOne({
      where: { userId, motorcycleId }
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Already in wishlist',
      });
    }

    const wishlist = await Wishlist.create({ userId, motorcycleId });

    res.status(201).json({
      success: true,
      message: 'Added to wishlist',
      wishlist,
    });
  } catch (error) {
    console.error('Add to Wishlist Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Get wishlist
const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await Wishlist.findAll({
      where: { userId },
      include: [{ model: Motorcycle, attributes: ['id', 'name', 'brand', 'pricePerDay', 'images'] }],
    });

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.error('Get Wishlist Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Remove from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const wishlist = await Wishlist.findOne({
      where: { id, userId }
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Not found',
      });
    }

    await wishlist.destroy();

    res.status(200).json({
      success: true,
      message: 'Removed from wishlist',
    });
  } catch (error) {
    console.error('Remove from Wishlist Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Check if in wishlist
const checkWishlist = async (req, res) => {
  try {
    const { motorcycleId } = req.params;
    const userId = req.user.id;

    const wishlist = await Wishlist.findOne({
      where: { userId, motorcycleId }
    });

    res.status(200).json({
      success: true,
      isInWishlist: !!wishlist,
    });
  } catch (error) {
    console.error('Check Wishlist Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  checkWishlist,
};
