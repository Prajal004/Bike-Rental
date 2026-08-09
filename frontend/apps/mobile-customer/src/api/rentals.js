import { api } from './axios';

export const rentalAPI = {
  create: (data) => api.post('/rentals', data),
  getUserRentals: () => api.get('/rentals/user'),
  getById: (id) => api.get(`/rentals/${id}`),
  cancel: (id) => api.put(`/rentals/${id}/cancel`),
};
