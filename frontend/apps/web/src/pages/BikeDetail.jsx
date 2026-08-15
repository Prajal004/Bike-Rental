import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatButton from '../components/ChatButton';

const BikeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [days, setDays] = useState(1);

  // ✅ Sahi UUID format ma shop owner ID
  const bike = {
    id: id,
    name: 'Honda CB Shine',
    brand: 'Honda',
    year: 2024,
    cc: 125,
    pricePerDay: 350,
    description: 'Best commuter bike in Nepal.',
    available: true,
    rating: 4.5,
    shopOwnerId: 'f0ffc8b6-8334-410d-b645-3c707972563f', // ✅ UUID format
    shopName: 'Prajal Bike Shop',
    images: ['🏍️', '🚴', '⚙️', '🔧'],
    reviews: [
      { user: 'Ram K.', rating: 5, comment: 'Amazing bike!', date: '2026-07-28' },
    ]
  };

  const totalPrice = bike.pricePerDay * days;

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      {/* Images Gallery */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: '120px',
          background: '#f5f5f5',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '12px',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {bike.images[selectedImage]}
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {bike.images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              style={{
                fontSize: '32px',
                padding: '8px 12px',
                background: selectedImage === index ? '#4CAF50' : '#f0f0f0',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              {img}
            </button>
          ))}
        </div>
      </div>

      {/* Bike Info */}
      <h1>{bike.name}</h1>
      <p style={{ color: '#888' }}>{bike.brand} · {bike.year} · {bike.cc}cc</p>
      <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#4CAF50' }}>
        Rs {bike.pricePerDay} <span style={{ fontSize: '14px', color: '#888', fontWeight: 'normal' }}>/ day</span>
      </p>

      {/* ✅ Chat Button with real UUID */}
      <div style={{ marginTop: '12px' }}>
        <ChatButton 
          shopOwnerId={bike.shopOwnerId} 
          shopName={bike.shopName} 
        />
      </div>

      {/* Booking Section */}
      <div style={{ marginTop: '20px', background: '#f5f5f5', padding: '16px', borderRadius: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <label style={{ fontWeight: '600' }}>Days:</label>
          <button onClick={() => setDays(Math.max(1, days - 1))} style={{ padding: '4px 12px', background: '#ddd', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>−</button>
          <span style={{ fontWeight: '600', minWidth: '24px', textAlign: 'center' }}>{days}</span>
          <button onClick={() => setDays(days + 1)} style={{ padding: '4px 12px', background: '#ddd', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
          <span>Total:</span>
          <span style={{ color: '#4CAF50' }}>Rs {totalPrice}</span>
        </div>
        <button
          onClick={() => navigate('/booking', { state: { bike, days, totalPrice } })}
          style={{
            width: '100%',
            padding: '14px',
            marginTop: '12px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BikeDetail;
