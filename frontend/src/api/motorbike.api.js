import axiosClient from './axiosClient';

export const motorbikeAPI = {
  getAll: async (params) => {
    return await axiosClient.get('/motorcycles', { params });
  },
  getFeatured: async () => {
    return await axiosClient.get('/motorcycles/featured');
  },
  getById: async (id) => {
    return await axiosClient.get(`/motorcycles/${id}`);
  },
  getNearby: async (lat, lng, radius) => {
    return await axiosClient.get('/motorcycles/nearby', { params: { lat, lng, radius } });
  },
  search: async (query) => {
    return await axiosClient.get('/motorcycles/search', { params: { q: query } });
  },
};

export default motorbikeAPI;
