import axiosClient from './axiosClient';

export const rentalAPI = {
  // Create rental
  create: async (data) => {
    return await axiosClient.post('/rentals/create', data);
  },

  // Get user rentals
  getUserRentals: async () => {
    return await axiosClient.get('/rentals/user');
  },

  // Get rental by ID
  getById: async (id) => {
    return await axiosClient.get(`/rentals/${id}`);
  },

  // Cancel rental
  cancel: async (id) => {
    return await axiosClient.put(`/rentals/${id}/cancel`);
  },
};

export default rentalAPI;
