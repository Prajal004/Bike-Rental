import { api } from './axios';

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (email, password) => api.post('/auth/login', { email, password }),
  verifyOTP: (userId, otp) => api.post('/auth/verify-otp', { userId, otp }),
  resendOTP: (userId) => api.post('/auth/resend-otp', { userId }),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data),
  getProfile: () => api.get('/auth/profile'),
  logout: () => api.post('/auth/logout'),
};
