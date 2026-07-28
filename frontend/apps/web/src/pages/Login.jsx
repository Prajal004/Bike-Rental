import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    if (result.success) {
      navigate('/otp', { state: { userId: result.userId } });
    } else {
      setError(result.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <span className="brand-icon">🏍️</span>
        <h1>Bike<span>Rental</span></h1>
        <p>Welcome back!</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="auth-error">{error}</div>}

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="input-field"
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px 24px;
          background: white;
          max-width: 480px;
          margin: 0 auto;
        }
        .auth-brand {
          text-align: center;
          margin-bottom: 32px;
        }
        .brand-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 8px;
        }
        .auth-brand h1 {
          font-size: 28px;
          font-weight: 700;
        }
        .auth-brand h1 span { color: #4CAF50; }
        .auth-brand p { color: #888; font-size: 14px; }

        .auth-form { display: flex; flex-direction: column; gap: 16px; }
        .input-group { display: flex; flex-direction: column; gap: 6px; }
        .input-group label { font-weight: 600; font-size: 14px; color: #333; }

        .auth-error {
          background: #fee2e2;
          color: #dc2626;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 14px;
          text-align: center;
        }

        .auth-footer {
          text-align: center;
          color: #888;
          font-size: 14px;
          margin-top: 8px;
        }
        .auth-footer a { color: #4CAF50; font-weight: 600; text-decoration: none; }
      `}</style>
    </div>
  );
};

export default Login;
