import React from 'react';

export const CustomerDashboard = ({ stats }) => {
  const items = [
    { icon: '🏍️', value: stats?.totalRides || 0, label: 'Total Rides' },
    { icon: '💰', value: `Rs ${stats?.totalSpent || 0}`, label: 'Total Spent' },
    { icon: '⭐', value: stats?.rating || 0, label: 'Rating' },
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