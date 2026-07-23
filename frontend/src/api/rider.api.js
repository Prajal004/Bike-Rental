import axiosClient from './axiosClient';

export const riderAPI = {
  // Submit rider verification
  submitVerification: async (data) => {
    return await axiosClient.post('/riders/verify', data);
  },

  // Get rider status
  getRiderStatus: async () => {
    return await axiosClient.get('/riders/status');
  },

  // Update rider documents
  updateDocuments: async (data) => {
    return await axiosClient.put('/riders/documents', data);
  },

  // Admin: Verify rider
  verifyRider: async (riderId, status, note) => {
    return await axiosClient.put(`/admin/riders/${riderId}/verify`, { status, note });
  },

  // Admin: Get all riders pending verification
  getPendingRiders: async () => {
    return await axiosClient.get('/admin/riders/pending');
  },
};

export default riderAPI;