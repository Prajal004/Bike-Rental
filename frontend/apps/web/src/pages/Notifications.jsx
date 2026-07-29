import React, { useState, useEffect } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications([
      { id: 1, title: 'Welcome!', message: 'Welcome to Bike Rental App', read: false },
    ]);
  }, []);

  return (
    <div>
      <h2>🔔 Notifications</h2>
      {notifications.map((n) => (
        <div key={n.id} style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
          <strong>{n.title}</strong>
          <p>{n.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
