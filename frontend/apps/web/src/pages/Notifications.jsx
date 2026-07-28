import React, { useState, useEffect } from 'react';
import { notificationAPI } from '@rental/shared/api';
import { formatDate } from '@rental/shared/utils';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await notificationAPI.getAll();
      if (response.success) {
        setNotifications(response.data.notifications || []);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await notificationAPI.markAsRead(id);
      setNotifications(notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const markAllRead = async () => {
    try {
      await notificationAPI.markAllRead();
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const getIcon = (type) => {
    const icons = {
      booking: '📅',
      payment: '💳',
      sos: '🆘',
      system: '⚙️',
    };
    return icons[type] || '📌';
  };

  if (loading) {
    return <div className="loader-container"><div className="loader"></div></div>;
  }

  return (
    <div className="notifications-page">
      <div className="notif-header">
        <h2>Notifications</h2>
        {notifications.some(n => !n.read) && (
          <button className="mark-all-btn" onClick={markAllRead}>
            Mark All Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🔔</span>
          <p>No notifications yet</p>
        </div>
      ) : (
        <div className="notif-list">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`notif-card ${!notif.read ? 'unread' : ''}`}
              onClick={() => markAsRead(notif.id)}
            >
              <span className="notif-icon">{getIcon(notif.type)}</span>
              <div className="notif-content">
                <div className="notif-title">{notif.title}</div>
                <div className="notif-message">{notif.message}</div>
                <div className="notif-date">{formatDate(notif.createdAt)}</div>
              </div>
              {!notif.read && <span className="unread-dot"></span>}
            </div>
          ))}
        </div>
      )}

      <style>{`
        .notifications-page { padding: 8px 0 20px; }
        .notif-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .notif-header h2 { font-size: 24px; font-weight: 700; margin: 0; }
        .mark-all-btn {
          padding: 6px 14px;
          background: #f0f0f0;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
        }
        .mark-all-btn:hover { background: #e0e0e0; }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
        }
        .empty-icon { font-size: 48px; display: block; margin-bottom: 12px; }
        .empty-state p { color: #888; font-size: 16px; }

        .notif-list { display: flex; flex-direction: column; gap: 8px; }
        .notif-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: white;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid #eee;
          cursor: pointer;
          position: relative;
          transition: background 0.2s;
        }
        .notif-card:hover { background: #f9f9f9; }
        .notif-card.unread { border-color: #4CAF50; background: #f5faf5; }

        .notif-icon { font-size: 24px; margin-top: 2px; }
        .notif-content { flex: 1; }
        .notif-title { font-weight: 600; font-size: 15px; }
        .notif-message { font-size: 14px; color: #666; margin: 2px 0; }
        .notif-date { font-size: 12px; color: #aaa; }

        .unread-dot {
          width: 8px;
          height: 8px;
          background: #4CAF50;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 8px;
        }

        .loader-container { display: flex; justify-content: center; align-items: center; min-height: 200px; }
        .loader {
          width: 40px;
          height: 40px;
          border: 4px solid #f0f0f0;
          border-top: 4px solid #4CAF50;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Notifications;
