import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    name: 'Prajal Shah',
    email: 'admin@bikerental.com',
    phone: '98XXXXXXXX',
    role: 'Super Admin',
    joined: 'Jan 2026',
    avatar: 'P',
  });

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      navigate('/login');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>👤 Admin Profile</h2>

      <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '8px', border: '1px solid #eee' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#4CAF50', color: 'white', fontSize: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
          {admin.avatar}
        </div>
        <h3>{admin.name}</h3>
        <p style={{ color: '#888' }}>{admin.role}</p>
        <p style={{ color: '#888', fontSize: '13px' }}>Member since {admin.joined}</p>
      </div>

      <div style={{ marginTop: '20px', background: 'white', borderRadius: '8px', border: '1px solid #eee', padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
          <span style={{ color: '#888' }}>📧 Email</span>
          <span>{admin.email}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
          <span style={{ color: '#888' }}>📞 Phone</span>
          <span>{admin.phone}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
          <span style={{ color: '#888' }}>👑 Role</span>
          <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>{admin.role}</span>
        </div>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit Profile</button>
        <button style={{ padding: '10px 20px', background: '#E53935', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Change Password</button>
        <button 
          onClick={handleLogout}
          style={{ padding: '10px 20px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
