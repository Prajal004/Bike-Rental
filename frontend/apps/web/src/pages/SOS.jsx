import React, { useState } from 'react';

const SOS = () => {
  const [active, setActive] = useState(false);

  const triggerSOS = () => {
    setActive(true);
    alert('SOS triggered! Emergency contacts notified.');
  };

  const cancelSOS = () => {
    setActive(false);
    alert('SOS cancelled.');
  };

  return (
    <div>
      <h2>🆘 Emergency SOS</h2>
      {active ? (
        <div style={{ padding: '20px', background: '#dc2626', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
          <h3>🚨 SOS ACTIVE</h3>
          <p>Help is on the way!</p>
          <button onClick={cancelSOS} style={{ padding: '10px 20px', background: 'white', color: '#dc2626', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Cancel SOS
          </button>
        </div>
      ) : (
        <button onClick={triggerSOS} style={{ width: '100%', padding: '30px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', fontSize: '24px', fontWeight: 'bold', cursor: 'pointer' }}>
          🆘 TRIGGER SOS
        </button>
      )}
      <div style={{ marginTop: '20px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h4>Emergency Contacts</h4>
        <p>Add contacts to notify in emergency</p>
        <button style={{ padding: '8px 16px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          + Add Contact
        </button>
      </div>
    </div>
  );
};

export default SOS;
