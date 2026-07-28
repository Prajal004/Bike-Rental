import React, { useState, useEffect } from 'react';
import { sosAPI } from '@rental/shared/api';
import { useAuth } from '../components/context/AuthContext';

const SOS = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeSOS, setActiveSOS] = useState(null);
  const [contacts, setContacts] = useState([
    { name: '', phone: '', relation: '' },
  ]);

  useEffect(() => {
    checkActiveSOS();
  }, []);

  const checkActiveSOS = async () => {
    try {
      const response = await sosAPI.getActive();
      if (response.success && response.data.hasActiveSOS) {
        setActiveSOS(response.data.sos);
      }
    } catch (error) {
      console.error('Error checking SOS:', error);
    }
  };

  const triggerSOS = async () => {
    if (!navigator.geolocation) {
      alert('Location not supported');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await sosAPI.trigger({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Current Location',
          });
          if (response.success) {
            setActiveSOS(response.data);
            alert('SOS triggered! Emergency contacts notified.');
          }
        } catch (error) {
          alert('Failed to trigger SOS');
        } finally {
          setLoading(false);
        }
      },
      () => {
        alert('Unable to get location');
        setLoading(false);
      }
    );
  };

  const cancelSOS = async () => {
    if (!activeSOS) return;
    try {
      await sosAPI.cancel(activeSOS.id);
      setActiveSOS(null);
      alert('SOS cancelled');
    } catch (error) {
      alert('Failed to cancel SOS');
    }
  };

  return (
    <div className="sos-page">
      <h2>Emergency SOS</h2>

      {activeSOS ? (
        <div className="sos-active">
          <span className="sos-icon">🚨</span>
          <h3>SOS ACTIVE</h3>
          <p>Help is on the way!</p>
          <button className="sos-cancel" onClick={cancelSOS}>
            Cancel SOS
          </button>
        </div>
      ) : (
        <button className="sos-trigger" onClick={triggerSOS} disabled={loading}>
          🆘 {loading ? 'Triggering...' : 'TRIGGER SOS'}
        </button>
      )}

      <div className="contacts-section">
        <h4>Emergency Contacts</h4>
        <p className="contacts-sub">These contacts will be notified</p>
        {contacts.map((contact, index) => (
          <div key={index} className="contact-card">
            <input
              type="text"
              placeholder="Name"
              value={contact.name}
              onChange={(e) => {
                const newContacts = [...contacts];
                newContacts[index].name = e.target.value;
                setContacts(newContacts);
              }}
              className="input-field"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={contact.phone}
              onChange={(e) => {
                const newContacts = [...contacts];
                newContacts[index].phone = e.target.value;
                setContacts(newContacts);
              }}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Relation (e.g., Brother)"
              value={contact.relation}
              onChange={(e) => {
                const newContacts = [...contacts];
                newContacts[index].relation = e.target.value;
                setContacts(newContacts);
              }}
              className="input-field"
            />
          </div>
        ))}
        <button
          className="add-contact"
          onClick={() => setContacts([...contacts, { name: '', phone: '', relation: '' }])}
        >
          + Add Contact
        </button>
        <button className="save-contacts" onClick={() => alert('Contacts saved!')}>
          Save Contacts
        </button>
      </div>

      <a href="tel:100" className="police-btn">📞 Call Police (100)</a>

      <style>{`
        .sos-page { padding: 8px 0 20px; }
        .sos-page h2 { font-size: 24px; font-weight: 700; margin-bottom: 16px; }

        .sos-trigger {
          width: 100%;
          padding: 32px;
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 24px;
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 20px;
        }
        .sos-trigger:hover { background: #b91c1c; }
        .sos-trigger:disabled { opacity: 0.6; }

        .sos-active {
          text-align: center;
          background: #dc2626;
          color: white;
          padding: 24px;
          border-radius: 16px;
          margin-bottom: 20px;
        }
        .sos-icon { font-size: 48px; display: block; }
        .sos-active h3 { font-size: 24px; margin: 8px 0; }
        .sos-active p { opacity: 0.9; }
        .sos-cancel {
          margin-top: 12px;
          padding: 10px 24px;
          background: white;
          color: #dc2626;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .contacts-section {
          background: white;
          border-radius: 12px;
          padding: 16px;
          margin: 16px 0;
          border: 1px solid #eee;
        }
        .contacts-section h4 { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
        .contacts-sub { color: #888; font-size: 13px; margin-bottom: 12px; }

        .contact-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: #f5f5f5;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 8px;
        }
        .contact-card .input-field { margin-bottom: 0; }

        .add-contact {
          width: 100%;
          padding: 10px;
          background: #f0f0f0;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          margin-bottom: 8px;
        }
        .add-contact:hover { background: #e0e0e0; }

        .save-contacts {
          width: 100%;
          padding: 12px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }
        .save-contacts:hover { background: #388E3C; }

        .police-btn {
          display: block;
          width: 100%;
          padding: 12px;
          background: #1a1a2e;
          color: white;
          text-align: center;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default SOS;
