import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '🏠 Home' },
    { path: '/orders', label: '📋 Orders' },
    { path: '/admin', label: '👑 Admin' },
    { path: '/chat', label: '💬 Chat' },  // ✅ Chat added
    { path: '/profile', label: '👤 Profile' },
  ];

  return (
    <div className="app-container">
      {/* ✅ Unique Header */}
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">🏍️</span>
          <h1>Bike<span>Rental</span></h1>
        </div>
        <div className="tagline">RIDE SMARTER • RIDE SAFER</div>
      </header>

      <div className="app-layout">
        <nav className="app-sidebar">
          <div className="sidebar-title">Menu</div>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <main className="app-content">
          <Outlet />
        </main>
      </div>

      <nav className="bottom-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              color: location.pathname === item.path ? '#4CAF50' : '#666',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            {item.label.split(' ')[0]}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
