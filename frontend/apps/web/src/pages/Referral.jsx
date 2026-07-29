import React from 'react';

const Referral = () => {
  const referralCode = 'BIKE2026';

  return (
    <div>
      <h2>💰 Refer & Earn</h2>
      <div style={{ padding: '16px', background: 'linear-gradient(135deg, #4CAF50, #388E3C)', color: 'white', borderRadius: '8px', marginBottom: '16px' }}>
        <p style={{ opacity: 0.8 }}>Wallet Balance</p>
        <h2 style={{ margin: 0 }}>Rs 0</h2>
      </div>
      <div style={{ padding: '16px', background: 'white', borderRadius: '8px', border: '1px solid #eee' }}>
        <h4>Your Referral Code</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f5f5f5', padding: '8px 12px', borderRadius: '4px' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#4CAF50' }}>{referralCode}</span>
          <button style={{ padding: '4px 12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Copy</button>
        </div>
        <p style={{ fontSize: '13px', color: '#888' }}>Share this code. Friends get Rs 100 off, you earn Rs 50!</p>
      </div>
    </div>
  );
};

export default Referral;
