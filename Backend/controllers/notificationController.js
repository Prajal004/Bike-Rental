const Notification = require('../models/Notification');

// Get all notifications
const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifications = await Notification.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error('Get Notifications Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Mark as read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = await Notification.findOne({
      where: { id, userId }
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Not found',
      });
    }

    await notification.update({
      isRead: true,
      readAt: new Date(),
    });

    res.status(200).json({
      success: true,
      message: 'Marked as read',
    });
  } catch (error) {
    console.error('Mark as Read Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Mark all as read
const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    await Notification.update(
      { isRead: true, readAt: new Date() },
      { where: { userId, isRead: false } }
    );

    res.status(200).json({
      success: true,
      message: 'All marked as read',
    });
  } catch (error) {
    console.error('Mark All as Read Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Get unread count
const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;

    const count = await Notification.count({
      where: { userId, isRead: false }
    });

    res.status(200).json({
      success: true,
      unreadCount: count,
    });
  } catch (error) {
    console.error('Get Unread Count Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Create notification (internal)
const createNotification = async (userId, title, message, type = 'system', data = {}) => {
  try {
    return await Notification.create({
      userId,
      title,
      message,
      type,
      data,
    });
  } catch (error) {
    console.error('Create Notification Error:', error);
    return null;
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  createNotification,
};
