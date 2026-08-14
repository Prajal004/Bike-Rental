const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getOrCreateChat,
  getUserChats,
  getChatMessages,
  sendMessage,
  markAsRead,
  getUnreadCount,
} = require('../controllers/chatController');

// Protected routes
router.post('/create', protect, getOrCreateChat);
router.get('/list', protect, getUserChats);
router.get('/:chatId/messages', protect, getChatMessages);
router.post('/send', protect, sendMessage);
router.put('/:chatId/read', protect, markAsRead);
router.get('/unread/count', protect, getUnreadCount);

module.exports = router;
