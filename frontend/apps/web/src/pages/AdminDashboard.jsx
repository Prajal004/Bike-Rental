import React, { useState } from 'react';
import AdminDocuments from './AdminDocuments';
import AdminPayments from './AdminPayments';
import AdminSOS from './AdminSOS';
import AdminReviews from './AdminReviews';
import AdminEdit from './AdminEdit';
import AdminProfile from './AdminProfile';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingItem, setEditingItem] = useState(null);

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

  const [customers, setCustomers] = useState([
    { id: 1, name: 'Ram K.', email: 'ram@email.com', phone: '98XXXXXXXX', verified: true, documents: '✅' },
    { id: 2, name: 'Sita P.', email: 'sita@email.com', phone: '98XXXXXXXX', verified: false, documents: '⏳' },
  ]);

  const [shops, setShops] = useState([
    { id: 1, shopName: 'Prajal Bike Shop', address: 'Thamel', verified: true, documents: '✅' },
    { id: 2, shopName: 'Honda Motors', address: 'Patan', verified: false, documents: '⏳' },
  ]);

  const [bikes, setBikes] = useState([
    { id: 1, name: 'Honda CB Shine', shop: 'Prajal Bike Shop', verified: true, documents: '✅' },
    { id: 2, name: 'Yamaha FZ', shop: 'Yamaha Center', verified: false, documents: '⏳' },
  ]);

  const [orders, setOrders] = useState([
    { id: 1, customer: 'Ram K.', bike: 'Honda CB Shine', amount: 350, status: 'Completed' },
    { id: 2, customer: 'Sita P.', bike: 'Yamaha FZ', amount: 400, status: 'Pending' },
  ]);

  const handleEdit = (type, item) => {
    setEditingItem({ type, data: item });
  };

  const handleSave = (updatedData) => {
    if (editingItem.type === 'customer') {
      setCustomers(customers.map(c => c.id === editingItem.data.id ? { ...c, ...updatedData } : c));
    } else if (editingItem.type === 'shop') {
      setShops(shops.map(s => s.id === editingItem.data.id ? { ...s, ...updatedData } : s));
    } else if (editingItem.type === 'bike') {
      setBikes(bikes.map(b => b.id === editingItem.data.id ? { ...b, ...updatedData } : b));
    }
    setEditingItem(null);
  };

  const handleUpdateStatus = (id) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: o.status === 'Completed' ? 'Pending' : 'Completed' } : o));
    alert('Order status updated!');
  };

  const renderContent = () => {
    if (editingItem) {
      return <AdminEdit type={editingItem.type} data={editingItem.data} onSave={handleSave} />;
    }

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
              <thead><tr><th style={{ padding: '10px' }}>Name</th><th style={{ padding: '10px' }}>Email</th><th style={{ padding: '10px' }}>Phone</th><th style={{ padding: '10px' }}>Verified</th><th style={{ padding: '10px' }}>Documents</th><th style={{ padding: '10px' }}>Action</th></tr></thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id}><td style={{ padding: '10px' }}>{c.name}</td><td style={{ padding: '10px' }}>{c.email}</td><td style={{ padding: '10px' }}>{c.phone}</td><td style={{ padding: '10px' }}>{c.verified ? '✅' : '⏳'}</td><td style={{ padding: '10px' }}>{c.documents}</td><td style={{ padding: '10px' }}><button onClick={() => handleEdit('customer', c)} style={{ padding: '4px 12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>✏️ Edit</button></td></tr>
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
              <thead><tr><th style={{ padding: '10px' }}>Name</th><th style={{ padding: '10px' }}>Address</th><th style={{ padding: '10px' }}>Verified</th><th style={{ padding: '10px' }}>Documents</th><th style={{ padding: '10px' }}>Action</th></tr></thead>
              <tbody>
                {shops.map((s) => (
                  <tr key={s.id}><td style={{ padding: '10px' }}>{s.shopName}</td><td style={{ padding: '10px' }}>{s.address}</td><td style={{ padding: '10px' }}>{s.verified ? '✅' : '⏳'}</td><td style={{ padding: '10px' }}>{s.documents}</td><td style={{ padding: '10px' }}><button onClick={() => handleEdit('shop', s)} style={{ padding: '4px 12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>✏️ Edit</button></td></tr>
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
              <thead><tr><th style={{ padding: '10px' }}>Name</th><th style={{ padding: '10px' }}>Shop</th><th style={{ padding: '10px' }}>Verified</th><th style={{ padding: '10px' }}>Documents</th><th style={{ padding: '10px' }}>Action</th></tr></thead>
              <tbody>
                {bikes.map((b) => (
                  <tr key={b.id}><td style={{ padding: '10px' }}>{b.name}</td><td style={{ padding: '10px' }}>{b.shop}</td><td style={{ padding: '10px' }}>{b.verified ? '✅' : '⏳'}</td><td style={{ padding: '10px' }}>{b.documents}</td><td style={{ padding: '10px' }}><button onClick={() => handleEdit('bike', b)} style={{ padding: '4px 12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>✏️ Edit</button></td></tr>
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
              <thead><tr><th style={{ padding: '10px' }}>Customer</th><th style={{ padding: '10px' }}>Bike</th><th style={{ padding: '10px' }}>Amount</th><th style={{ padding: '10px' }}>Status</th><th style={{ padding: '10px' }}>Action</th></tr></thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}><td style={{ padding: '10px' }}>{o.customer}</td><td style={{ padding: '10px' }}>{o.bike}</td><td style={{ padding: '10px' }}>Rs {o.amount}</td><td style={{ padding: '10px' }}><span style={{ padding: '4px 8px', borderRadius: '4px', background: o.status === 'Completed' ? '#dcfce7' : '#fef3c7' }}>{o.status}</span></td><td style={{ padding: '10px' }}><button onClick={() => handleUpdateStatus(o.id)} style={{ padding: '4px 12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Update Status</button></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'payments':
        return <AdminPayments />;

      case 'sos':
        return <AdminSOS />;

      case 'referrals':
        return (
          <div>
            <h3>🔗 Referrals</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
              <thead><tr><th style={{ padding: '10px' }}>User</th><th style={{ padding: '10px' }}>Code</th><th style={{ padding: '10px' }}>Earned</th></tr></thead>
              <tbody>
                {[{ id: 1, user: 'Ram K.', code: 'BIKE123', earned: 150 }, { id: 2, user: 'Sita P.', code: 'RIDE456', earned: 100 }].map((r) => (
                  <tr key={r.id}><td style={{ padding: '10px' }}>{r.user}</td><td style={{ padding: '10px' }}>{r.code}</td><td style={{ padding: '10px' }}>Rs {r.earned}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'documents':
        return <AdminDocuments />;

      case 'reviews':
        return <AdminReviews />;

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
    { id: 'documents', label: '📄 Documents' },
    { id: 'reviews', label: '⭐ Reviews' },
    { id: 'profile', label: '👤 Profile' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '80vh', gap: '16px' }}>
      <div style={{ width: '200px', background: '#1a1a2e', color: 'white', padding: '16px 0', borderRadius: '8px', flexShrink: 0 }}>
        <h3 style={{ padding: '0 16px', marginBottom: '16px', fontSize: '18px' }}>👑 Admin</h3>
        {tabs.map((tab) => (
          <div key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '10px 16px', cursor: 'pointer', background: activeTab === tab.id ? '#4CAF50' : 'transparent', borderRadius: '4px', margin: '2px 8px' }}>
            {tab.label}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: '0 20px', overflowX: 'auto' }}>{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
