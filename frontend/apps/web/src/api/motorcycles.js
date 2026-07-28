import { api } from './axios';

export const motorcycleAPI = {
  getAll: (params) => api.get('/motorcycles', { params }),
  getFeatured: () => api.get('/motorcycles/featured'),
  getById: (id) => api.get(`/motorcycles/${id}`),
  getNearby: (lat, lng, radius) => api.get('/motorcycles/nearby', { params: { lat, lng, radius } }),
  search: (query) => api.get('/motorcycles/search', { params: { q: query } }),
  create: (data) => api.post('/motorcycles', data),
  update: (id, data) => api.put(`/motorcycles/${id}`, data),
  delete: (id) => api.delete(`/motorcycles/${id}`),
};