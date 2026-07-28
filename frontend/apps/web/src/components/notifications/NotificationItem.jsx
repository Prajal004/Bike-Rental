import React from 'react';
import { formatDate } from '@rental/shared/utils';

export const NotificationItem = ({ notification, onPress }) => {
  const icons = { booking: '📅', payment: '💳', sos: '🆘', system: '⚙️' };
  return (
    <div className={`notif-card ${!notification.read ? 'unread' : ''}`} onClick={() => onPress?.(notification.id)}>
      <span className="notif-icon">{icons[notification.type] || '📌'}</span>
      <div className="notif-content">
        <div className="notif-title">{notification.title}</div>
        <div className="notif-message">{notification.message}</div>
        <div className="notif-date">{formatDate(notification.createdAt)}</div>
      </div>
      {!notification.read && <span className="unread-dot"></span>}
    </div>
  );
};