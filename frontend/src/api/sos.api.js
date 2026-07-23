import axiosClient from './axiosClient';

export const sosAPI = {
  // Trigger SOS
  trigger: async (location) => {
    return await axiosClient.post('/sos/trigger', { location });
  },

  // Get active SOS
  getActive: async () => {
    return await axiosClient.get('/sos/active');
  },

  // Cancel SOS
  cancel: async (sosId) => {
    return await axiosClient.post('/sos/cancel', { sosId });
  },

  // Get SOS history
  getHistory: async () => {
    return await axiosClient.get('/sos/history');
  },

  // Get emergency contacts
  getContacts: async () => {
    return await axiosClient.get('/sos/emergency-contacts');
  },

  // Update emergency contacts
  updateContacts: async (contacts) => {
    return await axiosClient.put('/sos/emergency-contacts', { emergencyContacts: contacts });
  },
};

export default sosAPI;
