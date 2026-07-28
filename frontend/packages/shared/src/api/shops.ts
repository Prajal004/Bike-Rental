import { api } from './axios';
import { Shop, ApiResponse } from '../types';

export const shopAPI = {
  getAll: (params?: any) =>
    api.get<ApiResponse<{ shops: Shop[] }>>('/shops', { params }),

  getById: (id: string) =>
    api.get<ApiResponse<Shop>>(`/shops/${id}`),

  register: (data: any) =>
    api.post<ApiResponse<Shop>>('/shops/register', data),

  getMyShop: () =>
    api.get<ApiResponse<Shop>>('/shops/my-shop'),

  update: (id: string, data: any) =>
    api.put<ApiResponse<Shop>>(`/shops/${id}`, data),

  getShopBikes: (shopId: string) =>
    api.get<ApiResponse<{ motorcycles: any[] }>>(`/shops/${shopId}/bikes`),
};
