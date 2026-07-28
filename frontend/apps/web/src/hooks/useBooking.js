import { useState } from 'react';
import { rentalAPI } from '../api';

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBooking = async (data) => {
    setLoading(true);
    try {
      const response = await rentalAPI.create(data);
      if (response.success) return { success: true, data: response.data };
      setError(response.message);
      return { success: false, message: response.message };
    } catch (err) { setError(err.message); return { success: false, message: err.message }; } finally { setLoading(false); }
  };

  return { createBooking, loading, error };
};