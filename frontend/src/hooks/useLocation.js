import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setLoading(false);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
          accuracy: loc.coords.accuracy,
        });
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getAddress = async (lat, lng) => {
    try {
      const response = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: lng,
      });
      if (response.length > 0) {
        const addr = response[0];
        return `${addr.name || ''}, ${addr.city || ''}, ${addr.region || ''}`;
      }
      return 'Unknown location';
    } catch (error) {
      console.error('Reverse geocode error:', error);
      return 'Location not found';
    }
  };

  return {
    location,
    errorMsg,
    loading,
    getAddress,
  };
};

export default useLocation;
