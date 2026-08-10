import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
      <h2>🔒 Registration Disabled</h2>
      <p style={{ color: '#888', marginTop: '12px' }}>
        New account registration is currently disabled.
      </p>
      <p style={{ color: '#888', marginTop: '8px' }}>
        Only admin can manage users.
      </p>
      <Link to="/login" style={{ display: 'inline-block', marginTop: '20px', color: '#4CAF50', textDecoration: 'none', fontWeight: 'bold' }}>
        ← Back to Login
      </Link>
    </div>
  );
};

export default Register;
