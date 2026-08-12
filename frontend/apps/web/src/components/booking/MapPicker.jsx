import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const MapPicker = ({ location, onSelect }) => {
  const [center, setCenter] = useState(location || { lat: 27.7172, lng: 85.3240 });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      center={center}
      zoom={15}
      onClick={(e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setCenter({ lat, lng });
        onSelect({ lat, lng });
      }}
      mapContainerStyle={{ width: '100%', height: '300px', borderRadius: '8px' }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default MapPicker;
