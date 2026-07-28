import React from 'react';

export const PaymentMethods = ({ selected, onChange }) => {
  const methods = [
    { id: 'esewa', label: 'eSewa', icon: '💰' },
    { id: 'khalti', label: 'Khalti', icon: '💳' },
    { id: 'fonepay', label: 'Fonepay', icon: '📱' },
    { id: 'cash', label: 'Cash on Pickup', icon: '💵' },
  ];

  return (
    <div className="payment-methods">
      {methods.map((m) => (
        <div key={m.id} className={`method-card ${selected === m.id ? 'active' : ''}`} onClick={() => onChange(m.id)}>
          <span className="method-icon">{m.icon}</span>
          <div className="method-info"><h4>{m.label}</h4><p>Pay with {m.label}</p></div>
          <span className="method-radio">{selected === m.id ? '●' : '○'}</span>
        </div>
      ))}
    </div>
  );
};