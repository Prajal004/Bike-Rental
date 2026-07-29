import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BikeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);
  const [days, setDays] = useState(1);

  useEffect(() => {
    // Mock bike data
    setBike({
      id: id,
      name: 'Honda CB Shine',
      brand: 'Honda',
      year: 2024,
      cc: 125,
      pricePerDay: 350,
      description: 'Best commuter bike in Nepal.',
      available: true,
      rating: 4.5,
    });
  }, [id]);

  if (!bike) return <div>Loading...</div>;

  const totalPrice = bike.pricePerDay * days;

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <div style={{ height: '200px', background: '#f0f0f0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '72px' }}>
        🏍️
      </div>

      <h1>{bike.name}</h1>
      <p style={{ color: '#888' }}>{bike.brand} · {bike.year} · {bike.cc}cc</p>
      <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#4CAF50' }}>Rs {bike.pricePerDay} <span style={{ fontSize: '14px', color: '#888', fontWeight: 'normal' }}>/ day</span></p>

      <div style={{ marginTop: '16px' }}>
        <h4>Description</h4>
        <p style={{ color: '#666' }}>{bike.description}</p>
      </div>

      <div style={{ marginTop: '16px', background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: '600' }}>Days</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'white', padding: '4px', borderRadius: '4px' }}>
              <button onClick={() => setDays(Math.max(1, days - 1))} style={{ padding: '4px 12px', background: '#f0f0f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>−</button>
              <span style={{ fontWeight: '600', minWidth: '24px', textAlign: 'center' }}>{days}</span>
              <button onClick={() => setDays(days + 1)} style={{ padding: '4px 12px', background: '#f0f0f0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+</button>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #ddd', fontSize: '18px', fontWeight: 'bold' }}>
          <span>Total:</span>
          <span style={{ color: '#4CAF50' }}>Rs {totalPrice}</span>
        </div>
        <button onClick={() => navigate('/booking', { state: { bike, days, totalPrice } })} style={{ width: '100%', padding: '12px', marginTop: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BikeDetail;
