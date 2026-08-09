import { useState, useEffect } from 'react';
import { motorcycleAPI } from '../api/motorcycles';

export const useBikes = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBikes = async () => {
    setLoading(true);
    try {
      const response = await motorcycleAPI.getAll();
      if (response.success) {
        setBikes(response.data?.motorcycles || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  return { bikes, loading, error, refetch: fetchBikes };
};

export default useBikes;
