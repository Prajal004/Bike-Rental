import React, { useState, useEffect } from 'react';
import { api } from '../api/axios';
import AdminDocuments from './AdminDocuments';
import AdminProfile from './AdminProfile';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalShops: 0,
    totalBikes: 0,
    pendingVerifications: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeSOS: 0,
    totalReferrals: 0,
  });

  const customers = [
    { id: 1, name: 'Ram K.', email: 'ram@email.com', phone: '98XXXXXXXX', verified: true },
    { id: 2, name: 'Sita P.', email: 'sita@email.com', phone: '98XXXXXXXX', verified: false },
    { id: 3, name: 'Hari S.', email: 'hari@email.com', phone: '98XXXXXXXX', verified: false },
  ];

  const shops = [
    { id: 1, name: 'Prajal Bike Shop', address: 'Thamel', verified: true },
    { id: 2, name: 'Honda Motors', address: 'Patan', verified: false },
  ];

  const bikes = [
    { id: 1, name: 'Honda CB Shine', shop: 'Prajal Bike Shop', verified: true, image: '🏍️' },
    { id: 2, name: 'Yamaha FZ', shop: 'Yamaha Center', verified: false, image: '🏍️' },
    { id: 3, name: 'TVS Apache', shop: 'TVS Showroom', verified: false, image: '🏍️' },
  ];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderDashboard = () => (
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

  const renderCustomers = () => (
    <div>
      <h3>👥 Customers</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
        <thead style={{ background: '#f5f5f5' }}><tr>
          <th style={{ padding: '10px' }}>Name</th>
          <th style={{ padding: '10px' }}>Email</th>
          <th style={{ padding: '10px' }}>Phone</th>
          <th style={{ padding: '10px' }}>Verified</th>
        </tr></thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{c.name}</td>
              <td style={{ padding: '10px' }}>{c.email}</td>
              <td style={{ padding: '10px' }}>{c.phone}</td>
              <td style={{ padding: '10px' }}>{c.verified ? '✅' : '⏳'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderShops = () => (
    <div>
      <h3>🏪 Shops</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
        <thead style={{ background: '#f5f5f5' }}><tr>
          <th style={{ padding: '10px' }}>Name</th>
          <th style={{ padding: '10px' }}>Address</th>
          <th style={{ padding: '10px' }}>Verified</th>
        </tr></thead>
        <tbody>
          {shops.map((s) => (
            <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{s.name}</td>
              <td style={{ padding: '10px' }}>{s.address}</td>
              <td style={{ padding: '10px' }}>{s.verified ? '✅' : '⏳'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderBikes = () => (
    <div>
      <h3>🏍️ Bikes</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
        <thead style={{ background: '#f5f5f5' }}><tr>
          <th style={{ padding: '10px' }}>Image</th>
          <th style={{ padding: '10px' }}>Name</th>
          <th style={{ padding: '10px' }}>Shop</th>
          <th style={{ padding: '10px' }}>Verified</th>
        </tr></thead>
        <tbody>
          {bikes.map((b) => (
            <tr key={b.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px', textAlign: 'center' }}><span style={{ fontSize: '24px' }}>{b.image}</span></td>
              <td style={{ padding: '10px' }}>{b.name}</td>
              <td style={{ padding: '10px' }}>{b.shop}</td>
              <td style={{ padding: '10px' }}>{b.verified ? '✅' : '⏳'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderOrders = () => (
    <div>
      <h3>📋 Orders</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
        <thead style={{ background: '#f5f5f5' }}><tr>
          <th style={{ padding: '10px' }}>Customer</th>
          <th style={{ padding: '10px' }}>Bike</th>
          <th style={{ padding: '10px' }}>Amount</th>
          <th style={{ padding: '10px' }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { id: 1, customer: 'Ram K.', bike: 'Honda CB Shine', amount: 350, status: 'Completed' },
            { id: 2, customer: 'Sita P.', bike: 'Yamaha FZ', amount: 400, status: 'Pending' },
          ].map((o) => (
            <tr key={o.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{o.customer}</td>
              <td style={{ padding: '10px' }}>{o.bike}</td>
              <td style={{ padding: '10px' }}>Rs {o.amount}</td>
              <td style={{ padding: '10px' }}><span style={{ padding: '4px 8px', borderRadius: '4px', background: o.status === 'Completed' ? '#dcfce7' : '#fef3c7' }}>{o.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPayments = () => (
    <div>
      <h3>💰 Payments</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
        <thead style={{ background: '#f5f5f5' }}><tr>
          <th style={{ padding: '10px' }}>Customer</th>
          <th style={{ padding: '10px' }}>Amount</th>
          <th style={{ padding: '10px' }}>Method</th>
          <th style={{ padding: '10px' }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { id: 1, customer: 'Ram K.', amount: 350, method: 'eSewa', status: 'Success' },
            { id: 2, customer: 'Sita P.', amount: 400, method: 'Khalti', status: 'Pending' },
          ].map((p) => (
            <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{p.customer}</td>
              <td style={{ padding: '10px' }}>Rs {p.amount}</td>
              <td style={{ padding: '10px' }}>{p.method}</td>
              <td style={{ padding: '10px' }}><span style={{ padding: '4px 8px', borderRadius: '4px', background: p.status === 'Success' ? '#dcfce7' : '#fef3c7' }}>{p.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderSOS = () => (
    <div>
      <h3>🆘 SOS Alerts</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
        <thead style={{ background: '#f5f5f5' }}><tr>
          <th style={{ padding: '10px' }}>User</th>
          <th style={{ padding: '10px' }}>Location</th>
          <th style={{ padding: '10px' }}>Status</th>
          <th style={{ padding: '10px' }}>Time</th>
          <th style={{ padding: '10px' }}>Action</th>
        </tr></thead>
        <tbody>
          {[
            { id: 1, user: 'Ram K.', location: 'Thamel', status: 'Active', time: '2 min ago' },
            { id: 2, user: 'Sita P.', location: 'Patan', status: 'Resolved', time: '1 hour ago' },
          ].map((s) => (
            <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{s.user}</td>
              <td style={{ padding: '10px' }}>{s.location}</td>
              <td style={{ padding: '10px' }}><span style={{ padding: '4px 8px', borderRadius: '4px', background: s.status === 'Active' ? '#dc2626' : '#dcfce7', color: s.status === 'Active' ? 'white' : 'black' }}>{s.status}</span></td>
              <td style={{ padding: '10px' }}>{s.time}</td>
              <td style={{ padding: '10px' }}><button style={{ padding: '4px 12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{s.status === 'Active' ? 'Resolve' : 'View'}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderReferrals = () => (
    <div>
      <h3>🔗 Referrals</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
        <thead style={{ background: '#f5f5f5' }}><tr>
          <th style={{ padding: '10px' }}>User</th>
          <th style={{ padding: '10px' }}>Code</th>
          <th style={{ padding: '10px' }}>Earned</th>
        </tr></thead>
        <tbody>
          {[
            { id: 1, user: 'Ram K.', code: 'BIKE123', earned: 150 },
            { id: 2, user: 'Sita P.', code: 'RIDE456', earned: 100 },
          ].map((r) => (
            <tr key={r.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{r.user}</td>
              <td style={{ padding: '10px' }}>{r.code}</td>
              <td style={{ padding: '10px' }}>Rs {r.earned}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'customers', label: '👥 Customers' },
    { id: 'shops', label: '🏪 Shops' },
    { id: 'bikes', label: '🏍️ Bikes' },
    { id: 'orders', label: '📋 Orders' },
    { id: 'payments', label: '💰 Payments' },
    { id: 'sos', label: '🆘 SOS' },
    { id: 'referrals', label: '🔗 Referrals' },
    { id: 'documents', label: '📄 Documents' },
    { id: 'profile', label: '👤 Profile' },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return renderDashboard();
      case 'customers': return renderCustomers();
      case 'shops': return renderShops();
      case 'bikes': return renderBikes();
      case 'orders': return renderOrders();
      case 'payments': return renderPayments();
      case 'sos': return renderSOS();
      case 'referrals': return renderReferrals();
      case 'documents': return <AdminDocuments />;
      case 'profile': return <AdminProfile />;
      default: return <div>Select a tab</div>;
    }
  };

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
