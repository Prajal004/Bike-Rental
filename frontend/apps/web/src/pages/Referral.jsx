import React, { useState, useEffect } from 'react';
import { referralAPI } from '@rental/shared/api';
import { useAuth } from '../components/context/AuthContext';
import { formatCurrency } from '@rental/shared/utils';

const Referral = () => {
  const { user } = useAuth();
  const [referralData, setReferralData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    try {
      const [codeRes, walletRes] = await Promise.all([
        referralAPI.getMyCode(),
        referralAPI.getWallet(),
      ]);
      if (codeRes.success) setReferralData(codeRes.data);
      if (walletRes.success) setWalletBalance(walletRes.data.walletBalance);
    } catch (error) {
      console.error('Error fetching referral data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCode = async () => {
    if (!code.trim()) {
      alert('Please enter a referral code');
      return;
    }
    try {
      const response = await referralAPI.validate(code);
      if (response.success) {
        alert('Valid referral code! You will get Rs 100 off on your first rental.');
      } else {
        alert('Invalid referral code');
      }
    } catch (error) {
      alert('Error validating code');
    }
  };

  const copyCode = () => {
    navigator.clipboard?.writeText(referralData?.code || '');
    alert('Code copied!');
  };

  if (loading) {
    return <div className="loader-container"><div className="loader"></div></div>;
  }

  return (
    <div className="referral-page">
      <div className="referral-header">
        <h2>Refer & Earn</h2>
        <p className="subtitle">Share your code and earn rewards</p>
      </div>

      <div className="wallet-card">
        <span className="wallet-icon">💰</span>
        <div className="wallet-info">
          <span className="wallet-label">Wallet Balance</span>
          <span className="wallet-amount">{formatCurrency(walletBalance)}</span>
        </div>
      </div>

      <div className="referral-code-card">
        <h4>Your Referral Code</h4>
        <div className="code-display">
          <span className="code-text">{referralData?.code || user?.referralCode || 'Not available'}</span>
          <button className="copy-btn" onClick={copyCode}>Copy</button>
        </div>
        <p className="code-info">Share this code with friends. They get Rs 100 off, you earn Rs 50!</p>
      </div>

      <div className="referral-stats">
        <div className="stat-item">
          <span className="stat-value">{referralData?.totalReferrals || 0}</span>
          <span className="stat-label">Total Referrals</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{formatCurrency(referralData?.creditsEarned || 0)}</span>
          <span className="stat-label">Credits Earned</span>
        </div>
      </div>

      <div className="apply-section">
        <h4>Have a referral code?</h4>
        <div className="apply-input">
          <input
            type="text"
            placeholder="Enter referral code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="input-field"
          />
          <button className="apply-btn" onClick={handleApplyCode}>Apply</button>
        </div>
      </div>

      <style>{`
        .referral-page { padding: 8px 0 20px; }
        .referral-header h2 { font-size: 24px; font-weight: 700; }
        .subtitle { color: #888; font-size: 14px; margin-bottom: 20px; }

        .wallet-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: linear-gradient(135deg, #4CAF50, #388E3C);
          color: white;
          padding: 16px 20px;
          border-radius: 12px;
          margin-bottom: 16px;
        }
        .wallet-icon { font-size: 32px; }
        .wallet-info { display: flex; flex-direction: column; }
        .wallet-label { font-size: 13px; opacity: 0.8; }
        .wallet-amount { font-size: 24px; font-weight: 700; }

        .referral-code-card {
          background: white;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #eee;
          margin-bottom: 16px;
        }
        .referral-code-card h4 { font-size: 15px; margin-bottom: 8px; }
        .code-display {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f5f5f5;
          padding: 8px 12px;
          border-radius: 8px;
        }
        .code-text {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #4CAF50;
          flex: 1;
        }
        .copy-btn {
          padding: 6px 16px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }
        .code-info { font-size: 13px; color: #888; margin-top: 8px; }

        .referral-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 16px;
        }
        .stat-item {
          background: #f5f5f5;
          padding: 12px;
          border-radius: 8px;
          text-align: center;
        }
        .stat-value { display: block; font-size: 20px; font-weight: 700; color: #4CAF50; }
        .stat-label { font-size: 12px; color: #888; }

        .apply-section { background: white; padding: 16px; border-radius: 12px; border: 1px solid #eee; }
        .apply-section h4 { font-size: 15px; margin-bottom: 8px; }
        .apply-input { display: flex; gap: 8px; }
        .apply-input .input-field { flex: 1; margin-bottom: 0; }
        .apply-btn {
          padding: 12px 20px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
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

export default Referral;
