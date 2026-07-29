import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      navigate('/login');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>👤 My Profile</h2>

      <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '8px', border: '1px solid #eee' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#4CAF50', color: 'white', fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
          P
        </div>
        <h3>Prajal Shah</h3>
        <p style={{ color: '#888' }}>Customer</p>
      </div>

      <div style={{ marginTop: '16px', background: 'white', borderRadius: '8px', border: '1px solid #eee', padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
          <span style={{ color: '#888' }}>📧 Email</span>
          <span>prajal@example.com</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
          <span style={{ color: '#888' }}>📞 Phone</span>
          <span>98XXXXXXXX</span>
        </div>
      </div>

      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button style={{ padding: '10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit Profile</button>
        <button 
          onClick={handleLogout}
          style={{ padding: '10px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
