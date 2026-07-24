import axiosClient from './axiosClient';

export const locationAPI = {
  getAll: async (params) => {
    return await axiosClient.get('/locations', { params });
  },
  getNearby: async (lat, lng, radius) => {
    return await axiosClient.get('/locations/nearby', { params: { lat, lng, radius } });
  },
  search: async (query) => {
    return await axiosClient.get('/locations/search', { params: { q: query } });
  },
  validate: async (lat, lng) => {
    return await axiosClient.post('/locations/validate', { lat, lng });
  },
};

export default locationAPI;
