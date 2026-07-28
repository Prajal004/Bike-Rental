import { api } from './axios';

export const documentAPI = {
  upload: (data) => api.post('/documents/upload', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getMyDocuments: () => api.get('/documents/my'),
  getStatus: () => api.get('/documents/status'),
};