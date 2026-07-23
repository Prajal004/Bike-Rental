import axiosClient from './axiosClient';

export const motorbikeAPI = {
  // Get all motorcycles
  getAll: async (params) => {
    return await axiosClient.get('/motorcycles', { params });
  },

  // Get featured motorcycles
  getFeatured: async () => {
    return await axiosClient.get('/motorcycles/featured');
  },

  // Get motorcycle by ID
  getById: async (id) => {
    return await axiosClient.get(`/motorcycles/${id}`);
  },

  // Get nearby motorcycles
  getNearby: async (lat, lng, radius) => {
    return await axiosClient.get('/motorcycles/nearby', { params: { lat, lng, radius } });
  },

  // Search motorcycles
  search: async (query) => {
    return await axiosClient.get('/motorcycles/search', { params: { q: query } });
  },

  // Shop owner: Add bike
  addBike: async (data) => {
    return await axiosClient.post('/motorcycles', data);
  },

  // Shop owner: Update bike
  updateBike: async (id, data) => {
    return await axiosClient.put(`/motorcycles/${id}`, data);
  },

  // Shop owner: Delete bike
  deleteBike: async (id) => {
    return await axiosClient.delete(`/motorcycles/${id}`);
  },

  // Shop owner: Get my bikes
  getMyBikes: async () => {
    return await axiosClient.get('/motorcycles/my-bikes');
  },
};

export default motorbikeAPI;