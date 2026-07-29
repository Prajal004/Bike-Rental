import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../api/auth';

const OTP = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter 6-digit OTP');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.verifyOTP(userId, otp);
      if (response.success) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userData', JSON.stringify(response.user));
        navigate('/');
      } else {
        setError(response.message || 'Invalid OTP');
      }
    } catch (err) {
      setError(err.message || 'Network Error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await authAPI.resendOTP(userId);
      alert('OTP resent successfully!');
    } catch (err) {
      alert('Failed to resend OTP');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h2>📱 Verify OTP</h2>
      <p style={{ color: '#888' }}>Enter the 6-digit code sent to your phone</p>

      {error && (
        <div style={{ padding: '10px', background: '#fee2e2', color: '#dc2626', borderRadius: '4px', marginBottom: '10px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleVerify}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="000000"
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '32px',
            textAlign: 'center',
            letterSpacing: '8px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            marginBottom: '16px',
          }}
          required
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>

      <p style={{ marginTop: '16px', color: '#888' }}>
        Didn't receive code?{' '}
        <button
          onClick={handleResend}
          style={{ background: 'none', border: 'none', color: '#4CAF50', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Resend OTP
        </button>
      </p>
    </div>
  );
};

export default OTP;
