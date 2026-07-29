import React from 'react';
import { Link } from 'react-router-dom';

const ShopProfile = () => {
  const shop = {
    shopName: 'Prajal Bike Shop',
    address: 'Thamel, Kathmandu',
    phone: '98XXXXXXXX',
    email: 'shop@example.com',
    isVerified: true,
  };

  return (
    <div>
      <h2>{shop.shopName}</h2>
      <p><strong>📍 Address:</strong> {shop.address}</p>
      <p><strong>📞 Phone:</strong> {shop.phone}</p>
      <p><strong>📧 Email:</strong> {shop.email}</p>
      <p><strong>Status:</strong> {shop.isVerified ? '✅ Verified' : '⏳ Pending'}</p>
      <Link to="/add-bike">
        <button style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          ➕ Add Bike
        </button>
      </Link>
    </div>
  );
};

export default ShopProfile;
