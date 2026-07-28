import React from 'react';

export const ReferralCode = ({ code, onCopy }) => {
  const handleCopy = () => {
    navigator.clipboard?.writeText(code || '');
    onCopy?.();
  };
  return (
    <div className="referral-code">
      <span className="code-text">{code || 'Not available'}</span>
      <button className="copy-btn" onClick={handleCopy}>Copy</button>
    </div>
  );
};