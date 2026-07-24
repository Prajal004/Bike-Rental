import axiosClient from './axiosClient';

export const paymentAPI = {
  initiateEsewa: async (rentalId) => {
    return await axiosClient.post('/payments/esewa/initiate', { rentalId });
  },
  initiateKhalti: async (rentalId) => {
    return await axiosClient.post('/payments/khalti/initiate', { rentalId });
  },
  initiateFonepay: async (rentalId) => {
    return await axiosClient.post('/payments/fonepay/initiate', { rentalId });
  },
  getStatus: async (paymentId) => {
    return await axiosClient.get(`/payments/status/${paymentId}`);
  },
};

export default paymentAPI;
