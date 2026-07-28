import { api } from './axios';

export const reviewAPI = {
  create: (data) => api.post('/reviews', data),
  getByMotorcycle: (motorcycleId) => api.get(`/reviews/${motorcycleId}`),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
};