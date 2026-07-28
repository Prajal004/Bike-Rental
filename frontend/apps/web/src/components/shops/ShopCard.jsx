import React from 'react';
import { Link } from 'react-router-dom';

export const ShopCard = ({ shop }) => {
  return (
    <Link to={`/shop/${shop.id}`} className="shop-card">
      <div className="shop-icon">🏪</div>
      <div className="shop-info">
        <h4>{shop.shopName}</h4>
        <p className="shop-address">{shop.address}</p>
        <span className={`shop-status ${shop.isVerified ? 'verified' : 'pending'}`}>
          {shop.isVerified ? '✅ Verified' : '⏳ Pending'}
        </span>
      </div>
    </Link>
  );
};