import { api } from './axios';
import { User, ApiResponse } from '../types';

export const authAPI = {
  register: (data: { fullName: string; email: string; phone: string; password: string }) =>
    api.post<ApiResponse<{ userId: string }>>('/auth/register', data),

  login: (email: string, password: string) =>
    api.post<ApiResponse<{ userId: string }>>('/auth/login', { email, password }),

  verifyOTP: (userId: string, otp: string) =>
    api.post<ApiResponse<{ token: string; user: User }>>('/auth/verify-otp', { userId, otp }),

  resendOTP: (userId: string) =>
    api.post<ApiResponse<{ message: string }>>('/auth/resend-otp', { userId }),

  getProfile: () =>
    api.get<ApiResponse<User>>('/auth/profile'),

  logout: () =>
    api.post('/auth/logout'),
};
