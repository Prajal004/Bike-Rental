import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/orders', label: 'Orders', icon: '📋' },
    { path: '/sos', label: 'SOS', icon: '🆘' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="app-layout">
      <header className="app-header">
        <Link to="/" className="logo">
          <span className="logo-icon">🏍️</span>
          <span className="logo-text">Bike<span>Rental</span></span>
        </Link>
        <div className="header-actions">
          <Link to="/notifications" className="icon-btn">
            🔔
          </Link>
          <Link to="/profile" className="avatar-btn">
            <span className="avatar-small">{user?.fullName?.[0] || 'U'}</span>
          </Link>
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <nav className="bottom-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
