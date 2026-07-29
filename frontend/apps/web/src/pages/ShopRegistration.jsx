import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShopRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shopName: '',
    address: '',
    phone: '',
    email: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Shop registered successfully! (Mock)');
    navigate('/shop-profile');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Register Shop</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="shopName" placeholder="Shop Name" value={formData.shopName} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }} required />
        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows="3" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px' }}>Register Shop</button>
      </form>
    </div>
  );
};

export default ShopRegistration;
