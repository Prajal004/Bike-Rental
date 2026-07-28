import { api } from './axios';

export const referralAPI = {
  getMyCode: () => api.get('/referrals/my-code'),
  getWallet: () => api.get('/referrals/wallet'),
  getStats: () => api.get('/referrals/stats'),
  apply: (code, rentalId) => api.post('/referrals/apply', { referralCode: code, rentalId }),
  validate: (code) => api.post('/referrals/validate', { referralCode: code }),
};