import React, { useState, useEffect } from 'react';
import { rentalAPI } from '@rental/shared/api';
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from '@rental/shared/utils';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await rentalAPI.getUserRentals();
      if (response.success) {
        setOrders(response.data.rentals || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loader-container"><div className="loader"></div></div>;
  }

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <p>No orders yet</p>
          <p className="empty-sub">Start your first ride!</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span className="order-id">#{order.id?.slice(0, 8)}</span>
                <span className={`order-status`} style={{ background: getStatusColor(order.status), color: 'white', padding: '2px 10px', borderRadius: '12px', fontSize: '12px' }}>
                  {getStatusLabel(order.status)}
                </span>
              </div>
              <div className="order-body">
                <div>
                  <strong>{order.motorcycleName || 'Bike'}</strong>
                  <p className="order-date">{formatDate(order.startDate)} → {formatDate(order.endDate)}</p>
                </div>
                <div className="order-amount">{formatCurrency(order.totalPrice)}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .orders-page { padding: 8px 0 20px; }
        .orders-page h2 { font-size: 24px; font-weight: 700; margin-bottom: 16px; }

        .empty-state { text-align: center; padding: 40px 20px; }
        .empty-icon { font-size: 48px; display: block; margin-bottom: 12px; }
        .empty-state p { color: #888; font-size: 16px; }
        .empty-sub { font-size: 14px; }

        .orders-list { display: flex; flex-direction: column; gap: 10px; }
        .order-card {
          background: white;
          border-radius: 12px;
          padding: 14px 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          border: 1px solid #eee;
        }
        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .order-id { font-size: 13px; color: #888; }
        .order-body { display: flex; justify-content: space-between; align-items: center; }
        .order-body strong { font-size: 15px; }
        .order-date { font-size: 12px; color: #888; margin-top: 2px; }
        .order-amount { font-weight: 700; color: #4CAF50; font-size: 16px; }

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

export default OrderHistory;
