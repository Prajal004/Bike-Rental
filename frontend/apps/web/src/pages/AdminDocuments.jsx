import React, { useState } from 'react';
import DocumentViewer from '../components/DocumentViewer';

const AdminDocuments = () => {
  const [activeTab, setActiveTab] = useState('customers');
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const [customerDocs, setCustomerDocs] = useState([
    { id: 1, name: 'Ram K.', license: '✅', citizenship: '✅', status: 'Verified' },
    { id: 2, name: 'Sita P.', license: '✅', citizenship: '✅', status: 'Pending' },
    { id: 3, name: 'Hari S.', license: '❌', citizenship: '❌', status: 'Rejected' },
  ]);

  const [shopDocs, setShopDocs] = useState([
    { id: 1, name: 'Prajal Bike Shop', registration: '✅', pan: '✅', status: 'Verified' },
    { id: 2, name: 'Honda Motors', registration: '✅', pan: '✅', status: 'Pending' },
  ]);

  const [bikeDocs, setBikeDocs] = useState([
    { id: 1, name: 'Honda CB Shine', registration: '✅', insurance: '✅', pollution: '✅', status: 'Verified' },
    { id: 2, name: 'Yamaha FZ', registration: '✅', insurance: '✅', pollution: '✅', status: 'Pending' },
  ]);

  const handleView = (doc) => {
    setSelectedDoc(doc);
    setViewerOpen(true);
  };

  const handleApprove = (type, id) => {
    if (!window.confirm('Approve this document?')) return;
    
    if (type === 'customer') {
      const updated = customerDocs.map(doc => 
        doc.id === id ? { ...doc, status: 'Verified', license: '✅', citizenship: '✅' } : doc
      );
      setCustomerDocs(updated);
    } else if (type === 'shop') {
      const updated = shopDocs.map(doc => 
        doc.id === id ? { ...doc, status: 'Verified', registration: '✅', pan: '✅' } : doc
      );
      setShopDocs(updated);
    } else if (type === 'bike') {
      const updated = bikeDocs.map(doc => 
        doc.id === id ? { ...doc, status: 'Verified', registration: '✅', insurance: '✅', pollution: '✅' } : doc
      );
      setBikeDocs(updated);
    }
    alert('✅ Document approved!');
  };

  const handleReject = (type, id) => {
    if (!window.confirm('Reject this document?')) return;
    
    if (type === 'customer') {
      const updated = customerDocs.map(doc => 
        doc.id === id ? { ...doc, status: 'Rejected', license: '❌', citizenship: '❌' } : doc
      );
      setCustomerDocs(updated);
    } else if (type === 'shop') {
      const updated = shopDocs.map(doc => 
        doc.id === id ? { ...doc, status: 'Rejected', registration: '❌', pan: '❌' } : doc
      );
      setShopDocs(updated);
    } else if (type === 'bike') {
      const updated = bikeDocs.map(doc => 
        doc.id === id ? { ...doc, status: 'Rejected', registration: '❌', insurance: '❌', pollution: '❌' } : doc
      );
      setBikeDocs(updated);
    }
    alert('❌ Document rejected!');
  };

  const renderCustomerTable = () => (
    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
      <thead style={{ background: '#f5f5f5' }}>
        <tr>
          <th style={{ padding: '10px' }}>Customer</th>
          <th style={{ padding: '10px' }}>License</th>
          <th style={{ padding: '10px' }}>Citizenship</th>
          <th style={{ padding: '10px' }}>Status</th>
          <th style={{ padding: '10px' }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {customerDocs.map((item) => (
          <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '10px' }}>{item.name}</td>
            <td style={{ padding: '10px' }}>
              <span style={{ cursor: 'pointer', color: '#2196F3', textDecoration: 'underline' }} onClick={() => handleView(item.license)}>
                {item.license} 📄
              </span>
            </td>
            <td style={{ padding: '10px' }}>
              <span style={{ cursor: 'pointer', color: '#2196F3', textDecoration: 'underline' }} onClick={() => handleView(item.citizenship)}>
                {item.citizenship} 📄
              </span>
            </td>
            <td style={{ padding: '10px' }}>
              <span style={{ 
                padding: '4px 12px', 
                borderRadius: '12px',
                background: item.status === 'Verified' ? '#dcfce7' : item.status === 'Pending' ? '#fef3c7' : '#fee2e2',
                color: item.status === 'Verified' ? '#166534' : item.status === 'Pending' ? '#92400e' : '#991b1b',
                fontWeight: 'bold',
                fontSize: '13px',
              }}>
                {item.status}
              </span>
            </td>
            <td style={{ padding: '10px' }}>
              {item.status === 'Verified' ? (
                <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>✅ Verified</span>
              ) : (
                <>
                  <button onClick={() => handleApprove('customer', item.id)} style={{ padding: '6px 14px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginRight: '6px', fontWeight: 'bold' }}>✅ Approve</button>
                  <button onClick={() => handleReject('customer', item.id)} style={{ padding: '6px 14px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>❌ Reject</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderShopTable = () => (
    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
      <thead style={{ background: '#f5f5f5' }}>
        <tr>
          <th style={{ padding: '10px' }}>Shop</th>
          <th style={{ padding: '10px' }}>Registration</th>
          <th style={{ padding: '10px' }}>PAN</th>
          <th style={{ padding: '10px' }}>Status</th>
          <th style={{ padding: '10px' }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {shopDocs.map((item) => (
          <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '10px' }}>{item.name}</td>
            <td style={{ padding: '10px' }}>
              <span style={{ cursor: 'pointer', color: '#2196F3', textDecoration: 'underline' }} onClick={() => handleView(item.registration)}>
                {item.registration} 📄
              </span>
            </td>
            <td style={{ padding: '10px' }}>
              <span style={{ cursor: 'pointer', color: '#2196F3', textDecoration: 'underline' }} onClick={() => handleView(item.pan)}>
                {item.pan} 📄
              </span>
            </td>
            <td style={{ padding: '10px' }}>
              <span style={{ 
                padding: '4px 12px', 
                borderRadius: '12px',
                background: item.status === 'Verified' ? '#dcfce7' : item.status === 'Pending' ? '#fef3c7' : '#fee2e2',
                color: item.status === 'Verified' ? '#166534' : item.status === 'Pending' ? '#92400e' : '#991b1b',
                fontWeight: 'bold',
                fontSize: '13px',
              }}>
                {item.status}
              </span>
            </td>
            <td style={{ padding: '10px' }}>
              {item.status === 'Verified' ? (
                <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>✅ Verified</span>
              ) : (
                <>
                  <button onClick={() => handleApprove('shop', item.id)} style={{ padding: '6px 14px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginRight: '6px', fontWeight: 'bold' }}>✅ Approve</button>
                  <button onClick={() => handleReject('shop', item.id)} style={{ padding: '6px 14px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>❌ Reject</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderBikeTable = () => (
    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
      <thead style={{ background: '#f5f5f5' }}>
        <tr>
          <th style={{ padding: '10px' }}>Bike</th>
          <th style={{ padding: '10px' }}>Registration</th>
          <th style={{ padding: '10px' }}>Insurance</th>
          <th style={{ padding: '10px' }}>Pollution</th>
          <th style={{ padding: '10px' }}>Status</th>
          <th style={{ padding: '10px' }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {bikeDocs.map((item) => (
          <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '10px' }}>{item.name}</td>
            <td style={{ padding: '10px' }}>
              <span style={{ cursor: 'pointer', color: '#2196F3', textDecoration: 'underline' }} onClick={() => handleView(item.registration)}>
                {item.registration} 📄
              </span>
            </td>
            <td style={{ padding: '10px' }}>
              <span style={{ cursor: 'pointer', color: '#2196F3', textDecoration: 'underline' }} onClick={() => handleView(item.insurance)}>
                {item.insurance} 📄
              </span>
            </td>
            <td style={{ padding: '10px' }}>
              <span style={{ cursor: 'pointer', color: '#2196F3', textDecoration: 'underline' }} onClick={() => handleView(item.pollution)}>
                {item.pollution} 📄
              </span>
            </td>
            <td style={{ padding: '10px' }}>
              <span style={{ 
                padding: '4px 12px', 
                borderRadius: '12px',
                background: item.status === 'Verified' ? '#dcfce7' : item.status === 'Pending' ? '#fef3c7' : '#fee2e2',
                color: item.status === 'Verified' ? '#166534' : item.status === 'Pending' ? '#92400e' : '#991b1b',
                fontWeight: 'bold',
                fontSize: '13px',
              }}>
                {item.status}
              </span>
            </td>
            <td style={{ padding: '10px' }}>
              {item.status === 'Verified' ? (
                <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>✅ Verified</span>
              ) : (
                <>
                  <button onClick={() => handleApprove('bike', item.id)} style={{ padding: '6px 14px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginRight: '6px', fontWeight: 'bold' }}>✅ Approve</button>
                  <button onClick={() => handleReject('bike', item.id)} style={{ padding: '6px 14px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>❌ Reject</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ margin: 0 }}>📄 Document Verification</h2>
        <button 
          onClick={() => {
            if (!window.confirm('Reset all documents to pending?')) return;
            setCustomerDocs(customerDocs.map(doc => ({ ...doc, status: 'Pending', license: '⏳', citizenship: '⏳' })));
            setShopDocs(shopDocs.map(doc => ({ ...doc, status: 'Pending', registration: '⏳', pan: '⏳' })));
            setBikeDocs(bikeDocs.map(doc => ({ ...doc, status: 'Pending', registration: '⏳', insurance: '⏳', pollution: '⏳' })));
            alert('🔄 All documents reset to pending!');
          }}
          style={{ 
            padding: '6px 16px', 
            background: '#f59e0b', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          🔄 Reset All
        </button>
      </div>
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>
        👁️ Click on document link to view • Approve or Reject
      </p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <button onClick={() => setActiveTab('customers')} style={{ padding: '8px 16px', background: activeTab === 'customers' ? '#4CAF50' : '#f5f5f5', color: activeTab === 'customers' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>👤 Customer Documents</button>
        <button onClick={() => setActiveTab('shops')} style={{ padding: '8px 16px', background: activeTab === 'shops' ? '#4CAF50' : '#f5f5f5', color: activeTab === 'shops' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🏪 Shop Documents</button>
        <button onClick={() => setActiveTab('bikes')} style={{ padding: '8px 16px', background: activeTab === 'bikes' ? '#4CAF50' : '#f5f5f5', color: activeTab === 'bikes' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🏍️ Bike Documents</button>
      </div>

      {activeTab === 'customers' && renderCustomerTable()}
      {activeTab === 'shops' && renderShopTable()}
      {activeTab === 'bikes' && renderBikeTable()}

      <DocumentViewer
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        document={selectedDoc}
        title={selectedDoc}
      />
    </div>
  );
};

export default AdminDocuments;
