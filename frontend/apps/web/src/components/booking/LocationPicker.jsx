import React from 'react';

export const LocationPicker = ({ label, value, onChange, locations }) => {
  return (
    <div className="location-picker">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="input-field">
        <option value="">Select location</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>
    </div>
  );
};