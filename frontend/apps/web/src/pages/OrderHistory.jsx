import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([
    { id: 1, bike: 'Honda CB Shine', date: '2026-07-28', amount: 350, status: 'Completed', details: 'Pickup: Thamel, Return: Thamel' },
    { id: 2, bike: 'Yamaha FZ', date: '2026-07-27', amount: 400, status: 'Ongoing', details: 'Pickup: Patan, Return: Patan' },
    { id: 3, bike: 'TVS Apache', date: '2026-07-26', amount: 380, status: 'Pending', details: 'Pickup: Boudha, Return: Boudha' },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  // ✅ Cancel Order
  const handleCancel = (id) => {
    if (window.confirm('Cancel this order?')) {
      setOrders(orders.map(o => o.id === id ? { ...o, status: 'Cancelled' } : o));
      alert('✅ Order cancelled!');
    }
  };

  // ✅ View Order Details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>📋 My Orders</h2>

      {selectedOrder && (
        <div style={{
          background: '#f5f5f5',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '16px',
          border: '1px solid #ddd',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>📄 Order Details</h3>
            <button
              onClick={() => setSelectedOrder(null)}
              style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
          <p><strong>Bike:</strong> {selectedOrder.bike}</p>
          <p><strong>Date:</strong> {selectedOrder.date}</p>
          <p><strong>Amount:</strong> Rs {selectedOrder.amount}</p>
          <p><strong>Status:</strong> {selectedOrder.status}</p>
          <p><strong>Details:</strong> {selectedOrder.details}</p>
        </div>
      )}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            background: 'white',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '12px',
            border: '1px solid #eee',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0 }}>{order.bike}</h4>
              <p style={{ margin: '4px 0', color: '#888', fontSize: '14px' }}>
                {order.date} · Rs {order.amount}
              </p>
              <span style={{
                padding: '2px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold',
                background: order.status === 'Completed' ? '#dcfce7' :
                          order.status === 'Ongoing' ? '#dbeafe' :
                          order.status === 'Pending' ? '#fef3c7' : '#fee2e2',
                color: order.status === 'Completed' ? '#166534' :
                       order.status === 'Ongoing' ? '#1e40af' :
                       order.status === 'Pending' ? '#92400e' : '#991b1b',
              }}>
                {order.status}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
              <button
                onClick={() => handleViewDetails(order)}
                style={{
                  padding: '4px 12px',
                  background: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                👁️ View
              </button>
              {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                <button
                  onClick={() => handleCancel(order.id)}
                  style={{
                    padding: '4px 12px',
                    background: '#E53935',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  ❌ Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
