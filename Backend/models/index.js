const Chat = require('./Chat');
const ChatMessage = require('./ChatMessage');
const User = require('./User');

// Chat associations
Chat.belongsTo(User, { as: 'user1', foreignKey: 'participant1' });
Chat.belongsTo(User, { as: 'user2', foreignKey: 'participant2' });

ChatMessage.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
ChatMessage.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });
ChatMessage.belongsTo(Chat, { foreignKey: 'chatId' });

Chat.hasMany(ChatMessage, { foreignKey: 'chatId' });

module.exports = {
  Chat,
  ChatMessage,
  User,
};
