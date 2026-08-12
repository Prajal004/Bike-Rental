import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bike, totalPrice } = location.state || {};
  const [duration, setDuration] = useState(1);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  
  // ✅ Pickup Options
  const [pickupOption, setPickupOption] = useState('shop');
  const [pickupAddress, setPickupAddress] = useState('');
  
  // ✅ Return Options
  const [returnOption, setReturnOption] = useState('shop');
  const [returnAddress, setReturnAddress] = useState('');
  
  // ✅ Return Date (can be changed later)
  const [returnDateFlexible, setReturnDateFlexible] = useState(false);

  const locations = ['Thamel', 'Patan', 'Boudha', 'Swoyambhu', 'Airport', 'Lazimpat'];
  const calculatedTotal = totalPrice || bike?.pricePerDay * duration || 1000;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickupDate || !returnDate) {
      alert('Please select dates');
      return;
    }
    if (pickupOption === 'delivery' && !pickupAddress) {
      alert('Please enter delivery address');
      return;
    }
    if (returnOption === 'pickup' && !returnAddress) {
      alert('Please enter pickup address for return');
      return;
    }
    
    const bookingData = {
      bike: bike?.name,
      duration,
      pickupDate,
      returnDate,
      pickupOption,
      pickupAddress,
      returnOption,
      returnAddress,
      total: calculatedTotal,
      returnDateFlexible,
    };
    
    alert('✅ Booking confirmed!\n\n' + 
      `Bike: ${bookingData.bike}\n` +
      `Duration: ${bookingData.duration} days\n` +
      `Pickup: ${bookingData.pickupOption === 'shop' ? '🏪 Shop' : '🚚 Delivery'}\n` +
      `Return: ${bookingData.returnOption === 'shop' ? '🏪 Shop' : '🚚 Pickup'}\n` +
      `Total: Rs ${bookingData.total}`);
    
    navigate('/payment', { state: { totalPrice: calculatedTotal } });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>📋 Book Your Ride</h2>
      <p style={{ color: '#888' }}>Choose your pickup and return options</p>

      <form onSubmit={handleSubmit}>
        {/* Bike Info */}
        <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>🏍️ {bike?.name || 'Bike'}</p>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#888' }}>Rs {bike?.pricePerDay || 0}/day</p>
        </div>

        {/* Date Picker */}
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

        {/* Duration Selector */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>⏱️ Duration (days)</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f5f5f5', padding: '8px', borderRadius: '8px' }}>
            <button type="button" onClick={() => setDuration(Math.max(1, duration - 1))} style={{ padding: '4px 12px', background: '#ddd', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '18px' }}>−</button>
            <span style={{ fontWeight: '600', minWidth: '24px', textAlign: 'center' }}>{duration}</span>
            <button type="button" onClick={() => setDuration(duration + 1)} style={{ padding: '4px 12px', background: '#ddd', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '18px' }}>+</button>
          </div>
        </div>

        <hr style={{ margin: '20px 0', border: '1px solid #eee' }} />

        {/* ✅ PICKUP OPTIONS */}
        <h3 style={{ marginBottom: '12px' }}>📍 Pickup Options</h3>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>How do you want to get the bike?</label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setPickupOption('shop')}
              style={{
                flex: 1,
                padding: '12px',
                background: pickupOption === 'shop' ? '#4CAF50' : '#f5f5f5',
                color: pickupOption === 'shop' ? 'white' : '#333',
                border: pickupOption === 'shop' ? '2px solid #4CAF50' : '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: pickupOption === 'shop' ? 'bold' : 'normal',
              }}
            >
              🏪 Pickup from Shop
            </button>
            <button
              type="button"
              onClick={() => setPickupOption('delivery')}
              style={{
                flex: 1,
                padding: '12px',
                background: pickupOption === 'delivery' ? '#4CAF50' : '#f5f5f5',
                color: pickupOption === 'delivery' ? 'white' : '#333',
                border: pickupOption === 'delivery' ? '2px solid #4CAF50' : '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: pickupOption === 'delivery' ? 'bold' : 'normal',
              }}
            >
              🚚 Delivery to Location
            </button>
          </div>
        </div>

        {/* Pickup Address (if delivery) */}
        {pickupOption === 'delivery' && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>📍 Delivery Address *</label>
            <input
              type="text"
              placeholder="Enter your full address"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
              required
            />
          </div>
        )}

        {/* Pickup Shop Address (if shop) */}
        {pickupOption === 'shop' && (
          <div style={{ marginBottom: '16px', background: '#f5f5f5', padding: '12px', borderRadius: '8px' }}>
            <p style={{ margin: 0 }}>🏪 <strong>Shop Address:</strong> Thamel, Kathmandu</p>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#888' }}>Pickup from our shop during business hours</p>
          </div>
        )}

        <hr style={{ margin: '20px 0', border: '1px solid #eee' }} />

        {/* ✅ RETURN OPTIONS */}
        <h3 style={{ marginBottom: '12px' }}>📍 Return Options</h3>
        
        <p style={{ fontSize: '14px', color: '#888', marginBottom: '12px' }}>
          💡 You can change return option later from your orders
        </p>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>How do you want to return the bike?</label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setReturnOption('shop')}
              style={{
                flex: 1,
                padding: '12px',
                background: returnOption === 'shop' ? '#4CAF50' : '#f5f5f5',
                color: returnOption === 'shop' ? 'white' : '#333',
                border: returnOption === 'shop' ? '2px solid #4CAF50' : '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: returnOption === 'shop' ? 'bold' : 'normal',
              }}
            >
              🏪 Return to Shop
            </button>
            <button
              type="button"
              onClick={() => setReturnOption('pickup')}
              style={{
                flex: 1,
                padding: '12px',
                background: returnOption === 'pickup' ? '#4CAF50' : '#f5f5f5',
                color: returnOption === 'pickup' ? 'white' : '#333',
                border: returnOption === 'pickup' ? '2px solid #4CAF50' : '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: returnOption === 'pickup' ? 'bold' : 'normal',
              }}
            >
              🚚 Pickup from Location
            </button>
          </div>
        </div>

        {/* Return Address (if pickup) */}
        {returnOption === 'pickup' && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>📍 Return Pickup Address *</label>
            <input
              type="text"
              placeholder="Enter address for bike pickup"
              value={returnAddress}
              onChange={(e) => setReturnAddress(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
              required
            />
          </div>
        )}

        {/* Return Shop Address (if shop) */}
        {returnOption === 'shop' && (
          <div style={{ marginBottom: '16px', background: '#f5f5f5', padding: '12px', borderRadius: '8px' }}>
            <p style={{ margin: 0 }}>🏪 <strong>Shop Address:</strong> Thamel, Kathmandu</p>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#888' }}>Return the bike to our shop during business hours</p>
          </div>
        )}

        <hr style={{ margin: '20px 0', border: '1px solid #eee' }} />

        {/* ✅ Flexible Return Date Option */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={returnDateFlexible}
              onChange={(e) => setReturnDateFlexible(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <span>📅 I want flexible return date (can change later)</span>
          </label>
          <p style={{ fontSize: '12px', color: '#888', margin: '4px 0 0 26px' }}>
            You can change return date and time from your orders
          </p>
        </div>

        <hr style={{ margin: '20px 0', border: '1px solid #eee' }} />

        {/* Total Price */}
        <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
            <span>Total</span>
            <span style={{ color: '#4CAF50' }}>Rs {calculatedTotal}</span>
          </div>
          <p style={{ fontSize: '12px', color: '#888', margin: '4px 0 0' }}>
            {duration} day{duration > 1 ? 's' : ''} × Rs {bike?.pricePerDay || 1000}/day
          </p>
          <p style={{ fontSize: '12px', color: '#888', margin: '4px 0 0' }}>
            Pickup: {pickupOption === 'shop' ? '🏪 Shop' : '🚚 Delivery'} · Return: {returnOption === 'shop' ? '🏪 Shop' : '🚚 Pickup'}
          </p>
          {returnDateFlexible && (
            <p style={{ fontSize: '12px', color: '#FF9800', margin: '4px 0 0' }}>
              📅 Flexible return date (can change later)
            </p>
          )}
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
        }}>
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default Booking;
