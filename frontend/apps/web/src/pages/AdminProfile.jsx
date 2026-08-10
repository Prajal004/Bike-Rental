import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Load from localStorage
  const loadProfile = () => {
    const saved = localStorage.getItem('adminProfile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  const [profile, setProfile] = useState(() => {
    const saved = loadProfile();
    return saved || {
      name: 'Prajal Shah',
      email: 'admin@bikerental.com',
      phone: '98XXXXXXXX',
      role: 'Super Admin',
      avatar: 'P',
    };
  });

  const [editData, setEditData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
  });

  const saveProfile = (data) => {
    localStorage.setItem('adminProfile', JSON.stringify(data));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    });
  };

  const handleSave = () => {
    if (!editData.name || !editData.email || !editData.phone) {
      alert('Please fill all fields');
      return;
    }
    const updated = {
      ...profile,
      name: editData.name,
      email: editData.email,
      phone: editData.phone,
    };
    setProfile(updated);
    saveProfile(updated);
    setIsEditing(false);
    alert('✅ Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      navigate('/login');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>👑 Admin Profile</h2>

      {/* Profile Card */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        textAlign: 'center',
        marginBottom: '20px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
          color: 'white',
          fontSize: '36px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
        }}>
          {profile.avatar}
        </div>

        {isEditing ? (
          <div style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>Full Name</label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }}
              />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>Email</label>
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }}
              />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>Phone</label>
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button
                onClick={handleSave}
                style={{ flex: 1, padding: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ✅ Save Changes
              </button>
              <button
                onClick={handleCancel}
                style={{ flex: 1, padding: '12px', background: '#E53935', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '4px' }}>{profile.name}</h3>
            <p style={{ color: '#4CAF50', fontWeight: '600', fontSize: '14px' }}>👑 {profile.role}</p>

            <div style={{
              marginTop: '20px',
              textAlign: 'left',
              borderTop: '1px solid #e5e7eb',
              paddingTop: '16px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ color: '#888' }}>📧 Email</span>
                <span style={{ fontWeight: '500' }}>{profile.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ color: '#888' }}>📞 Phone</span>
                <span style={{ fontWeight: '500' }}>{profile.phone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span style={{ color: '#888' }}>👑 Role</span>
                <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>{profile.role}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {!isEditing && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={handleEdit}
            style={{ padding: '14px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
          >
            ✏️ Edit Profile
          </button>
          <button
            onClick={handleLogout}
            style={{ padding: '14px', background: '#E53935', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
          >
            🚪 Logout
          </button>
        </div>
      )}

      <p style={{ textAlign: 'center', color: '#888', fontSize: '12px', marginTop: '20px' }}>© 2026 BikeRental Nepal</p>
    </div>
  );
};

export default AdminProfile;
