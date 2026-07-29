import React from 'react';

const OrderHistory = () => {
  const orders = [
    { id: 1, bike: 'Honda CB Shine', date: '2026-07-28', amount: 350, status: 'Completed' },
    { id: 2, bike: 'Yamaha FZ', date: '2026-07-27', amount: 400, status: 'Ongoing' },
  ];

  return (
    <div>
      <h2>📋 My Orders</h2>
      {orders.map((order) => (
        <div key={order.id} style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
          <strong>{order.bike}</strong>
          <p>{order.date} · Rs {order.amount} · {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
