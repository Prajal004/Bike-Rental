import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#4CAF50', padding: '16px', color: 'white' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '20px' }}>
          🏍️ Bike Rental
        </Link>
      </header>

      <main style={{ flex: 1, padding: '16px' }}>
        <Outlet />
      </main>

      <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '12px', borderTop: '1px solid #ddd', background: 'white' }}>
        <Link to="/" style={{ color: location.pathname === '/' ? '#4CAF50' : '#666', textDecoration: 'none' }}>🏠 Home</Link>
        <Link to="/orders" style={{ color: location.pathname === '/orders' ? '#4CAF50' : '#666', textDecoration: 'none' }}>📋 Orders</Link>
        <Link to="/admin" style={{ color: location.pathname === '/admin' ? '#4CAF50' : '#666', textDecoration: 'none' }}>👑 Admin</Link>
        <Link to="/profile" style={{ color: location.pathname === '/profile' ? '#4CAF50' : '#666', textDecoration: 'none' }}>👤 Profile</Link>
      </nav>
    </div>
  );
};

export default Layout;
