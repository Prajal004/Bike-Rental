import React from 'react';

export const Input = ({ label, value, onChange, placeholder, type = 'text', error, required = false, disabled = false, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label} {required && <span className="text-red-500">*</span>}</label>}
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} disabled={disabled}
        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200
          ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-[#4CAF50]/30 focus:border-[#4CAF50]'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`} />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};