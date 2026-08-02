import React, { useState } from 'react';

const AdminPayments = () => {
  const [payments, setPayments] = useState([
    { id: 1, customer: 'Ram K.', amount: 350, method: 'eSewa', status: 'Success' },
    { id: 2, customer: 'Sita P.', amount: 400, method: 'Khalti', status: 'Pending' },
    { id: 3, customer: 'Hari S.', amount: 380, method: 'Cash', status: 'Success' },
  ]);

  const handleRefund = (id) => {
    if (window.confirm('Refund this payment?')) {
      setPayments(payments.map(p => p.id === id ? { ...p, status: 'Refunded' } : p));
      alert('Payment refunded!');
    }
  };

  return (
    <div>
      <h2>💰 Payments</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
        <thead style={{ background: '#f5f5f5' }}>
          <tr>
            <th style={{ padding: '10px', textAlign: 'left' }}>Customer</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Amount</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Method</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{p.customer}</td>
              <td style={{ padding: '10px' }}>Rs {p.amount}</td>
              <td style={{ padding: '10px' }}>{p.method}</td>
              <td style={{ padding: '10px' }}><span style={{ padding: '4px 8px', borderRadius: '4px', background: p.status === 'Success' ? '#dcfce7' : p.status === 'Refunded' ? '#fef3c7' : '#fef3c7' }}>{p.status}</span></td>
              <td style={{ padding: '10px' }}>
                {p.status !== 'Refunded' && (
                  <button onClick={() => handleRefund(p.id)} style={{ padding: '4px 12px', background: '#E53935', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Refund</button>
                )}
                {p.status === 'Refunded' && <span style={{ color: '#888' }}>✅ Refunded</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPayments;
