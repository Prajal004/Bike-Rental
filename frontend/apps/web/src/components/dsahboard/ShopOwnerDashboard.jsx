import React from 'react';

export const ShopOwnerDashboard = ({ stats }) => {
  const items = [
    { icon: '🏍️', value: stats?.totalBikes || 0, label: 'Total Bikes' },
    { icon: '💰', value: `Rs ${stats?.revenue || 0}`, label: 'Revenue' },
    { icon: '📋', value: stats?.pendingOrders || 0, label: 'Pending Orders' },
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