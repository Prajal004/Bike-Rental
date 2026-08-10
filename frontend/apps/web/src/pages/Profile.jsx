import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showUploadDocs, setShowUploadDocs] = useState(false);

  // ✅ Load user from localStorage
  const loadUser = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  const [user, setUser] = useState(loadUser());

  // ✅ Profile state — localStorage bata load
  const [profile, setProfile] = useState({
    name: user?.fullName || user?.name || 'User',
    email: user?.email || 'email@example.com',
    phone: user?.phone || '98XXXXXXXX',
    role: user?.role || 'customer',
  });

  const [editData, setEditData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
  });

  const isAdmin = profile.role === 'admin';

  // ✅ Save profile to localStorage
  const saveProfileToStorage = (data) => {
    const userData = loadUser() || {};
    const updatedUser = {
      ...userData,
      fullName: data.name,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
    };
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // ✅ Edit Profile - Save
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
    saveProfileToStorage(updated);
    setIsEditing(false);
    alert('✅ Profile updated successfully!');
  };

  const handleEdit = () => {
    setEditData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    });
    setIsEditing(true);
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

  const getRoleDisplay = () => {
    if (isAdmin) return '👑 Super Admin';
    return '👤 Customer';
  };

  const getRoleColor = () => {
    if (isAdmin) return '#9C27B0';
    return '#4CAF50';
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>👤 My Profile</h2>

      {/* ✅ Debug info */}
      <div style={{ fontSize: '12px', color: '#999', marginBottom: '10px', padding: '8px', background: '#f5f5f5', borderRadius: '4px' }}>
        Role: {profile.role} | Email: {profile.email}
      </div>

      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        textAlign: 'center',
        marginBottom: '20px',
        border: '1px solid #e5e7eb',
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: getRoleColor(),
          color: 'white',
          fontSize: '32px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px',
        }}>
          {profile.name.charAt(0).toUpperCase()}
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
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleSave}
                style={{ flex: 1, padding: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ✅ Save
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
            <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>{profile.name}</h3>
            <p style={{ color: getRoleColor(), fontWeight: 'bold', fontSize: '16px' }}>{getRoleDisplay()}</p>
            <p style={{ color: '#4CAF50', fontSize: '13px', marginTop: '4px' }}>✅ Verified</p>
          </>
        )}
      </div>

      {!isEditing && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '16px',
          border: '1px solid #e5e7eb',
          marginBottom: '16px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ color: '#888' }}>📧 Email</span>
            <span style={{ fontWeight: '500' }}>{profile.email}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ color: '#888' }}>📞 Phone</span>
            <span style={{ fontWeight: '500' }}>{profile.phone}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
            <span style={{ color: '#888' }}>👑 Role</span>
            <span style={{ color: getRoleColor(), fontWeight: 'bold' }}>{getRoleDisplay()}</span>
          </div>
        </div>
      )}

      {!isEditing && (
        <>
          <button
            onClick={handleEdit}
            style={{ width: '100%', padding: '14px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}
          >
            ✏️ Edit Profile
          </button>
          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            style={{ width: '100%', padding: '14px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}
          >
            🔑 Change Password
          </button>
          {showChangePassword && (
            <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '8px', marginBottom: '10px' }}>
              <input type="password" placeholder="Old Password" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '8px' }} />
              <input type="password" placeholder="New Password" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '8px' }} />
              <input type="password" placeholder="Confirm Password" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '8px' }} />
              <button style={{ width: '100%', padding: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Update Password</button>
            </div>
          )}

          <button
            onClick={() => setShowUploadDocs(!showUploadDocs)}
            style={{ width: '100%', padding: '14px', background: '#FF9800', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}
          >
            📄 Upload Documents
          </button>
          {showUploadDocs && (
            <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '8px', marginBottom: '10px' }}>
              <button style={{ width: '100%', padding: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '8px' }}>📎 Driving License</button>
              <button style={{ width: '100%', padding: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>📎 Citizenship</button>
            </div>
          )}

          {isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              style={{ width: '100%', padding: '14px', background: '#9C27B0', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px' }}
            >
              👑 Go to Admin Dashboard
            </button>
          )}

          <button
            onClick={handleLogout}
            style={{ width: '100%', padding: '14px', background: '#E53935', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            🚪 Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;
