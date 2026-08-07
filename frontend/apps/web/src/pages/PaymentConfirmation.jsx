import React from 'react';
import { Link } from 'react-router-dom';

const PaymentConfirmation = ({ orderId, amount }) => {
  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '40px 20px',
      textAlign: 'center',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    }}>
      {/* ✅ Success Icon */}
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: '#dcfce7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
      }}>
        <span style={{ fontSize: '40px' }}>✅</span>
      </div>

      <h2 style={{ marginBottom: '8px' }}>Payment Successful!</h2>
      <p style={{ color: '#888' }}>
        Your payment of <strong style={{ color: '#4CAF50' }}>Rs {amount}</strong> has been confirmed.
      </p>

      {/* ✅ Order ID */}
      <div style={{
        background: '#f5f5f5',
        padding: '12px',
        borderRadius: '8px',
        margin: '20px 0',
      }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#888' }}>Order ID</p>
        <p style={{ margin: 0, fontWeight: 'bold', fontSize: '18px' }}>#{orderId || 'BK-2026-001'}</p>
      </div>

      {/* ✅ Actions */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link
          to="/orders"
          style={{
            flex: 1,
            padding: '12px',
            background: '#4CAF50',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
          }}
        >
          📋 View Orders
        </Link>
        <Link
          to="/"
          style={{
            flex: 1,
            padding: '12px',
            background: '#f0f0f0',
            color: '#333',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
          }}
        >
          🏠 Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
