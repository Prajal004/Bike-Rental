// apps/web/src/components/auth/OTPVerification.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export const OTPVerification = () => {
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
    <form onSubmit={handleSubmit} className="otp-form">
      {error && <div className="auth-error">{error}</div>}
      <Input value={otp} onChange={setOtp} placeholder="000000" className="otp-input" type="text" />
      <Button type="submit" loading={loading}>Verify</Button>
    </form>
  );
};