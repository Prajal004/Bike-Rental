import React, { useState } from 'react';

const AdminSOS = () => {
  const [sosAlerts, setSosAlerts] = useState([
    { id: 1, user: 'Ram K.', location: 'Thamel', status: 'Active', time: '2 min ago' },
    { id: 2, user: 'Sita P.', location: 'Patan', status: 'Resolved', time: '1 hour ago' },
  ]);

  const handleResolve = (id) => {
    if (window.confirm('Resolve this SOS alert?')) {
      setSosAlerts(sosAlerts.map(s => s.id === id ? { ...s, status: 'Resolved' } : s));
      alert('SOS resolved!');
    }
  };

  return (
    <div>
      <h2>🆘 SOS Alerts</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
        <thead style={{ background: '#f5f5f5' }}>
          <tr>
            <th style={{ padding: '10px', textAlign: 'left' }}>User</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Location</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Time</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {sosAlerts.map((s) => (
            <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{s.user}</td>
              <td style={{ padding: '10px' }}>{s.location}</td>
              <td style={{ padding: '10px' }}><span style={{ padding: '4px 8px', borderRadius: '4px', background: s.status === 'Active' ? '#dc2626' : '#dcfce7', color: s.status === 'Active' ? 'white' : 'black' }}>{s.status}</span></td>
              <td style={{ padding: '10px' }}>{s.time}</td>
              <td style={{ padding: '10px' }}>
                {s.status === 'Active' && (
                  <button onClick={() => handleResolve(s.id)} style={{ padding: '4px 12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Resolve</button>
                )}
                {s.status === 'Resolved' && <span style={{ color: '#888' }}>✅ Resolved</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSOS;
