import React from 'react';
import { Link } from 'react-router-dom';

export const PaymentConfirmation = ({ orderId, amount }) => {
  return (
    <div className="payment-confirmation">
      <div className="confirmation-icon">✅</div>
      <h2>Payment Successful!</h2>
      <p>Your payment of Rs {amount} has been confirmed.</p>
      <p className="order-id">Order ID: #{orderId}</p>
      <Link to="/orders" className="btn-primary">View Orders</Link>
    </div>
  );
};