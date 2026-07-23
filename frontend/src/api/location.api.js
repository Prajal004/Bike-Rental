import axiosClient from './axiosClient';

export const locationAPI = {
  // Get all locations
  getAll: async (params) => {
    return await axiosClient.get('/locations', { params });
  },

  // Get nearby locations
  getNearby: async (lat, lng, radius) => {
    return await axiosClient.get('/locations/nearby', { params: { lat, lng, radius } });
  },

  // Search locations
  search: async (query) => {
    return await axiosClient.get('/locations/search', { params: { q: query } });
  },

  // Validate location
  validate: async (lat, lng) => {
    return await axiosClient.post('/locations/validate', { lat, lng });
  },
};

export default locationAPI;
