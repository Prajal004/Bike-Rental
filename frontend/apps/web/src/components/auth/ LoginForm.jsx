import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export const LoginForm = () => {
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
    <form onSubmit={handleSubmit} className="auth-form">
      {error && <div className="auth-error">{error}</div>}
      <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" required />
      <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" required />
      <Button type="submit" loading={loading}>Login</Button>
    </form>
  );
};