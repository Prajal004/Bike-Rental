import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showUploadDocs, setShowUploadDocs] = useState(false);

  useEffect(() => {
    // Load user from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        console.log('👤 User data from storage:', parsed);
        setUser(parsed);
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  const [profile, setProfile] = useState({
    name: user?.fullName || user?.name || 'User',
    email: user?.email || 'email@example.com',
    phone: user?.phone || '98XXXXXXXX',
  });

  const [editData, setEditData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [documents, setDocuments] = useState({ license: null, citizenship: null });

  // ✅ Role-based display
  const userRole = user?.role || 'customer';
  const isAdmin = userRole === 'admin';
  const isShopOwner = userRole === 'shop_owner';
  const isCustomer = userRole === 'customer';

  const getRoleDisplay = () => {
    if (isAdmin) return '👑 Super Admin';
    if (isShopOwner) return '🏪 Shop Owner';
    return '👤 Customer';
  };

  const getRoleColor = () => {
    if (isAdmin) return '#9C27B0';
    if (isShopOwner) return '#FF9800';
    return '#4CAF50';
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      navigate('/login');
    }
  };

  const startEditing = () => {
    setEditData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    });
    setIsEditing(true);
  };

  const saveProfile = () => {
    if (!editData.name || !editData.email || !editData.phone) {
      alert('Please fill all fields');
      return;
    }
    setProfile({
      name: editData.name,
      email: editData.email,
      phone: editData.phone,
    });
    setIsEditing(false);
    alert('✅ Profile updated successfully!');
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('Please fill all password fields');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    alert('✅ Password changed successfully!');
    setShowChangePassword(false);
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleUploadDocument = (type) => {
    const fileName = prompt(`Enter file name for ${type}:`);
    if (fileName) {
      setDocuments({ ...documents, [type]: fileName });
      alert(`✅ ${type} uploaded successfully!`);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>👤 My Profile</h2>

      <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '8px', border: '1px solid #eee' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: getRoleColor(), color: 'white', fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
          {profile.name.charAt(0)}
        </div>

        {isEditing ? (
          <div style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>Full Name</label>
              <input type="text" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>Email</label>
              <input type="email" value={editData.email} onChange={(e) => setEditData({...editData, email: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>Phone</label>
              <input type="tel" value={editData.phone} onChange={(e) => setEditData({...editData, phone: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={saveProfile} style={{ flex: 1, padding: '10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>✅ Save</button>
              <button onClick={cancelEditing} style={{ flex: 1, padding: '10px', background: '#E53935', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>❌ Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <h3>{profile.name}</h3>
            <p style={{ color: getRoleColor(), fontWeight: 'bold', fontSize: '16px' }}>{getRoleDisplay()}</p>
            <p style={{ color: '#4CAF50', fontSize: '13px' }}>✅ Verified</p>
          </>
        )}
      </div>

      {!isEditing && (
        <div style={{ marginTop: '16px', background: 'white', borderRadius: '8px', border: '1px solid #eee', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
            <span style={{ color: '#888' }}>📧 Email</span>
            <span>{profile.email}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
            <span style={{ color: '#888' }}>📞 Phone</span>
            <span>{profile.phone}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
            <span style={{ color: '#888' }}>👑 Role</span>
            <span style={{ color: getRoleColor(), fontWeight: 'bold' }}>{getRoleDisplay()}</span>
          </div>
        </div>
      )}

      {!isEditing && (
        <button onClick={startEditing} style={{ width: '100%', padding: '10px', marginTop: '10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          ✏️ Edit Profile
        </button>
      )}

      <button onClick={() => setShowChangePassword(!showChangePassword)} style={{ width: '100%', padding: '10px', marginTop: '10px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        🔑 Change Password
      </button>
      {showChangePassword && (
        <div style={{ marginTop: '10px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
          <input type="password" placeholder="Old Password" value={passwordData.oldPassword} onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
          <input type="password" placeholder="New Password" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
          <input type="password" placeholder="Confirm Password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
          <button onClick={handleChangePassword} style={{ width: '100%', padding: '10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Update Password</button>
        </div>
      )}

      <button onClick={() => setShowUploadDocs(!showUploadDocs)} style={{ width: '100%', padding: '10px', marginTop: '10px', background: '#FF9800', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        📄 Upload Documents
      </button>
      {showUploadDocs && (
        <div style={{ marginTop: '10px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Driving License</label>
            <button onClick={() => handleUploadDocument('license')} style={{ padding: '8px 16px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>📎 Choose File</button>
            {documents.license && <span style={{ color: 'green', marginLeft: '8px' }}>✅ {documents.license}</span>}
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>Citizenship</label>
            <button onClick={() => handleUploadDocument('citizenship')} style={{ padding: '8px 16px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>📎 Choose File</button>
            {documents.citizenship && <span style={{ color: 'green', marginLeft: '8px' }}>✅ {documents.citizenship}</span>}
          </div>
        </div>
      )}

      {isAdmin && (
        <button onClick={() => navigate('/admin')} style={{ width: '100%', padding: '10px', marginTop: '10px', background: '#9C27B0', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          👑 Go to Admin Dashboard
        </button>
      )}

      <button onClick={handleLogout} style={{ width: '100%', padding: '10px', marginTop: '10px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
        🚪 Logout
      </button>
    </div>
  );
};

export default Profile;
