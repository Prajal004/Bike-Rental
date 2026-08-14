const Chat = require('../models/Chat');
const ChatMessage = require('../models/ChatMessage');
const User = require('../models/User');
const { Op } = require('sequelize');

// Get or create chat
const getOrCreateChat = async (req, res) => {
  try {
    const { participant2 } = req.body;
    const participant1 = req.user.id;

    let chat = await Chat.findOne({
      where: {
        [Op.or]: [
          { participant1, participant2 },
          { participant1: participant2, participant2: participant1 }
        ]
      }
    });

    if (!chat) {
      chat = await Chat.create({
        participant1,
        participant2,
      });
    }

    res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    console.error('Get/Create Chat Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Get all chats for user
const getUserChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.findAll({
      where: {
        [Op.or]: [
          { participant1: userId },
          { participant2: userId }
        ],
        status: 'active',
      },
      include: [
        { model: User, as: 'user1', attributes: ['id', 'fullName', 'profileImage'] },
        { model: User, as: 'user2', attributes: ['id', 'fullName', 'profileImage'] },
      ],
      order: [['lastMessageAt', 'DESC']],
    });

    res.status(200).json({
      success: true,
      chats,
    });
  } catch (error) {
    console.error('Get User Chats Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Get chat messages
const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    const messages = await ChatMessage.findAll({
      where: { chatId },
      order: [['createdAt', 'ASC']],
    });

    // Mark messages as read
    await ChatMessage.update(
      { isRead: true, readAt: new Date() },
      {
        where: {
          chatId,
          receiverId: userId,
          isRead: false,
        }
      }
    );

    // Update unread count
    await Chat.update(
      { unreadCount1: 0, unreadCount2: 0 },
      { where: { id: chatId } }
    );

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error('Get Chat Messages Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Send message
const sendMessage = async (req, res) => {
  try {
    const { chatId, receiverId, message, type = 'text', fileUrl = null } = req.body;
    const senderId = req.user.id;

    const chat = await Chat.findByPk(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found',
      });
    }

    const newMessage = await ChatMessage.create({
      chatId,
      senderId,
      receiverId,
      message,
      type,
      fileUrl,
    });

    // Update chat last message
    await chat.update({
      lastMessage: message,
      lastMessageAt: new Date(),
    });

    // Update unread count
    const unreadField = chat.participant1 === receiverId ? 'unreadCount1' : 'unreadCount2';
    await chat.increment(unreadField);

    res.status(201).json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    console.error('Send Message Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Mark messages as read
const markAsRead = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    await ChatMessage.update(
      { isRead: true, readAt: new Date() },
      {
        where: {
          chatId,
          receiverId: userId,
          isRead: false,
        }
      }
    );

    const chat = await Chat.findByPk(chatId);
    if (chat) {
      await chat.update({
        unreadCount1: 0,
        unreadCount2: 0,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Messages marked as read',
    });
  } catch (error) {
    console.error('Mark as Read Error:', error);
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

    const chats = await Chat.findAll({
      where: {
        [Op.or]: [
          { participant1: userId },
          { participant2: userId }
        ],
        status: 'active',
      },
    });

    let totalUnread = 0;
    chats.forEach(chat => {
      if (chat.participant1 === userId) {
        totalUnread += chat.unreadCount1 || 0;
      } else {
        totalUnread += chat.unreadCount2 || 0;
      }
    });

    res.status(200).json({
      success: true,
      unreadCount: totalUnread,
    });
  } catch (error) {
    console.error('Get Unread Count Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  getOrCreateChat,
  getUserChats,
  getChatMessages,
  sendMessage,
  markAsRead,
  getUnreadCount,
};
