import { useState } from 'react';
import { paymentAPI } from '../api';

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const processPayment = async (method, rentalId) => {
    setLoading(true);
    try {
      let response;
      switch (method) {
        case 'esewa': response = await paymentAPI.initiateEsewa(rentalId); break;
        case 'khalti': response = await paymentAPI.initiateKhalti(rentalId); break;
        case 'fonepay': response = await paymentAPI.initiateFonepay(rentalId); break;
        default: throw new Error('Invalid payment method');
      }
      if (response.success) return { success: true, data: response.data };
      setError(response.message);
      return { success: false, message: response.message };
    } catch (err) { setError(err.message); return { success: false, message: err.message }; } finally { setLoading(false); }
  };

  return { processPayment, loading, error };
};