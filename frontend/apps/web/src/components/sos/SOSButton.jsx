import React, { useState } from 'react';
import { sosAPI } from '@rental/shared/api';

export const SOSButton = () => {
  const [loading, setLoading] = useState(false);

  const triggerSOS = async () => {
    if (!navigator.geolocation) {
      alert('Location not supported');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await sosAPI.trigger({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Current Location',
          });
          alert('SOS triggered! Emergency contacts notified.');
        } catch (error) {
          alert('Failed to trigger SOS');
        } finally {
          setLoading(false);
        }
      },
      () => { alert('Unable to get location'); setLoading(false); }
    );
  };

  return (
    <button className="sos-trigger" onClick={triggerSOS} disabled={loading}>
      🆘 {loading ? 'Triggering...' : 'TRIGGER SOS'}
    </button>
  );
};