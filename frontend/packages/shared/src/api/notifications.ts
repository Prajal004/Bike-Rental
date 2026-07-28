import { api } from './axios';
import { Notification, ApiResponse } from '../types';

export const notificationAPI = {
  getAll: () =>
    api.get<ApiResponse<{ notifications: Notification[] }>>('/notifications'),

  markAsRead: (id: string) =>
    api.put<ApiResponse<{ message: string }>>(`/notifications/${id}/read`),

  markAllRead: () =>
    api.put<ApiResponse<{ message: string }>>('/notifications/read-all'),

  getUnreadCount: () =>
    api.get<ApiResponse<{ count: number }>>('/notifications/unread'),
};
