import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '@rental/shared/api';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    <form onSubmit={handleSubmit} className="auth-form">
      {error && <div className="auth-error">{error}</div>}
      <Input label="Full Name" value={formData.fullName} onChange={(v) => setFormData({...formData, fullName: v})} placeholder="Prajal Shrestha" required />
      <Input label="Email" type="email" value={formData.email} onChange={(v) => setFormData({...formData, email: v})} placeholder="you@example.com" required />
      <Input label="Phone" type="tel" value={formData.phone} onChange={(v) => setFormData({...formData, phone: v})} placeholder="98XXXXXXXX" required />
      <Input label="Password" type="password" value={formData.password} onChange={(v) => setFormData({...formData, password: v})} placeholder="Create a strong password" required />
      <Button type="submit" loading={loading}>Register</Button>
    </form>
  );
};