import axiosClient from './axiosClient';

export const authAPI = {
  register: async (userData) => {
    return await axiosClient.post('/auth/register', userData);
  },
  login: async (email, password) => {
    return await axiosClient.post('/auth/login', { email, password });
  },
  verifyOTP: async (userId, otp) => {
    return await axiosClient.post('/auth/verify-otp', { userId, otp });
  },
  resendOTP: async (userId) => {
    return await axiosClient.post('/auth/resend-otp', { userId });
  },
  getProfile: async () => {
    return await axiosClient.get('/auth/profile');
  },
  logout: async () => {
    return await axiosClient.post('/auth/logout');
  },
};

export default authAPI;
