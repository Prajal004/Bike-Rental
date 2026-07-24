import axiosClient from './axiosClient';

export const rentalAPI = {
  create: async (data) => {
    return await axiosClient.post('/rentals/create', data);
  },
  getUserRentals: async () => {
    return await axiosClient.get('/rentals/user');
  },
  getById: async (id) => {
    return await axiosClient.get(`/rentals/${id}`);
  },
  cancel: async (id) => {
    return await axiosClient.put(`/rentals/${id}/cancel`);
  },
};

export default rentalAPI;
