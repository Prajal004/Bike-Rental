import React, { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Stats
  const stats = {
    totalCustomers: 156,
    totalShops: 24,
    totalBikes: 23,
    pendingVerifications: 12,
    totalOrders: 89,
    totalRevenue: 124800,
    activeSOS: 0,
    totalReferrals: 0,
  };

  // Mock Data
  const customers = [
    { id: 1, name: 'Ram K.', email: 'ram@email.com', phone: '98XXXXXXXX', verified: true },
    { id: 2, name: 'Sita P.', email: 'sita@email.com', phone: '98XXXXXXXX', verified: false },
    { id: 3, name: 'Hari S.', email: 'hari@email.com', phone: '98XXXXXXXX', verified: true },
  ];

  const shops = [
    { id: 1, name: 'Prajal Bike Shop', address: 'Thamel', verified: true },
    { id: 2, name: 'Honda Motors', address: 'Patan', verified: false },
  ];

  const bikes = [
    { id: 1, name: 'Honda CB Shine', shop: 'Prajal Bike Shop', verified: true },
    { id: 2, name: 'Yamaha FZ', shop: 'Yamaha Center', verified: false },
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

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>📊 Dashboard</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
              <div style={{ background: '#dbeafe', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e40af' }}>{stats.totalCustomers}</div>
                <div style={{ color: '#1e40af' }}>Total Customers</div>
              </div>
              <div style={{ background: '#dcfce7', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#166534' }}>{stats.totalShops}</div>
                <div style={{ color: '#166534' }}>Total Shops</div>
              </div>
              <div style={{ background: '#fef3c7', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#92400e' }}>{stats.totalBikes}</div>
                <div style={{ color: '#92400e' }}>Total Bikes</div>
              </div>
              <div style={{ background: '#ede9fe', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#5b21b6' }}>{stats.totalOrders}</div>
                <div style={{ color: '#5b21b6' }}>Total Orders</div>
              </div>
              <div style={{ background: '#fee2e2', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#991b1b' }}>{stats.activeSOS}</div>
                <div style={{ color: '#991b1b' }}>Active SOS</div>
              </div>
              <div style={{ background: '#fce7f3', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#9d174d' }}>{stats.totalReferrals}</div>
                <div style={{ color: '#9d174d' }}>Total Referrals</div>
              </div>
              <div style={{ background: '#d1fae5', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#065f46' }}>Rs {stats.totalRevenue.toLocaleString()}</div>
                <div style={{ color: '#065f46' }}>Total Revenue</div>
              </div>
              <div style={{ background: '#fef9c3', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#854d0e' }}>{stats.pendingVerifications}</div>
                <div style={{ color: '#854d0e' }}>Pending Verifications</div>
              </div>
            </div>
          </div>
        );

      case 'customers':
        return (
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>👥 Customers</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden' }}>
              <thead style={{ background: '#f3f4f6' }}>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Phone</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Verified</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}>{c.name}</td>
                    <td style={{ padding: '12px' }}>{c.email}</td>
                    <td style={{ padding: '12px' }}>{c.phone}</td>
                    <td style={{ padding: '12px' }}>{c.verified ? '✅' : '⏳'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'shops':
        return (
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>🏪 Shops</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden' }}>
              <thead style={{ background: '#f3f4f6' }}>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Shop Name</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Address</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Verified</th>
                </tr>
              </thead>
              <tbody>
                {shops.map((s) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}>{s.name}</td>
                    <td style={{ padding: '12px' }}>{s.address}</td>
                    <td style={{ padding: '12px' }}>{s.verified ? '✅' : '⏳'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'bikes':
        return (
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>🏍️ Bikes</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden' }}>
              <thead style={{ background: '#f3f4f6' }}>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Bike Name</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Shop</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Verified</th>
                </tr>
              </thead>
              <tbody>
                {bikes.map((b) => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}>{b.name}</td>
                    <td style={{ padding: '12px' }}>{b.shop}</td>
                    <td style={{ padding: '12px' }}>{b.verified ? '✅' : '⏳'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'orders':
        return (
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>📋 Orders</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden' }}>
              <thead style={{ background: '#f3f4f6' }}>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Customer</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Bike</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Amount</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}>{o.customer}</td>
                    <td style={{ padding: '12px' }}>{o.bike}</td>
                    <td style={{ padding: '12px' }}>Rs {o.amount}</td>
                    <td style={{ padding: '12px' }}>{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'payments':
        return (
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>💰 Payments</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden' }}>
              <thead style={{ background: '#f3f4f6' }}>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Customer</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Amount</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Method</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}>{p.customer}</td>
                    <td style={{ padding: '12px' }}>Rs {p.amount}</td>
                    <td style={{ padding: '12px' }}>{p.method}</td>
                    <td style={{ padding: '12px' }}>{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'sos':
        return (
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>🆘 SOS</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden' }}>
              <thead style={{ background: '#f3f4f6' }}>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left' }}>User</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Location</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {sosAlerts.map((s) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}>{s.user}</td>
                    <td style={{ padding: '12px' }}>{s.location}</td>
                    <td style={{ padding: '12px' }}>{s.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'referrals':
        return (
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>🔗 Referrals</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#4CAF50' }}>{stats.totalReferrals}</div>
                <div style={{ color: '#666' }}>Total Referrals</div>
              </div>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#4CAF50' }}>Rs 1,250</div>
                <div style={{ color: '#666' }}>Total Credits</div>
              </div>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#4CAF50' }}>32</div>
                <div style={{ color: '#666' }}>Active Codes</div>
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>📄 Documents</h2>
            <div style={{ background: '#fef9c3', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>⏳ Pending Verifications:</span> {stats.pendingVerifications}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <h3>👤 Customer Documents</h3>
                <p>License: ✅ 2</p>
                <p>Citizenship: ✅ 2</p>
              </div>
              <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <h3>🏪 Shop Documents</h3>
                <p>Registration: ✅ 1</p>
                <p>PAN: ⏳ 1</p>
              </div>
              <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <h3>🏍️ Bike Documents</h3>
                <p>Registration: ✅ 1</p>
                <p>Insurance: ⏳ 1</p>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div style={{ maxWidth: '500px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>👤 Admin Profile</h2>
            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#4CAF50', color: 'white', fontSize: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>P</div>
              <h3 style={{ marginTop: '12px' }}>Prajal Shah</h3>
              <p style={{ color: '#666' }}>Super Admin</p>
            </div>
            <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ color: '#666' }}>📧 Email</span>
                <span>admin@bikerental.com</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span style={{ color: '#666' }}>📞 Phone</span>
                <span>98XXXXXXXX</span>
              </div>
            </div>
          </div>
        );

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
    { id: 'documents', label: '📄 Documents' },
    { id: 'profile', label: '👤 Profile' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', gap: '20px' }}>
      {/* Sidebar */}
      <div style={{ 
        width: '220px', 
        background: '#1a1a2e', 
        color: 'white', 
        padding: '20px 0', 
        borderRadius: '12px',
        position: 'sticky',
        top: '20px',
        height: 'fit-content',
      }}>
        <h2 style={{ padding: '0 20px', marginBottom: '20px', fontSize: '20px' }}>👑 Admin</h2>
        {tabs.map((tab) => (
          <div 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              cursor: 'pointer',
              background: activeTab === tab.id ? '#4CAF50' : 'transparent',
              borderRadius: '8px',
              margin: '2px 10px',
              transition: '0.2s',
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '0 20px', overflowX: 'auto' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
