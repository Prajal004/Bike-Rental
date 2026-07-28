import { api } from './axios';
import { Rental, ApiResponse } from '../types';

export const rentalAPI = {
  create: (data: any) =>
    api.post<ApiResponse<Rental>>('/rentals', data),

  getUserRentals: () =>
    api.get<ApiResponse<{ rentals: Rental[] }>>('/rentals/user'),

  getById: (id: string) =>
    api.get<ApiResponse<Rental>>(`/rentals/${id}`),

  cancel: (id: string) =>
    api.put<ApiResponse<{ message: string }>>(`/rentals/${id}/cancel`),
};
