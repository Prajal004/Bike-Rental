import { api } from './axios';
import { Referral, ApiResponse } from '../types';

export const referralAPI = {
  getMyCode: () =>
    api.get<ApiResponse<Referral>>('/referrals/my-code'),

  getWallet: () =>
    api.get<ApiResponse<{ walletBalance: number }>>('/referrals/wallet'),

  getStats: () =>
    api.get<ApiResponse<any>>('/referrals/stats'),

  apply: (code: string, rentalId: string) =>
    api.post<ApiResponse<{ discount: number }>>('/referrals/apply', { referralCode: code, rentalId }),

  validate: (code: string) =>
    api.post<ApiResponse<{ valid: boolean; referrerName: string }>>('/referrals/validate', { referralCode: code }),
};
