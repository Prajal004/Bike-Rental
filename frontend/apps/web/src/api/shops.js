import { api } from './axios';

export const shopAPI = {
  getAll: (params) => api.get('/shops', { params }),
  getById: (id) => api.get(`/shops/${id}`),
  register: (data) => api.post('/shops/register', data),
  getMyShop: () => api.get('/shops/my-shop'),
  update: (id, data) => api.put(`/shops/${id}`, data),
  getShopBikes: (shopId) => api.get(`/shops/${shopId}/bikes`),
};