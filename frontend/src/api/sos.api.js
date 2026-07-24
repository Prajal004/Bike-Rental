import axiosClient from './axiosClient';

export const sosAPI = {
  trigger: async (location) => {
    return await axiosClient.post('/sos/trigger', { location });
  },
  getActive: async () => {
    return await axiosClient.get('/sos/active');
  },
  cancel: async (sosId) => {
    return await axiosClient.post('/sos/cancel', { sosId });
  },
  getHistory: async () => {
    return await axiosClient.get('/sos/history');
  },
  getContacts: async () => {
    return await axiosClient.get('/sos/emergency-contacts');
  },
  updateContacts: async (contacts) => {
    return await axiosClient.put('/sos/emergency-contacts', { emergencyContacts: contacts });
  },
};

export default sosAPI;
