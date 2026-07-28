import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shopAPI } from '@rental/shared/api';
import { formatCurrency } from '@rental/shared/utils';

const ShopProfile = () => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShop();
  }, []);

  const fetchShop = async () => {
    try {
      const response = await shopAPI.getMyShop();
      if (response.success) {
        setShop(response.data);
      }
    } catch (error) {
      console.error('Error fetching shop:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loader-container"><div className="loader"></div></div>;
  }

  if (!shop) {
    return (
      <div className="no-shop">
        <span className="no-shop-icon">🏪</span>
        <h3>No Shop Registered</h3>
        <p>Register your shop to start renting bikes</p>
        <Link to="/shop-register" className="btn-primary">Register Shop</Link>
      </div>
    );
  }

  return (
    <div className="shop-profile-page">
      <div className="shop-header">
        <h2>{shop.shopName}</h2>
        <span className={`shop-status ${shop.isVerified ? 'verified' : 'pending'}`}>
          {shop.isVerified ? '✅ Verified' : '⏳ Pending'}
        </span>
      </div>

      <div className="shop-info">
        <div className="info-row">
          <span className="info-label">📍 Address</span>
          <span>{shop.address}</span>
        </div>
        <div className="info-row">
          <span className="info-label">📞 Phone</span>
          <span>{shop.phone}</span>
        </div>
        <div className="info-row">
          <span className="info-label">📧 Email</span>
          <span>{shop.email || 'Not provided'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">⭐ Rating</span>
          <span>{shop.rating || 'No ratings yet'}</span>
        </div>
      </div>

      <div className="shop-actions">
        <Link to="/add-bike" className="action-btn primary">➕ Add Bike</Link>
        <Link to="/orders" className="action-btn">📋 View Orders</Link>
      </div>

      <style>{`
        .shop-profile-page { padding: 8px 0 20px; }
        .shop-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .shop-header h2 { font-size: 24px; font-weight: 700; }
        .shop-status {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
        }
        .shop-status.verified { background: #dcfce7; color: #166534; }
        .shop-status.pending { background: #fef3c7; color: #92400e; }

        .shop-info {
          background: white;
          border-radius: 12px;
          padding: 16px;
          border: 1px solid #eee;
          margin-bottom: 16px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
          font-size: 14px;
        }
        .info-row:last-child { border-bottom: none; }
        .info-label { color: #888; font-weight: 500; }

        .shop-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .action-btn {
          padding: 12px;
          text-align: center;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          border: 1px solid #ddd;
          color: #333;
        }
        .action-btn.primary {
          background: #4CAF50;
          color: white;
          border-color: #4CAF50;
        }
        .action-btn.primary:hover { background: #388E3C; }
        .action-btn:hover { background: #f5f5f5; }

        .no-shop {
          text-align: center;
          padding: 40px 20px;
        }
        .no-shop-icon { font-size: 48px; display: block; margin-bottom: 12px; }
        .no-shop h3 { font-size: 18px; margin-bottom: 4px; }
        .no-shop p { color: #888; margin-bottom: 16px; }
        .no-shop .btn-primary { display: inline-block; width: auto; padding: 12px 24px; text-decoration: none; }

        .loader-container { display: flex; justify-content: center; align-items: center; min-height: 200px; }
        .loader {
          width: 40px;
          height: 40px;
          border: 4px solid #f0f0f0;
          border-top: 4px solid #4CAF50;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default ShopProfile;
