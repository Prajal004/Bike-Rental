import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const bikes = [
    { id: 1, name: 'Honda CB Shine', brand: 'Honda', price: 350, cc: 125 },
    { id: 2, name: 'Yamaha FZ', brand: 'Yamaha', price: 400, cc: 150 },
    { id: 3, name: 'TVS Apache', brand: 'TVS', price: 380, cc: 160 },
  ];

  return (
    <div>
      <h2>🏠 Available Bikes</h2>
      <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
        {bikes.map((bike) => (
          <Link key={bike.id} to={`/bike/${bike.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', background: 'white' }}>
              <h3>{bike.name}</h3>
              <p>{bike.brand} · {bike.cc}cc</p>
              <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>Rs {bike.price}/day</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
