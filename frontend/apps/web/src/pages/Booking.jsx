import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { rentalAPI } from '@rental/shared/api';

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bike, days, totalPrice } = location.state || {};
  const [pickupLocation, setPickupLocation] = useState('');
  const [returnLocation, setReturnLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const locations = ['Thamel', 'Patan', 'Boudha', 'Swoyambhu', 'Airport', 'Lazimpat'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pickupLocation || !returnLocation) {
      alert('Please select both pickup and return locations');
      return;
    }

    setLoading(true);
    try {
      const response = await rentalAPI.create({
        motorcycleId: bike?.id,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + days * 86400000).toISOString(),
        pickupLocation,
        returnLocation,
        totalPrice,
      });

      if (response.success) {
        navigate('/payment', { state: { rentalId: response.data.id, totalPrice } });
      }
    } catch (error) {
      alert('Booking failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <h2>Book Your Ride</h2>
      <p className="subtitle">Fill in the details</p>

      <div className="booking-summary">
        <div className="summary-row">
          <span>Bike</span>
          <strong>{bike?.name || 'Not selected'}</strong>
        </div>
        <div className="summary-row">
          <span>Days</span>
          <strong>{days || 0} days</strong>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <strong>{totalPrice ? `Rs ${totalPrice}` : '—'}</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label>Pickup Location *</label>
          <select
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="input-field"
            required
          >
            <option value="">Select pickup location</option>
            {locations.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Return Location *</label>
          <select
            value={returnLocation}
            onChange={(e) => setReturnLocation(e.target.value)}
            className="input-field"
            required
          >
            <option value="">Select return location</option>
            {locations.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </form>

      <style>{`
        .booking-page { padding: 8px 0 20px; }
        .booking-page h2 { font-size: 24px; font-weight: 700; }
        .subtitle { color: #888; font-size: 14px; margin-bottom: 20px; }

        .booking-summary {
          background: #f5f5f5;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
          font-size: 14px;
          color: #555;
        }
        .summary-row.total {
          border-top: 1px solid #ddd;
          padding-top: 10px;
          margin-top: 6px;
          font-size: 18px;
          font-weight: 700;
        }
        .summary-row.total strong { color: #4CAF50; }

        .booking-form { display: flex; flex-direction: column; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-weight: 600; font-size: 14px; color: #333; }
      `}</style>
    </div>
  );
};

export default Booking;
