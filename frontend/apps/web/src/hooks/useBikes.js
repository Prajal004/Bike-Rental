import { useState, useEffect } from 'react';
import { motorcycleAPI } from '../api';

export const useBikes = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const response = await motorcycleAPI.getAll();
      if (response.success) setBikes(response.data.motorcycles || []);
      else setError(response.message);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return { bikes, loading, error, refetch: fetchBikes };
};