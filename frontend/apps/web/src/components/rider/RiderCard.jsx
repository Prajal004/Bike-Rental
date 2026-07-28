import React from 'react';

export const RiderCard = ({ rider }) => {
  return (
    <div className="rider-card">
      <div className="rider-avatar">{rider.name?.[0] || 'R'}</div>
      <div className="rider-info">
        <h4>{rider.name || 'Rider'}</h4>
        <p className="rider-phone">{rider.phone || '98XXXXXXXX'}</p>
        <span className={`rider-status ${rider.isVerified ? 'verified' : 'pending'}`}>
          {rider.isVerified ? '✅ Verified' : '⏳ Pending'}
        </span>
      </div>
    </div>
  );
};