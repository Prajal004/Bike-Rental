import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';

const OTP = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { verifyOTP } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError('Please enter 6-digit OTP');
      return;
    }
    setError('');
    setLoading(true);

    const result = await verifyOTP(userId, otp);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Invalid OTP');
    }
    setLoading(false);
  };

  return (
    <div className="otp-page">
      <div className="otp-brand">
        <span className="brand-icon">📱</span>
        <h1>Verify OTP</h1>
        <p>Enter the 6-digit code sent to your phone</p>
      </div>

      <form onSubmit={handleSubmit} className="otp-form">
        {error && <div className="otp-error">{error}</div>}

        <div className="input-group">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="000000"
            className="otp-input"
            maxLength={6}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify'}
        </button>

        <p className="otp-footer">
          Didn't receive code? <Link to="#">Resend OTP</Link>
        </p>
      </form>

      <style>{`
        .otp-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px 24px;
          background: white;
          max-width: 480px;
          margin: 0 auto;
        }
        .otp-brand {
          text-align: center;
          margin-bottom: 32px;
        }
        .brand-icon { font-size: 48px; display: block; margin-bottom: 8px; }
        .otp-brand h1 { font-size: 28px; font-weight: 700; }
        .otp-brand p { color: #888; font-size: 14px; }

        .otp-form { display: flex; flex-direction: column; gap: 16px; align-items: center; }
        .otp-input {
          width: 200px;
          text-align: center;
          font-size: 32px;
          letter-spacing: 8px;
          padding: 16px;
          border: 2px solid #ddd;
          border-radius: 12px;
          font-weight: 700;
        }
        .otp-input:focus { outline: none; border-color: #4CAF50; }

        .otp-error {
          background: #fee2e2;
          color: #dc2626;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 14px;
          text-align: center;
          width: 100%;
        }

        .otp-footer {
          text-align: center;
          color: #888;
          font-size: 14px;
        }
        .otp-footer a { color: #4CAF50; font-weight: 600; text-decoration: none; }
      `}</style>
    </div>
  );
};

export default OTP;
