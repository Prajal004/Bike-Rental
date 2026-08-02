import React, { useState } from 'react';

const AdminDocuments = () => {
  const [activeTab, setActiveTab] = useState('customers');
  const [customerDocs, setCustomerDocs] = useState([
    { id: 1, name: 'Ram K.', license: '✅', citizenship: '✅', status: 'Verified' },
    { id: 2, name: 'Sita P.', license: '⏳', citizenship: '✅', status: 'Pending' },
    { id: 3, name: 'Hari S.', license: '❌', citizenship: '⏳', status: 'Rejected' },
  ]);

  const [shopDocs, setShopDocs] = useState([
    { id: 1, name: 'Prajal Bike Shop', registration: '✅', pan: '✅', status: 'Verified' },
    { id: 2, name: 'Honda Motors', registration: '⏳', pan: '❌', status: 'Pending' },
  ]);

  const [bikeDocs, setBikeDocs] = useState([
    { id: 1, name: 'Honda CB Shine', registration: '✅', insurance: '✅', pollution: '✅', status: 'Verified' },
    { id: 2, name: 'Yamaha FZ', registration: '⏳', insurance: '❌', pollution: '⏳', status: 'Pending' },
  ]);

  const handleApprove = (type, id) => {
    if (type === 'customers') {
      setCustomerDocs(customerDocs.map(doc => 
        doc.id === id ? { ...doc, status: 'Verified', license: '✅', citizenship: '✅' } : doc
      ));
    } else if (type === 'shops') {
      setShopDocs(shopDocs.map(doc => 
        doc.id === id ? { ...doc, status: 'Verified', registration: '✅', pan: '✅' } : doc
      ));
    } else if (type === 'bikes') {
      setBikeDocs(bikeDocs.map(doc => 
        doc.id === id ? { ...doc, status: 'Verified', registration: '✅', insurance: '✅', pollution: '✅' } : doc
      ));
    }
    alert('Document approved!');
  };

  const handleReject = (type, id) => {
    if (type === 'customers') {
      setCustomerDocs(customerDocs.map(doc => 
        doc.id === id ? { ...doc, status: 'Rejected', license: '❌', citizenship: '❌' } : doc
      ));
    } else if (type === 'shops') {
      setShopDocs(shopDocs.map(doc => 
        doc.id === id ? { ...doc, status: 'Rejected', registration: '❌', pan: '❌' } : doc
      ));
    } else if (type === 'bikes') {
      setBikeDocs(bikeDocs.map(doc => 
        doc.id === id ? { ...doc, status: 'Rejected', registration: '❌', insurance: '❌', pollution: '❌' } : doc
      ));
    }
    alert('Document rejected!');
  };

  const renderTable = (data, type) => {
    const headers = type === 'customers' ? ['Name', 'License', 'Citizenship', 'Status', 'Action'] :
                    type === 'shops' ? ['Name', 'Registration', 'PAN', 'Status', 'Action'] :
                    ['Name', 'Registration', 'Insurance', 'Pollution', 'Status', 'Action'];

    return (
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
        <thead style={{ background: '#f5f5f5' }}>
          <tr>{headers.map(h => <th key={h} style={{ padding: '10px', textAlign: 'left' }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{item.name}</td>
              {Object.keys(item).filter(k => k !== 'id' && k !== 'name' && k !== 'status').map(key => (
                <td key={key} style={{ padding: '10px' }}>{item[key]}</td>
              ))}
              <td style={{ padding: '10px' }}><span style={{ padding: '4px 8px', borderRadius: '4px', background: item.status === 'Verified' ? '#dcfce7' : item.status === 'Pending' ? '#fef3c7' : '#fee2e2' }}>{item.status}</span></td>
              <td style={{ padding: '10px' }}>
                <button onClick={() => handleApprove(type, item.id)} style={{ padding: '4px 12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '4px' }}>✅ Approve</button>
                <button onClick={() => handleReject(type, item.id)} style={{ padding: '4px 12px', background: '#E53935', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>❌ Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>📄 Document Verification</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <button onClick={() => setActiveTab('customers')} style={{ padding: '8px 16px', background: activeTab === 'customers' ? '#4CAF50' : '#f5f5f5', color: activeTab === 'customers' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>👥 Customers</button>
        <button onClick={() => setActiveTab('shops')} style={{ padding: '8px 16px', background: activeTab === 'shops' ? '#4CAF50' : '#f5f5f5', color: activeTab === 'shops' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🏪 Shops</button>
        <button onClick={() => setActiveTab('bikes')} style={{ padding: '8px 16px', background: activeTab === 'bikes' ? '#4CAF50' : '#f5f5f5', color: activeTab === 'bikes' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🏍️ Bikes</button>
      </div>
      {activeTab === 'customers' && renderTable(customerDocs, 'customers')}
      {activeTab === 'shops' && renderTable(shopDocs, 'shops')}
      {activeTab === 'bikes' && renderTable(bikeDocs, 'bikes')}
    </div>
  );
};

export default AdminDocuments;
