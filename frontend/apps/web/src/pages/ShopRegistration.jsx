import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopAPI } from '@rental/shared/api';

const ShopRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shopName: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    latitude: '',
    longitude: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.shopName || !formData.address || !formData.phone) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await shopAPI.register(formData);
      if (response.success) {
        alert('Shop registered successfully! Waiting for verification.');
        navigate('/shop-profile');
      }
    } catch (error) {
      alert('Registration failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shop-register-page">
      <h2>Register Your Shop</h2>
      <p className="subtitle">Start your bike rental business</p>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Shop Name *</label>
          <input
            type="text"
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            placeholder="Enter shop name"
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label>Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Shop address"
            className="input-field"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="98XXXXXXXX"
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="shop@example.com"
              className="input-field"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your shop"
            className="input-field"
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Latitude</label>
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="27.7172"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Longitude</label>
            <input
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="85.3240"
              className="input-field"
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register Shop'}
        </button>
      </form>

      <style>{`
        .shop-register-page { padding: 8px 0 20px; }
        .shop-register-page h2 { font-size: 24px; font-weight: 700; }
        .subtitle { color: #888; font-size: 14px; margin-bottom: 20px; }

        .register-form { display: flex; flex-direction: column; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-weight: 600; font-size: 14px; color: #333; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .form-group textarea { resize: vertical; min-height: 80px; }
      `}</style>
    </div>
  );
};

export default ShopRegistration;
