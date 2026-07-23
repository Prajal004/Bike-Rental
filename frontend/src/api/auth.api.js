import axiosClient from './axiosClient';

export const authAPI = {
  // Register user
  register: async (userData) => {
    return await axiosClient.post('/auth/register', userData);
  },

  // Login user
  login: async (email, password) => {
    return await axiosClient.post('/auth/login', { email, password });
  },

  // Verify OTP
  verifyOTP: async (userId, otp) => {
    return await axiosClient.post('/auth/verify-otp', { userId, otp });
  },

  // Resend OTP
  resendOTP: async (userId) => {
    return await axiosClient.post('/auth/resend-otp', { userId });
  },

  // Get user profile
  getProfile: async () => {
    return await axiosClient.get('/auth/profile');
  },

  // Update language preference
  updateLanguage: async (language) => {
    return await axiosClient.put('/auth/language', { language });
  },

  // Logout
  logout: async () => {
    return await axiosClient.post('/auth/logout');
  },
};

export default authAPI;