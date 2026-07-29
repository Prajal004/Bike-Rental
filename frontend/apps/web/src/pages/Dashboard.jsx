import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBikes: 24,
    totalRentals: 156,
    totalRevenue: 124800,
  });

  return (
    <div>
      <h2>📊 Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '16px' }}>
        <div style={{ padding: '16px', background: '#dbeafe', borderRadius: '8px' }}>
          <h3>{stats.totalBikes}</h3>
          <p>Total Bikes</p>
        </div>
        <div style={{ padding: '16px', background: '#dcfce7', borderRadius: '8px' }}>
          <h3>{stats.totalRentals}</h3>
          <p>Total Rentals</p>
        </div>
        <div style={{ padding: '16px', background: '#ede9fe', borderRadius: '8px' }}>
          <h3>Rs {stats.totalRevenue}</h3>
          <p>Revenue</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
