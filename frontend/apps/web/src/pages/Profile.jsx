import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/orders', icon: '📋', label: 'My Orders' },
    { path: '/referral', icon: '💰', label: 'Referral' },
    { path: '/sos', icon: '🆘', label: 'SOS' },
    { path: '/notifications', icon: '🔔', label: 'Notifications' },
    { path: '/shop-register', icon: '🏪', label: 'Register Shop' },
    { path: '/shop-profile', icon: '🏪', label: 'My Shop' },
  ];

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">{user?.fullName?.[0] || 'U'}</div>
        <h2>{user?.fullName || 'User'}</h2>
        <p className="profile-email">{user?.email || 'email@example.com'}</p>
        <p className="profile-phone">{user?.phone || '98XXXXXXXX'}</p>
      </div>

      <div className="profile-stats">
        <div className="stat-box">
          <span className="stat-number">{user?.totalRentals || 0}</span>
          <span className="stat-label">Rides</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">Rs {user?.walletBalance || 0}</span>
          <span className="stat-label">Wallet</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{user?.isVerified ? '✅' : '⏳'}</span>
          <span className="stat-label">Verified</span>
        </div>
      </div>

      <div className="profile-menu">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path} className="menu-item">
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
            <span className="menu-arrow">›</span>
          </Link>
        ))}
        <div className="menu-item logout" onClick={logout}>
          <span className="menu-icon">🚪</span>
          <span className="menu-label">Logout</span>
          <span className="menu-arrow">›</span>
        </div>
      </div>

      <style>{`
        .profile-page { padding: 8px 0 20px; }

        .profile-header {
          text-align: center;
          padding: 16px 0;
        }
        .profile-avatar {
          width: 72px;
          height: 72px;
          background: #4CAF50;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 700;
          margin: 0 auto 8px;
        }
        .profile-header h2 { font-size: 20px; font-weight: 700; }
        .profile-email, .profile-phone { color: #888; font-size: 14px; }

        .profile-stats {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
          margin: 16px 0;
        }
        .stat-box {
          background: #f5f5f5;
          border-radius: 12px;
          padding: 12px;
          text-align: center;
        }
        .stat-number { display: block; font-size: 20px; font-weight: 700; color: #4CAF50; }
        .stat-label { font-size: 12px; color: #888; }

        .profile-menu { display: flex; flex-direction: column; gap: 2px; }
        .menu-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border-radius: 8px;
          text-decoration: none;
          color: #333;
          cursor: pointer;
        }
        .menu-item:hover { background: #f5f5f5; }
        .menu-icon { font-size: 18px; margin-right: 12px; width: 24px; }
        .menu-label { flex: 1; font-weight: 500; }
        .menu-arrow { color: #ccc; }
        .menu-item.logout { color: #dc2626; }
      `}</style>
    </div>
  );
};

export default Profile;
