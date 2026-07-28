import { api } from './axios';
import { Document, ApiResponse } from '../types';

export const documentAPI = {
  upload: (data: FormData) =>
    api.post<ApiResponse<Document>>('/documents/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  getMyDocuments: () =>
    api.get<ApiResponse<{ documents: Document[] }>>('/documents/my'),

  getStatus: () =>
    api.get<ApiResponse<{ status: string }>>('/documents/status'),
};
