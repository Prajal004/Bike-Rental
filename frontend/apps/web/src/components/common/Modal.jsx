import React from 'react';

export const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">✕</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};