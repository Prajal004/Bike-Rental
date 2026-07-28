import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/context/AuthContext';
import { formatCurrency } from '@rental/shared/utils';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBikes: 0,
    totalRentals: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock stats - replace with actual API call
    setStats({
      totalBikes: 24,
      totalRentals: 156,
      totalRevenue: 124800,
      pendingOrders: 8,
    });
    setLoading(false);
  }, []);

  const isShopOwner = user?.role === 'shop_owner';
  const isAdmin = user?.role === 'admin';

  if (loading) {
    return <div className="loader-container"><div className="loader"></div></div>;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Welcome back, {user?.fullName || 'User'}!</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
          <span className="stat-icon">🏍️</span>
          <div className="stat-info">
            <span className="stat-value">{stats.totalBikes}</span>
            <span className="stat-label">Total Bikes</span>
          </div>
        </div>
        <div className="stat-card green">
          <span className="stat-icon">📋</span>
          <div className="stat-info">
            <span className="stat-value">{stats.totalRentals}</span>
            <span className="stat-label">Total Rentals</span>
          </div>
        </div>
        <div className="stat-card purple">
          <span className="stat-icon">💰</span>
          <div className="stat-info">
            <span className="stat-value">{formatCurrency(stats.totalRevenue)}</span>
            <span className="stat-label">Revenue</span>
          </div>
        </div>
        <div className="stat-card orange">
          <span className="stat-icon">⏳</span>
          <div className="stat-info">
            <span className="stat-value">{stats.pendingOrders}</span>
            <span className="stat-label">Pending Orders</span>
          </div>
        </div>
      </div>

      {isShopOwner && (
        <div className="quick-actions">
          <h4>Quick Actions</h4>
          <div className="action-grid">
            <a href="/add-bike" className="action-btn">➕ Add Bike</a>
            <a href="/shop-profile" className="action-btn">🏪 My Shop</a>
            <a href="/orders" className="action-btn">📋 View Orders</a>
          </div>
        </div>
      )}

      {isAdmin && (
        <div className="quick-actions">
          <h4>Admin Actions</h4>
          <div className="action-grid">
            <a href="/admin/shops" className="action-btn">🏪 Verify Shops</a>
            <a href="/admin/bikes" className="action-btn">🏍️ Verify Bikes</a>
            <a href="/admin/users" className="action-btn">👥 Manage Users</a>
          </div>
        </div>
      )}

      <style>{`
        .dashboard-page { padding: 8px 0 20px; }
        .dashboard-header { margin-bottom: 20px; }
        .dashboard-header h2 { font-size: 24px; font-weight: 700; }
        .dashboard-header p { color: #888; font-size: 14px; }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 20px;
        }
        .stat-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 12px;
        }
        .stat-card.blue { background: #dbeafe; }
        .stat-card.green { background: #dcfce7; }
        .stat-card.purple { background: #ede9fe; }
        .stat-card.orange { background: #fef3c7; }

        .stat-icon { font-size: 24px; }
        .stat-info { display: flex; flex-direction: column; }
        .stat-value { font-size: 20px; font-weight: 700; }
        .stat-label { font-size: 12px; color: #555; }

        .quick-actions { margin-top: 16px; }
        .quick-actions h4 { font-size: 16px; font-weight: 600; margin-bottom: 10px; }
        .action-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
        .action-btn {
          padding: 10px;
          background: #f5f5f5;
          border-radius: 8px;
          text-align: center;
          text-decoration: none;
          color: #333;
          font-size: 13px;
          font-weight: 500;
          border: 1px solid #eee;
        }
        .action-btn:hover { background: #e8e8e8; }

        .loader-container { display: flex; justify-content: center; align-items: center; min-height: 200px; }
        .loader {
          width: 40px;
          height: 40px;
          border: 4px solid #f0f0f0;
          border-top: 4px solid #4CAF50;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Dashboard;
