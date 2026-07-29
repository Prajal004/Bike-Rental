import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 1000 };
  const [method, setMethod] = useState('esewa');

  const methods = [
    { id: 'esewa', label: 'eSewa', icon: '💰' },
    { id: 'khalti', label: 'Khalti', icon: '💳' },
    { id: 'fonepay', label: 'Fonepay', icon: '📱' },
    { id: 'cash', label: 'Cash on Pickup', icon: '💵' },
  ];

  const handlePayment = () => {
    alert(`Payment of Rs ${totalPrice} successful via ${method}! (Mock)`);
    navigate('/orders');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Payment</h2>
      <p style={{ color: '#888' }}>Choose payment method</p>

      <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
          <span>Total Amount</span>
          <span style={{ color: '#4CAF50' }}>Rs {totalPrice}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        {methods.map((m) => (
          <div key={m.id} onClick={() => setMethod(m.id)} style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
            border: method === m.id ? '2px solid #4CAF50' : '2px solid #eee',
            borderRadius: '8px', cursor: 'pointer', background: method === m.id ? '#E8F5E9' : 'white'
          }}>
            <span style={{ fontSize: '24px' }}>{m.icon}</span>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0 }}>{m.label}</h4>
              <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Pay with {m.label}</p>
            </div>
            <span style={{ fontSize: '20px', color: '#4CAF50' }}>{method === m.id ? '●' : '○'}</span>
          </div>
        ))}
      </div>

      <button onClick={handlePayment} style={{ width: '100%', padding: '14px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
        Pay Rs {totalPrice}
      </button>
      <p style={{ textAlign: 'center', color: '#888', marginTop: '12px' }}>🔒 Your payment is secure</p>
    </div>
  );
};

export default Payment;
