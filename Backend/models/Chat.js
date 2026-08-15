const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Chat = sequelize.define('Chat', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  participant1: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'participant1',
  },
  participant2: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'participant2',
  },
  lastMessage: {
    type: DataTypes.TEXT,
    field: 'last_message',
  },
  lastMessageAt: {
    type: DataTypes.DATE,
    field: 'last_message_at',
  },
  unreadCount1: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'unread_count1',
  },
  unreadCount2: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'unread_count2',
  },
  status: {
    type: DataTypes.ENUM('active', 'archived'),
    defaultValue: 'active',
  },
}, {
  tableName: 'chats',
  timestamps: true,
});

module.exports = Chat;
