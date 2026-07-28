import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '@rental/shared/api';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.register(formData);
      if (response.success) {
        navigate('/otp', { state: { userId: response.data.userId } });
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <span className="brand-icon">🏍️</span>
        <h1>Bike<span>Rental</span></h1>
        <p>Create your account</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="auth-error">{error}</div>}

        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Prajal Shrestha"
            required
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="98XXXXXXXX"
            required
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a strong password"
            required
            className="input-field"
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Creating Account...' : 'Register'}
        </button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
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

export default Register;
