import React from 'react';

export const AdminDashboard = ({ stats }) => {
  const items = [
    { icon: '🏪', value: stats?.totalShops || 0, label: 'Total Shops' },
    { icon: '🏍️', value: stats?.totalBikes || 0, label: 'Total Bikes' },
    { icon: '👤', value: stats?.totalUsers || 0, label: 'Total Users' },
    { icon: '⏳', value: stats?.pendingVerifications || 0, label: 'Pending Verifications' },
  ];
  return (
    <div className="dashboard-stats">
      {items.map((item, i) => (
        <div key={i} className="stat-card">
          <span className="stat-icon">{item.icon}</span>
          <span className="stat-value">{item.value}</span>
          <span className="stat-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};