import React, { useState } from 'react';

const AdminCustomers = () => {
  const [filter, setFilter] = useState('all');
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Ram K.', email: 'ram@email.com', phone: '98XXXXXXXX', role: 'customer', verified: true },
    { id: 2, name: 'Sita P.', email: 'sita@email.com', phone: '98XXXXXXXX', role: 'customer', verified: false },
    { id: 3, name: 'Hari S.', email: 'hari@email.com', phone: '98XXXXXXXX', role: 'shop_owner', verified: true },
    { id: 4, name: 'Gita R.', email: 'gita@email.com', phone: '98XXXXXXXX', role: 'customer', verified: false },
    { id: 5, name: 'Admin User', email: 'admin@email.com', phone: '98XXXXXXXX', role: 'admin', verified: true },
  ]);

  const handleDelete = (id, role) => {
    // ✅ Admin role delete nagarne
    if (role === 'admin') {
      alert('❌ Cannot delete Admin user!');
      return;
    }
    if (window.confirm('Delete this user? This action cannot be undone!')) {
      setCustomers(customers.filter(c => c.id !== id));
      alert('✅ User deleted successfully!');
    }
  };

  const handleView = (customer) => {
    alert(`�� User Details:\nName: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nRole: ${customer.role}\nVerified: ${customer.verified ? '✅' : '❌'}`);
  };

  // ✅ Filter logic
  const getFilteredCustomers = () => {
    if (filter === 'all') return customers;
    if (filter === 'customer') return customers.filter(c => c.role === 'customer');
    if (filter === 'shop_owner') return customers.filter(c => c.role === 'shop_owner');
    if (filter === 'admin') return customers.filter(c => c.role === 'admin');
    return customers;
  };

  const filteredCustomers = getFilteredCustomers();

  return (
    <div>
      <h2>👥 All Users</h2>

      {/* ✅ Filter buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <button onClick={() => setFilter('all')} style={{ padding: '6px 16px', background: filter === 'all' ? '#4CAF50' : '#f0f0f0', color: filter === 'all' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>All</button>
        <button onClick={() => setFilter('customer')} style={{ padding: '6px 16px', background: filter === 'customer' ? '#4CAF50' : '#f0f0f0', color: filter === 'customer' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>👤 Customers</button>
        <button onClick={() => setFilter('shop_owner')} style={{ padding: '6px 16px', background: filter === 'shop_owner' ? '#4CAF50' : '#f0f0f0', color: filter === 'shop_owner' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🏪 Shop Owners</button>
        <button onClick={() => setFilter('admin')} style={{ padding: '6px 16px', background: filter === 'admin' ? '#4CAF50' : '#f0f0f0', color: filter === 'admin' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>👑 Admins</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
        <thead style={{ background: '#f5f5f5' }}>
          <tr>
            <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Phone</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Role</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Verified</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length === 0 ? (
            <tr><td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>No users found</td></tr>
          ) : (
            filteredCustomers.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{c.name}</td>
                <td style={{ padding: '10px' }}>{c.email}</td>
                <td style={{ padding: '10px' }}>{c.phone}</td>
                <td style={{ padding: '10px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '4px', background: c.role === 'admin' ? '#ede9fe' : c.role === 'shop_owner' ? '#fef3c7' : '#dbeafe' }}>
                    {c.role}
                  </span>
                </td>
                <td style={{ padding: '10px' }}>{c.verified ? '✅' : '⏳'}</td>
                <td style={{ padding: '10px' }}>
                  <button onClick={() => handleView(c)} style={{ padding: '4px 12px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '4px' }}>👁️ View</button>
                  {c.role !== 'admin' && (
                    <button onClick={() => handleDelete(c.id, c.role)} style={{ padding: '4px 12px', background: '#E53935', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🗑️ Delete</button>
                  )}
                  {c.role === 'admin' && (
                    <span style={{ color: '#888', fontSize: '12px' }}>🔒 Protected</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={{ marginTop: '16px', padding: '12px', background: '#f5f5f5', borderRadius: '8px', fontSize: '14px', color: '#888' }}>
        🔒 Admin users cannot be deleted
      </div>
    </div>
  );
};

export default AdminCustomers;
