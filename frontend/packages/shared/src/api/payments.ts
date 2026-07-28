import { api } from './axios';
import { Payment, ApiResponse } from '../types';

export const paymentAPI = {
  initiateEsewa: (rentalId: string) =>
    api.post<ApiResponse<{ paymentUrl: string }>>('/payments/esewa', { rentalId }),

  initiateKhalti: (rentalId: string) =>
    api.post<ApiResponse<{ paymentUrl: string }>>('/payments/khalti', { rentalId }),

  initiateFonepay: (rentalId: string) =>
    api.post<ApiResponse<{ qrCode: string }>>('/payments/fonepay', { rentalId }),

  getStatus: (paymentId: string) =>
    api.get<ApiResponse<Payment>>(`/payments/status/${paymentId}`),

  getInvoice: (rentalId: string) =>
    api.get<ApiResponse<any>>(`/payments/invoice/${rentalId}`),
};
