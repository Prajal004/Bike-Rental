import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bike, totalPrice } = location.state || {};
  const [pickupLocation, setPickupLocation] = useState('');
  const [returnLocation, setReturnLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [duration, setDuration] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState('pickup');

  const locations = ['Thamel', 'Patan', 'Boudha', 'Swoyambhu', 'Airport', 'Lazimpat'];
  const calculatedTotal = totalPrice || bike?.pricePerDay * duration || 1000;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickupLocation || !returnLocation || !pickupDate || !returnDate) {
      alert('Please fill all fields');
      return;
    }
    alert('✅ Booking confirmed!');
    navigate('/payment', { state: { totalPrice: calculatedTotal } });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>📋 Book Your Ride</h2>
      <p style={{ color: '#888' }}>Fill in the details</p>

      <form onSubmit={handleSubmit}>
        {/* Pickup Location */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>📍 Pickup Location *</label>
          <select value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} required>
            <option value="">Select pickup location</option>
            {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
          </select>
        </div>

        {/* Return Location */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>📍 Return Location *</label>
          <select value={returnLocation} onChange={(e) => setReturnLocation(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} required>
            <option value="">Select return location</option>
            {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
          </select>
        </div>

        {/* ✅ Date Picker */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <div>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>📅 Pickup Date *</label>
            <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} required />
          </div>
          <div>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>📅 Return Date *</label>
            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} required />
          </div>
        </div>

        {/* ✅ Duration Selector */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>⏱️ Duration (days)</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f5f5f5', padding: '8px', borderRadius: '8px' }}>
            <button type="button" onClick={() => setDuration(Math.max(1, duration - 1))} style={{ padding: '4px 12px', background: '#ddd', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '18px' }}>−</button>
            <span style={{ fontWeight: '600', minWidth: '24px', textAlign: 'center' }}>{duration}</span>
            <button type="button" onClick={() => setDuration(duration + 1)} style={{ padding: '4px 12px', background: '#ddd', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '18px' }}>+</button>
          </div>
        </div>

        {/* ✅ Delivery Options */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>🚚 Delivery Option</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" onClick={() => setDeliveryOption('pickup')} style={{
              flex: 1, padding: '10px', background: deliveryOption === 'pickup' ? '#4CAF50' : '#f5f5f5',
              color: deliveryOption === 'pickup' ? 'white' : '#333', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer',
            }}>📍 Pickup from Shop</button>
            <button type="button" onClick={() => setDeliveryOption('delivery')} style={{
              flex: 1, padding: '10px', background: deliveryOption === 'delivery' ? '#4CAF50' : '#f5f5f5',
              color: deliveryOption === 'delivery' ? 'white' : '#333', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer',
            }}>🚚 Delivery to Location</button>
          </div>
        </div>

        {/* Total Price */}
        <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
            <span>Total</span>
            <span style={{ color: '#4CAF50' }}>Rs {calculatedTotal}</span>
          </div>
          <p style={{ fontSize: '12px', color: '#888', margin: '4px 0 0' }}>
            {duration} day{duration > 1 ? 's' : ''} × Rs {bike?.pricePerDay || 1000}/day
          </p>
        </div>

        <button type="submit" style={{
          width: '100%',
          padding: '14px',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}>Proceed to Payment</button>
      </form>
    </div>
  );
};

export default Booking;
