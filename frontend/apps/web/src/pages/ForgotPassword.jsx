import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP+Password
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await authAPI.forgotPassword(email);
      if (response.success) {
        setUserId(response.userId);
        setStep(2);
        setSuccess('OTP sent to your registered phone!');
      } else {
        setError(response.message || 'User not found');
      }
    } catch (err) {
      setError(err.message || 'Network Error');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword || !confirmPassword) {
      setError('Please fill all fields');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await authAPI.resetPassword({
        userId,
        otp,
        newPassword
      });
      if (response.success) {
        setSuccess('Password reset successfully! Login with new password.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(response.message || 'Reset failed');
      }
    } catch (err) {
      setError(err.message || 'Network Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>🔑 Forgot Password</h2>
      
      {error && <div style={{ padding: '10px', background: '#fee2e2', color: '#dc2626', borderRadius: '4px', marginBottom: '10px' }}>{error}</div>}
      {success && <div style={{ padding: '10px', background: '#dcfce7', color: '#166534', borderRadius: '4px', marginBottom: '10px' }}>{success}</div>}

      {step === 1 ? (
        <form onSubmit={handleSendOTP}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} required />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
          <p style={{ marginTop: '16px', textAlign: 'center' }}>
            <Link to="/login" style={{ color: '#4CAF50' }}>Back to Login</Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>OTP</label>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="Enter 6-digit OTP" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} required />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>New Password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} required />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} required />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
          <p style={{ marginTop: '16px', textAlign: 'center' }}>
            <Link to="/login" style={{ color: '#4CAF50' }}>Back to Login</Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
