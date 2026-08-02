import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await authAPI.login(email, password);
      if (response.success) {
        navigate('/otp', { state: { userId: response.userId } });
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Network Error');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Reset link sent to your email! (Mock)');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Login</h2>
      {error && <div style={{ padding: '10px', background: '#fee2e2', color: '#dc2626', borderRadius: '4px', marginBottom: '10px' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }} required />
        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
          <button type="button" onClick={handleForgotPassword} style={{ background: 'none', border: 'none', color: '#4CAF50', cursor: 'pointer', fontSize: '14px' }}>Forgot Password?</button>
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>{loading ? 'Loading...' : 'Login'}</button>
      </form>
      <p style={{ marginTop: '10px' }}>Don't have account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
