import axiosClient from './axiosClient';

export const paymentAPI = {
  // Initiate eSewa payment
  initiateEsewa: async (rentalId) => {
    return await axiosClient.post('/payments/esewa/initiate', { rentalId });
  },

  // Initiate Khalti payment
  initiateKhalti: async (rentalId) => {
    return await axiosClient.post('/payments/khalti/initiate', { rentalId });
  },

  // Initiate Fonepay payment
  initiateFonepay: async (rentalId) => {
    return await axiosClient.post('/payments/fonepay/initiate', { rentalId });
  },

  // Get payment status
  getStatus: async (paymentId) => {
    return await axiosClient.get(`/payments/status/${paymentId}`);
  },

  // Get invoice
  getInvoice: async (rentalId) => {
    return await axiosClient.get(`/payments/invoice/${rentalId}`);
  },
};

export default paymentAPI;
