import { api } from './axios';

export const chatAPI = {
  // Get or create chat
  getOrCreate: (participant2) => api.post('/chat/create', { participant2 }),

  // Get all chats for user
  getAll: () => api.get('/chat/list'),

  // Get chat messages
  getMessages: (chatId) => api.get(`/chat/${chatId}/messages`),

  // Send message
  send: (data) => api.post('/chat/send', data),

  // Mark as read
  markAsRead: (chatId) => api.put(`/chat/${chatId}/read`),

  // Get unread count
  getUnreadCount: () => api.get('/chat/unread/count'),
};

export default chatAPI;
