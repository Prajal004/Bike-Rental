import axiosClient from './axiosClient';

export const shopAPI = {
  register: async (data) => {
    return await axiosClient.post('/shops/register', data);
  },
  getAll: async (params) => {
    return await axiosClient.get('/shops', { params });
  },
  getById: async (id) => {
    return await axiosClient.get(`/shops/${id}`);
  },
  getMyShop: async () => {
    return await axiosClient.get('/shops/my-shop');
  },
  update: async (id, data) => {
    return await axiosClient.put(`/shops/${id}`, data);
  },
  getBikes: async (shopId) => {
    return await axiosClient.get(`/shops/${shopId}/bikes`);
  },
};

export default shopAPI;
