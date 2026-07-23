import axiosClient from './axiosClient';

export const shopAPI = {
  // Register a shop
  registerShop: async (shopData) => {
    return await axiosClient.post('/shops/register', shopData);
  },

  // Get all shops
  getAllShops: async (params) => {
    return await axiosClient.get('/shops', { params });
  },

  // Get nearby shops
  getNearbyShops: async (lat, lng, radius) => {
    return await axiosClient.get('/shops/nearby', { params: { lat, lng, radius } });
  },

  // Get shop by ID
  getShopById: async (shopId) => {
    return await axiosClient.get(`/shops/${shopId}`);
  },

  // Get my shop (for shop owner)
  getMyShop: async () => {
    return await axiosClient.get('/shops/my-shop');
  },

  // Update shop
  updateShop: async (shopId, data) => {
    return await axiosClient.put(`/shops/${shopId}`, data);
  },

  // Get shop bikes
  getShopBikes: async (shopId) => {
    return await axiosClient.get(`/shops/${shopId}/bikes`);
  },

  // Admin: Verify shop
  verifyShop: async (shopId, status, note) => {
    return await axiosClient.put(`/admin/shops/${shopId}/verify`, { status, note });
  },

  // Admin: Get all shops pending verification
  getPendingShops: async () => {
    return await axiosClient.get('/admin/shops/pending');
  },

  // Admin: Get all shops
  getAllShopsAdmin: async () => {
    return await axiosClient.get('/admin/shops');
  },

  // Shop owner: Get shop stats
  getShopStats: async () => {
    return await axiosClient.get('/shops/stats');
  },

  // Shop owner: Update shop status (active/inactive)
  updateShopStatus: async (shopId, isActive) => {
    return await axiosClient.put(`/shops/${shopId}/status`, { isActive });
  },
};

export default shopAPI;
