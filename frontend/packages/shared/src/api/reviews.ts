import { api } from './axios';
import { Review, ApiResponse } from '../types';

export const reviewAPI = {
  create: (data: { motorcycleId: string; rating: number; comment: string }) =>
    api.post<ApiResponse<Review>>('/reviews', data),

  getByMotorcycle: (motorcycleId: string) =>
    api.get<ApiResponse<{ reviews: Review[] }>>(`/reviews/${motorcycleId}`),

  update: (id: string, data: any) =>
    api.put<ApiResponse<Review>>(`/reviews/${id}`, data),

  delete: (id: string) =>
    api.delete<ApiResponse<{ message: string }>>(`/reviews/${id}`),
};
