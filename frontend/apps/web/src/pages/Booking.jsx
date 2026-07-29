import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bike, days, totalPrice } = location.state || {};
  const [pickupLocation, setPickupLocation] = useState('');
  const [returnLocation, setReturnLocation] = useState('');

  const locations = ['Thamel', 'Patan', 'Boudha', 'Swoyambhu', 'Airport', 'Lazimpat'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickupLocation || !returnLocation) {
      alert('Please select both pickup and return locations');
      return;
    }
    alert('Booking successful! (Mock)');
    navigate('/payment', { state: { totalPrice: totalPrice || 1000 } });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Book Your Ride</h2>
      <p style={{ color: '#888' }}>Fill in the details</p>

      <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
          <span>Bike</span>
          <strong>{bike?.name || 'Not selected'}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
          <span>Days</span>
          <strong>{days || 1} days</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderTop: '1px solid #ddd', paddingTop: '10px', marginTop: '6px', fontSize: '18px', fontWeight: 'bold' }}>
          <span>Total</span>
          <strong style={{ color: '#4CAF50' }}>Rs {totalPrice || 1000}</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>Pickup Location *</label>
          <select value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} required>
            <option value="">Select pickup location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>Return Location *</label>
          <select value={returnLocation} onChange={(e) => setReturnLocation(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} required>
            <option value="">Select return location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}>
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default Booking;
