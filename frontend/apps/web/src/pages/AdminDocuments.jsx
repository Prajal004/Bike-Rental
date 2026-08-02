import React, { useState } from 'react';

const AdminDocuments = () => {
  const [activeTab, setActiveTab] = useState('customers');
  const [selectedDoc, setSelectedDoc] = useState(null);

  const customerDocs = [
    { id: 1, name: 'Ram K.', license: '✅', citizenship: '✅', status: 'Verified', licenseUrl: '/docs/ram-license.pdf', citizenshipUrl: '/docs/ram-citizenship.pdf' },
    { id: 2, name: 'Sita P.', license: '⏳', citizenship: '✅', status: 'Pending', licenseUrl: '/docs/sita-license.pdf', citizenshipUrl: '/docs/sita-citizenship.pdf' },
    { id: 3, name: 'Hari S.', license: '❌', citizenship: '⏳', status: 'Rejected', licenseUrl: '/docs/hari-license.pdf', citizenshipUrl: '/docs/hari-citizenship.pdf' },
  ];

  const shopDocs = [
    { id: 1, name: 'Prajal Bike Shop', registration: '✅', pan: '✅', status: 'Verified', regUrl: '/docs/prajal-reg.pdf', panUrl: '/docs/prajal-pan.pdf' },
    { id: 2, name: 'Honda Motors', registration: '⏳', pan: '❌', status: 'Pending', regUrl: '/docs/honda-reg.pdf', panUrl: '/docs/honda-pan.pdf' },
  ];

  const bikeDocs = [
    { id: 1, name: 'Honda CB Shine', registration: '✅', insurance: '✅', pollution: '✅', status: 'Verified', regUrl: '/docs/honda-reg.pdf', insuranceUrl: '/docs/honda-insurance.pdf' },
    { id: 2, name: 'Yamaha FZ', registration: '⏳', insurance: '❌', pollution: '⏳', status: 'Pending', regUrl: '/docs/yamaha-reg.pdf', insuranceUrl: '/docs/yamaha-insurance.pdf' },
  ];

  const handleApprove = (type, id) => {
    if (!window.confirm('Approve this document?')) return;
    if (type === 'customers') {
      // Approve
    } else if (type === 'shops') {
      // Approve
    } else if (type === 'bikes') {
      // Approve
    }
    alert('✅ Document approved!');
  };

  const handleReject = (type, id) => {
    if (!window.confirm('Reject this document?')) return;
    alert('❌ Document rejected!');
  };

  const handleView = (doc) => {
    alert(`📄 Viewing document: ${doc}\n(Functionality to be implemented with actual file viewer)`);
  };

  const renderTable = (data, type, docFields) => {
    const headers = ['Name', ...docFields.map(f => f.label), 'Status', 'Action'];

    return (
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
        <thead style={{ background: '#f5f5f5' }}>
          <tr>{headers.map(h => <th key={h} style={{ padding: '10px', textAlign: 'left' }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{item.name}</td>
              {docFields.map(f => (
                <td key={f.key} style={{ padding: '10px' }}>
                  <span style={{ cursor: 'pointer', color: '#4CAF50' }} onClick={() => handleView(item[f.urlKey])}>
                    {item[f.key]} 📄
                  </span>
                </td>
              ))}
              <td style={{ padding: '10px' }}>
                <span style={{ padding: '4px 8px', borderRadius: '4px', background: item.status === 'Verified' ? '#dcfce7' : item.status === 'Pending' ? '#fef3c7' : '#fee2e2' }}>
                  {item.status}
                </span>
              </td>
              <td style={{ padding: '10px' }}>
                <button onClick={() => handleView(item.name)} style={{ padding: '4px 12px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '4px' }}>👁️ View</button>
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
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>
        👁️ Click on document icon to view, then Approve or Reject
      </p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <button onClick={() => setActiveTab('customers')} style={{ padding: '8px 16px', background: activeTab === 'customers' ? '#4CAF50' : '#f5f5f5', color: activeTab === 'customers' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>👥 Customers</button>
        <button onClick={() => setActiveTab('shops')} style={{ padding: '8px 16px', background: activeTab === 'shops' ? '#4CAF50' : '#f5f5f5', color: activeTab === 'shops' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🏪 Shops</button>
        <button onClick={() => setActiveTab('bikes')} style={{ padding: '8px 16px', background: activeTab === 'bikes' ? '#4CAF50' : '#f5f5f5', color: activeTab === 'bikes' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🏍️ Bikes</button>
      </div>

      {activeTab === 'customers' && renderTable(customerDocs, 'customers', [
        { key: 'license', label: 'License', urlKey: 'licenseUrl' },
        { key: 'citizenship', label: 'Citizenship', urlKey: 'citizenshipUrl' }
      ])}
      {activeTab === 'shops' && renderTable(shopDocs, 'shops', [
        { key: 'registration', label: 'Registration', urlKey: 'regUrl' },
        { key: 'pan', label: 'PAN', urlKey: 'panUrl' }
      ])}
      {activeTab === 'bikes' && renderTable(bikeDocs, 'bikes', [
        { key: 'registration', label: 'Registration', urlKey: 'regUrl' },
        { key: 'insurance', label: 'Insurance', urlKey: 'insuranceUrl' },
        { key: 'pollution', label: 'Pollution', urlKey: 'pollutionUrl' }
      ])}
    </div>
  );
};

export default AdminDocuments;
