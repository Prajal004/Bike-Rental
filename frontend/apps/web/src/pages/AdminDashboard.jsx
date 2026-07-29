import React, { useState } from 'react';
import AdminProfile from './AdminProfile';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = {
    totalCustomers: 156,
    totalShops: 24,
    totalBikes: 48,
    pendingVerifications: 12,
    totalOrders: 89,
    totalRevenue: 124800,
    activeSOS: 3,
    totalReferrals: 45,
  };

  const customers = [
    { id: 1, name: 'Ram K.', email: 'ram@email.com', phone: '98XXXXXXXX', verified: true, documents: '✅' },
    { id: 2, name: 'Sita P.', email: 'sita@email.com', phone: '98XXXXXXXX', verified: false, documents: '⏳' },
  ];

  const shops = [
    { id: 1, name: 'Prajal Bike Shop', address: 'Thamel', verified: true, documents: '✅' },
    { id: 2, name: 'Honda Motors', address: 'Patan', verified: false, documents: '⏳' },
  ];

  const bikes = [
    { id: 1, name: 'Honda CB Shine', shop: 'Prajal Bike Shop', verified: true, documents: '✅' },
    { id: 2, name: 'Yamaha FZ', shop: 'Yamaha Center', verified: false, documents: '⏳' },
  ];

  const orders = [
    { id: 1, customer: 'Ram K.', bike: 'Honda CB Shine', amount: 350, status: 'Completed' },
    { id: 2, customer: 'Sita P.', bike: 'Yamaha FZ', amount: 400, status: 'Pending' },
  ];

  const payments = [
    { id: 1, customer: 'Ram K.', amount: 350, method: 'eSewa', status: 'Success' },
    { id: 2, customer: 'Sita P.', amount: 400, method: 'Khalti', status: 'Pending' },
  ];

  const sosAlerts = [
    { id: 1, user: 'Ram K.', location: 'Thamel', status: 'Active', time: '2 min ago' },
    { id: 2, user: 'Sita P.', location: 'Patan', status: 'Resolved', time: '1 hour ago' },
  ];

  const referrals = [
    { id: 1, user: 'Ram K.', code: 'BIKE123', earned: 150 },
    { id: 2, user: 'Sita P.', code: 'RIDE456', earned: 100 },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div>
            <h3>📊 Dashboard</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginTop: '16px' }}>
              {Object.entries(stats).map(([key, value]) => (
                <div key={key} style={{ padding: '16px', background: 'white', borderRadius: '8px', border: '1px solid #eee', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '28px', margin: 0, color: '#4CAF50' }}>{value}</h3>
                  <p style={{ margin: '4px 0 0', color: '#888', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'customers':
        return (
          <div>
            <h3>👥 Customers</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
              <thead><tr><th style={{ padding: '10px', textAlign: 'left' }}>Name</th><th style={{ padding: '10px', textAlign: 'left' }}>Email</th><th style={{ padding: '10px', textAlign: 'left' }}>Verified</th><th style={{ padding: '10px', textAlign: 'left' }}>Documents</th><th style={{ padding: '10px', textAlign: 'left' }}>Action</th></tr></thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id}><td style={{ padding: '10px' }}>{c.name}</td><td style={{ padding: '10px' }}>{c.email}</td><td style={{ padding: '10px' }}>{c.verified ? '✅' : '⏳'}</td><td style={{ padding: '10px' }}>{c.documents}</td><td style={{ padding: '10px' }}><button style={{ padding: '4px 12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Verify</button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'shops':
        return (
          <div>
            <h3>🏪 Shops</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
              <thead><tr><th style={{ padding: '10px', textAlign: 'left' }}>Shop Name</th><th style={{ padding: '10px', textAlign: 'left' }}>Address</th><th style={{ padding: '10px', textAlign: 'left' }}>Verified</th><th style={{ padding: '10px', textAlign: 'left' }}>Documents</th><th style={{ padding: '10px', textAlign: 'left' }}>Action</th></tr></thead>
              <tbody>
                {shops.map((s) => (
                  <tr key={s.id}><td style={{ padding: '10px' }}>{s.name}</td><td style={{ padding: '10px' }}>{s.address}</td><td style={{ padding: '10px' }}>{s.verified ? '✅' : '⏳'}</td><td style={{ padding: '10px' }}>{s.documents}</td><td style={{ padding: '10px' }}><button style={{ padding: '4px 12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Verify</button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'bikes':
        return (
          <div>
            <h3>🏍️ Bikes</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
              <thead><tr><th style={{ padding: '10px', textAlign: 'left' }}>Bike Name</th><th style={{ padding: '10px', textAlign: 'left' }}>Shop</th><th style={{ padding: '10px', textAlign: 'left' }}>Verified</th><th style={{ padding: '10px', textAlign: 'left' }}>Documents</th><th style={{ padding: '10px', textAlign: 'left' }}>Action</th></tr></thead>
              <tbody>
                {bikes.map((b) => (
                  <tr key={b.id}><td style={{ padding: '10px' }}>{b.name}</td><td style={{ padding: '10px' }}>{b.shop}</td><td style={{ padding: '10px' }}>{b.verified ? '✅' : '⏳'}</td><td style={{ padding: '10px' }}>{b.documents}</td><td style={{ padding: '10px' }}><button style={{ padding: '4px 12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Verify</button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'orders':
        return (
          <div>
            <h3>📋 Orders</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
              <thead><tr><th style={{ padding: '10px', textAlign: 'left' }}>Customer</th><th style={{ padding: '10px', textAlign: 'left' }}>Bike</th><th style={{ padding: '10px', textAlign: 'left' }}>Amount</th><th style={{ padding: '10px', textAlign: 'left' }}>Status</th></tr></thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}><td style={{ padding: '10px' }}>{o.customer}</td><td style={{ padding: '10px' }}>{o.bike}</td><td style={{ padding: '10px' }}>Rs {o.amount}</td><td style={{ padding: '10px' }}><span style={{ padding: '4px 8px', borderRadius: '4px', background: o.status === 'Completed' ? '#dcfce7' : '#fef3c7' }}>{o.status}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'payments':
        return (
          <div>
            <h3>💰 Payments</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
              <thead><tr><th style={{ padding: '10px', textAlign: 'left' }}>Customer</th><th style={{ padding: '10px', textAlign: 'left' }}>Amount</th><th style={{ padding: '10px', textAlign: 'left' }}>Method</th><th style={{ padding: '10px', textAlign: 'left' }}>Status</th></tr></thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id}><td style={{ padding: '10px' }}>{p.customer}</td><td style={{ padding: '10px' }}>Rs {p.amount}</td><td style={{ padding: '10px' }}>{p.method}</td><td style={{ padding: '10px' }}><span style={{ padding: '4px 8px', borderRadius: '4px', background: p.status === 'Success' ? '#dcfce7' : '#fef3c7' }}>{p.status}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'sos':
        return (
          <div>
            <h3>🆘 SOS</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
              <thead><tr><th style={{ padding: '10px', textAlign: 'left' }}>User</th><th style={{ padding: '10px', textAlign: 'left' }}>Location</th><th style={{ padding: '10px', textAlign: 'left' }}>Status</th><th style={{ padding: '10px', textAlign: 'left' }}>Time</th></tr></thead>
              <tbody>
                {sosAlerts.map((s) => (
                  <tr key={s.id}><td style={{ padding: '10px' }}>{s.user}</td><td style={{ padding: '10px' }}>{s.location}</td><td style={{ padding: '10px' }}><span style={{ padding: '4px 8px', borderRadius: '4px', background: s.status === 'Active' ? '#dc2626' : '#dcfce7', color: s.status === 'Active' ? 'white' : 'black' }}>{s.status}</span></td><td style={{ padding: '10px' }}>{s.time}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'referrals':
        return (
          <div>
            <h3>🔗 Referrals</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
              <thead><tr><th style={{ padding: '10px', textAlign: 'left' }}>User</th><th style={{ padding: '10px', textAlign: 'left' }}>Code</th><th style={{ padding: '10px', textAlign: 'left' }}>Earned</th></tr></thead>
              <tbody>
                {referrals.map((r) => (
                  <tr key={r.id}><td style={{ padding: '10px' }}>{r.user}</td><td style={{ padding: '10px' }}>{r.code}</td><td style={{ padding: '10px' }}>Rs {r.earned}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'profile':
        return <AdminProfile />;

      default:
        return <div>Select a tab</div>;
    }
  };

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'customers', label: '👥 Customers' },
    { id: 'shops', label: '🏪 Shops' },
    { id: 'bikes', label: '🏍️ Bikes' },
    { id: 'orders', label: '📋 Orders' },
    { id: 'payments', label: '💰 Payments' },
    { id: 'sos', label: '🆘 SOS' },
    { id: 'referrals', label: '🔗 Referrals' },
    { id: 'profile', label: '👤 Profile' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '80vh', gap: '16px' }}>
      <div style={{ width: '200px', background: '#1a1a2e', color: 'white', padding: '16px 0', borderRadius: '8px', flexShrink: 0 }}>
        <h3 style={{ padding: '0 16px', marginBottom: '16px', fontSize: '18px' }}>👑 Admin</h3>
        {tabs.map((tab) => (
          <div key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: '10px 16px',
            cursor: 'pointer',
            background: activeTab === tab.id ? '#4CAF50' : 'transparent',
            borderRadius: '4px',
            margin: '2px 8px',
          }}>
            {tab.label}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: '0 20px', overflowX: 'auto' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
