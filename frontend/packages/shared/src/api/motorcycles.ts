import { api } from './axios';
import { Motorcycle, ApiResponse } from '../types';

export const motorcycleAPI = {
  getAll: (params?: any) =>
    api.get<ApiResponse<{ motorcycles: Motorcycle[]; total: number }>>('/motorcycles', { params }),

  getFeatured: () =>
    api.get<ApiResponse<{ motorcycles: Motorcycle[] }>>('/motorcycles/featured'),

  getById: (id: string) =>
    api.get<ApiResponse<Motorcycle>>(`/motorcycles/${id}`),

  getNearby: (lat: number, lng: number, radius?: number) =>
    api.get<ApiResponse<{ motorcycles: Motorcycle[] }>>('/motorcycles/nearby', { params: { lat, lng, radius } }),

  search: (query: string) =>
    api.get<ApiResponse<{ motorcycles: Motorcycle[] }>>('/motorcycles/search', { params: { q: query } }),

  create: (data: any) =>
    api.post<ApiResponse<Motorcycle>>('/motorcycles', data),

  update: (id: string, data: any) =>
    api.put<ApiResponse<Motorcycle>>(`/motorcycles/${id}`, data),

  delete: (id: string) =>
    api.delete<ApiResponse<{ message: string }>>(`/motorcycles/${id}`),
};
