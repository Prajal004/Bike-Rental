import React, { useState } from 'react';
import DocumentViewer from '../components/DocumentViewer';

const AdminDocuments = () => {
  const [activeTab, setActiveTab] = useState('customers');
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  // ✅ Customer Documents with state
  const [customerDocs, setCustomerDocs] = useState([
    { id: 1, name: 'Ram K.', license: '✅', citizenship: '✅', status: 'Verified' },
    { id: 2, name: 'Sita P.', license: '⏳', citizenship: '✅', status: 'Pending' },
    { id: 3, name: 'Hari S.', license: '❌', citizenship: '⏳', status: 'Rejected' },
  ]);

  // ✅ Shop Documents with state
  const [shopDocs, setShopDocs] = useState([
    { id: 1, name: 'Prajal Bike Shop', registration: '✅', pan: '✅', status: 'Verified' },
    { id: 2, name: 'Honda Motors', registration: '⏳', pan: '❌', status: 'Pending' },
  ]);

  // ✅ Bike Documents with state
  const [bikeDocs, setBikeDocs] = useState([
    { id: 1, name: 'Honda CB Shine', registration: '✅', insurance: '✅', pollution: '✅', status: 'Verified' },
    { id: 2, name: 'Yamaha FZ', registration: '⏳', insurance: '❌', pollution: '⏳', status: 'Pending' },
  ]);

  const handleView = (doc) => {
    setSelectedDoc(doc);
    setViewerOpen(true);
  };

  // ✅ Approve function - Real status change
  const handleApprove = (type, id) => {
    if (!window.confirm('✅ Approve this document?')) return;
    
    if (type === 'customer') {
      setCustomerDocs(customerDocs.map(doc => 
        doc.id === id ? { ...doc, status: 'Verified', license: '✅', citizenship: '✅' } : doc
      ));
    } else if (type === 'shop') {
      setShopDocs(shopDocs.map(doc => 
        doc.id === id ? { ...doc, status: 'Verified', registration: '✅', pan: '✅' } : doc
      ));
    } else if (type === 'bike') {
      setBikeDocs(bikeDocs.map(doc => 
        doc.id === id ? { ...doc, status: 'Verified', registration: '✅', insurance: '✅', pollution: '✅' } : doc
      ));
    }
    alert('✅ Document approved and verified!');
  };

  // ✅ Reject function
  const handleReject = (type, id) => {
    if (!window.confirm('❌ Reject this document?')) return;
    
    if (type === 'customer') {
      setCustomerDocs(customerDocs.map(doc => 
        doc.id === id ? { ...doc, status: 'Rejected', license: '❌', citizenship: '❌' } : doc
      ));
    } else if (type === 'shop') {
      setShopDocs(shopDocs.map(doc => 
        doc.id === id ? { ...doc, status: 'Rejected', registration: '❌', pan: '❌' } : doc
      ));
    } else if (type === 'bike') {
      setBikeDocs(bikeDocs.map(doc => 
        doc.id === id ? { ...doc, status: 'Rejected', registration: '❌', insurance: '❌', pollution: '❌' } : doc
      ));
    }
    alert('❌ Document rejected!');
  };

  // ✅ Render Customer Table
  const renderCustomerTable = () => {
    return (
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
        <thead style={{ background: '#f5f5f5' }}>
          <tr>
            <th style={{ padding: '10px', textAlign: 'left' }}>Customer</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>License</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Citizenship</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {customerDocs.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{item.name}</td>
              <td style={{ padding: '10px' }}>
                <span style={{ cursor: 'pointer', color: '#2196F3' }} onClick={() => handleView(item.license)}>
                  {item.license} 📄
                </span>
              </td>
              <td style={{ padding: '10px' }}>
                <span style={{ cursor: 'pointer', color: '#2196F3' }} onClick={() => handleView(item.citizenship)}>
                  {item.citizenship} 📄
                </span>
              </td>
              <td style={{ padding: '10px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  background: item.status === 'Verified' ? '#dcfce7' : 
                             item.status === 'Pending' ? '#fef3c7' : '#fee2e2',
                  color: item.status === 'Verified' ? '#166534' : 
                         item.status === 'Pending' ? '#92400e' : '#991b1b',
                  fontWeight: 'bold',
                }}>
                  {item.status === 'Verified' ? '✅ Verified' : 
                   item.status === 'Pending' ? '⏳ Pending' : '❌ Rejected'}
                </span>
              </td>
              <td style={{ padding: '10px' }}>
                {item.status === 'Pending' && (
                  <>
                    <button onClick={() => handleApprove('customer', item.id)} style={{ padding: '4px 12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '4px' }}>✅ Approve</button>
                    <button onClick={() => handleReject('customer', item.id)} style={{ padding: '4px 12px', background: '#E53935', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>❌ Reject</button>
                  </>
                )}
                {item.status === 'Verified' && <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>✅ Verified</span>}
                {item.status === 'Rejected' && <span style={{ color: '#E53935', fontWeight: 'bold' }}>❌ Rejected</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // ✅ Render Shop Table
  const renderShopTable = () => {
    return (
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
        <thead style={{ background: '#f5f5f5' }}>
          <tr>
            <th style={{ padding: '10px', textAlign: 'left' }}>Shop</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Registration</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>PAN</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {shopDocs.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{item.name}</td>
              <td style={{ padding: '10px' }}>
                <span style={{ cursor: 'pointer', color: '#2196F3' }} onClick={() => handleView(item.registration)}>
                  {item.registration} 📄
                </span>
              </td>
              <td style={{ padding: '10px' }}>
                <span style={{ cursor: 'pointer', color: '#2196F3' }} onClick={() => handleView(item.pan)}>
                  {item.pan} 📄
                </span>
              </td>
              <td style={{ padding: '10px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  background: item.status === 'Verified' ? '#dcfce7' : 
                             item.status === 'Pending' ? '#fef3c7' : '#fee2e2',
                  color: item.status === 'Verified' ? '#166534' : 
                         item.status === 'Pending' ? '#92400e' : '#991b1b',
                  fontWeight: 'bold',
                }}>
                  {item.status === 'Verified' ? '✅ Verified' : 
                   item.status === 'Pending' ? '⏳ Pending' : '❌ Rejected'}
                </span>
              </td>
              <td style={{ padding: '10px' }}>
                {item.status === 'Pending' && (
                  <>
                    <button onClick={() => handleApprove('shop', item.id)} style={{ padding: '4px 12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '4px' }}>✅ Approve</button>
                    <button onClick={() => handleReject('shop', item.id)} style={{ padding: '4px 12px', background: '#E53935', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>❌ Reject</button>
                  </>
                )}
                {item.status === 'Verified' && <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>✅ Verified</span>}
                {item.status === 'Rejected' && <span style={{ color: '#E53935', fontWeight: 'bold' }}>❌ Rejected</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // ✅ Render Bike Table
  const renderBikeTable = () => {
    return (
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
        <thead style={{ background: '#f5f5f5' }}>
          <tr>
            <th style={{ padding: '10px', textAlign: 'left' }}>Bike</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Registration</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Insurance</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Pollution</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {bikeDocs.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{item.name}</td>
              <td style={{ padding: '10px' }}>
                <span style={{ cursor: 'pointer', color: '#2196F3' }} onClick={() => handleView(item.registration)}>
                  {item.registration} 📄
                </span>
              </td>
              <td style={{ padding: '10px' }}>
                <span style={{ cursor: 'pointer', color: '#2196F3' }} onClick={() => handleView(item.insurance)}>
                  {item.insurance} 📄
                </span>
              </td>
              <td style={{ padding: '10px' }}>
                <span style={{ cursor: 'pointer', color: '#2196F3' }} onClick={() => handleView(item.pollution)}>
                  {item.pollution} 📄
                </span>
              </td>
              <td style={{ padding: '10px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  background: item.status === 'Verified' ? '#dcfce7' : 
                             item.status === 'Pending' ? '#fef3c7' : '#fee2e2',
                  color: item.status === 'Verified' ? '#166534' : 
                         item.status === 'Pending' ? '#92400e' : '#991b1b',
                  fontWeight: 'bold',
                }}>
                  {item.status === 'Verified' ? '✅ Verified' : 
                   item.status === 'Pending' ? '⏳ Pending' : '❌ Rejected'}
                </span>
              </td>
              <td style={{ padding: '10px' }}>
                {item.status === 'Pending' && (
                  <>
                    <button onClick={() => handleApprove('bike', item.id)} style={{ padding: '4px 12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '4px' }}>✅ Approve</button>
                    <button onClick={() => handleReject('bike', item.id)} style={{ padding: '4px 12px', background: '#E53935', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>❌ Reject</button>
                  </>
                )}
                {item.status === 'Verified' && <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>✅ Verified</span>}
                {item.status === 'Rejected' && <span style={{ color: '#E53935', fontWeight: 'bold' }}>❌ Rejected</span>}
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
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>
        👁️ Click on document link to view • Approve or Reject
      </p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <button onClick={() => setActiveTab('customers')} style={{ padding: '8px 16px', background: activeTab === 'customers' ? '#4CAF50' : '#f5f5f5', color: activeTab === 'customers' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          👤 Customer Documents
        </button>
        <button onClick={() => setActiveTab('shops')} style={{ padding: '8px 16px', background: activeTab === 'shops' ? '#4CAF50' : '#f5f5f5', color: activeTab === 'shops' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          🏪 Shop Documents
        </button>
        <button onClick={() => setActiveTab('bikes')} style={{ padding: '8px 16px', background: activeTab === 'bikes' ? '#4CAF50' : '#f5f5f5', color: activeTab === 'bikes' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          🏍️ Bike Documents
        </button>
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
