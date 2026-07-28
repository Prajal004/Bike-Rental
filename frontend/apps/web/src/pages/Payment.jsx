import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { paymentAPI } from '@rental/shared/api';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { rentalId, totalPrice } = location.state || {};
  const [method, setMethod] = useState('esewa');
  const [loading, setLoading] = useState(false);

  const methods = [
    { id: 'esewa', label: 'eSewa', icon: '💰' },
    { id: 'khalti', label: 'Khalti', icon: '💳' },
    { id: 'fonepay', label: 'Fonepay', icon: '📱' },
    { id: 'cash', label: 'Cash on Pickup', icon: '💵' },
  ];

  const handlePayment = async () => {
    setLoading(true);
    try {
      let response;
      switch (method) {
        case 'esewa':
          response = await paymentAPI.initiateEsewa(rentalId);
          break;
        case 'khalti':
          response = await paymentAPI.initiateKhalti(rentalId);
          break;
        case 'fonepay':
          response = await paymentAPI.initiateFonepay(rentalId);
          break;
        case 'cash':
          response = { success: true, message: 'Pay at pickup' };
          break;
        default:
          throw new Error('Invalid payment method');
      }

      if (response.success) {
        navigate('/orders');
      }
    } catch (error) {
      alert('Payment failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <h2>Payment</h2>
      <p className="subtitle">Choose payment method</p>

      <div className="payment-summary">
        <div className="summary-row">
          <span>Total Amount</span>
          <span className="total-amount">Rs {totalPrice || 0}</span>
        </div>
      </div>

      <div className="payment-methods">
        {methods.map((m) => (
          <div
            key={m.id}
            className={`method-card ${method === m.id ? 'active' : ''}`}
            onClick={() => setMethod(m.id)}
          >
            <span className="method-icon">{m.icon}</span>
            <div className="method-info">
              <h4>{m.label}</h4>
              <p>Pay with {m.label}</p>
            </div>
            <span className="method-radio">{method === m.id ? '●' : '○'}</span>
          </div>
        ))}
      </div>

      <button className="btn-primary" onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : `Pay Rs ${totalPrice || 0}`}
      </button>

      <p className="secure-text">🔒 Your payment is secure</p>

      <style>{`
        .payment-page { padding: 8px 0 20px; }
        .payment-page h2 { font-size: 24px; font-weight: 700; }
        .subtitle { color: #888; font-size: 14px; margin-bottom: 20px; }

        .payment-summary {
          background: #f5f5f5;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          font-weight: 700;
        }
        .total-amount { color: #4CAF50; }

        .payment-methods { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .method-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border: 2px solid #eee;
          border-radius: 12px;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .method-card.active { border-color: #4CAF50; background: #E8F5E9; }
        .method-icon { font-size: 24px; }
        .method-info { flex: 1; }
        .method-info h4 { font-size: 15px; font-weight: 600; }
        .method-info p { font-size: 12px; color: #888; }
        .method-radio { font-size: 20px; color: #4CAF50; }

        .secure-text { text-align: center; color: #888; font-size: 14px; margin-top: 12px; }
      `}</style>
    </div>
  );
};

export default Payment;
