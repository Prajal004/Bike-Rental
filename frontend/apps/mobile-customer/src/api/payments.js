import { api } from './axios';

export const paymentAPI = {
  initiateEsewa: (rentalId) => api.post('/payments/esewa', { rentalId }),
  initiateKhalti: (rentalId) => api.post('/payments/khalti', { rentalId }),
  initiateFonepay: (rentalId) => api.post('/payments/fonepay', { rentalId }),
  getStatus: (paymentId) => api.get(`/payments/status/${paymentId}`),
  getInvoice: (rentalId) => api.get(`/payments/invoice/${rentalId}`),
};
