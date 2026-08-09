import { api } from './axios';

export const sosAPI = {
  trigger: (location) => api.post('/sos/trigger', { location }),
  getActive: () => api.get('/sos/active'),
  cancel: (sosId) => api.post('/sos/cancel', { sosId }),
  getHistory: () => api.get('/sos/history'),
  getEmergencyContacts: () => api.get('/sos/emergency-contacts'),
  updateEmergencyContacts: (contacts) => api.put('/sos/emergency-contacts', { emergencyContacts: contacts }),
};
