import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [bikes, setBikes] = useState([
    { id: 1, name: 'Honda CB Shine', brand: 'Honda', cc: 125, price: 350, available: true, rating: 4.5, location: 'Thamel, Kathmandu', image: '/assets/images/honda-cb-shine.png' },
    { id: 2, name: 'Yamaha FZ', brand: 'Yamaha', cc: 150, price: 400, available: true, rating: 4.6, location: 'Lakeside, Pokhara', image: '/assets/images/yamaha-fz.png' },
    { id: 3, name: 'TVS Apache', brand: 'TVS', cc: 160, price: 380, available: false, rating: 4.3, location: 'Patan, Lalitpur', image: '/assets/images/tvs-apache.png' },
    { id: 4, name: 'Royal Enfield Classic', brand: 'Royal Enfield', cc: 350, price: 1200, available: true, rating: 4.8, location: 'Sauraha, Chitwan', image: '/assets/images/royal-enfield.png' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterBrand, setFilterBrand] = useState('all');
  const [filteredBikes, setFilteredBikes] = useState(bikes);

  useEffect(() => {
    let result = bikes;
    if (searchQuery.trim()) {
      result = result.filter(bike =>
        bike.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bike.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bike.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterBrand !== 'all') {
      result = result.filter(bike => bike.brand === filterBrand);
    }
    setFilteredBikes(result);
  }, [searchQuery, filterBrand, bikes]);

  const brands = ['all', ...new Set(bikes.map(b => b.brand))];

  return (
    <div>
      <h2>🏠 Available Bikes</h2>

      {/* Search Bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="🔍 Search bikes by name, brand or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: '12px 16px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px', outline: 'none' }}
        />
        <button onClick={() => setSearchQuery('')} style={{ padding: '12px 20px', background: '#E53935', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>✕</button>
      </div>

      {/* Filter Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setFilterBrand(brand)}
            style={{ padding: '6px 16px', background: filterBrand === brand ? '#4CAF50' : '#f0f0f0', color: filterBrand === brand ? 'white' : '#333', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '14px' }}
          >
            {brand === 'all' ? 'All' : brand}
          </button>
        ))}
      </div>

      <p style={{ color: '#888', fontSize: '14px', marginBottom: '12px' }}>{filteredBikes.length} bike{filteredBikes.length !== 1 ? 's' : ''} found</p>

      <div style={{ display: 'grid', gap: '12px' }}>
        {filteredBikes.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', padding: '40px' }}>No bikes found</p>
        ) : (
          filteredBikes.map((bike) => (
            <Link key={bike.id} to={`/bike/${bike.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                border: '1px solid #eee',
                borderRadius: '12px',
                padding: '16px',
                background: 'white',
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                transition: '0.2s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}>
                <img src={bike.image} alt={bike.name} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0 }}>{bike.name}</h3>
                  <p style={{ margin: '4px 0', color: '#888' }}>{bike.brand} · {bike.cc}cc</p>
                  <p style={{ margin: '2px 0', color: '#666', fontSize: '13px' }}>📍 {bike.location}</p>
                  <p style={{ margin: '4px 0', color: '#4CAF50', fontWeight: 'bold' }}>Rs {bike.price}/day</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '14px', color: '#f5a623' }}>⭐ {bike.rating}</span>
                  <br />
                  <span style={{ fontSize: '12px', color: bike.available ? '#4CAF50' : '#E53935', fontWeight: 'bold' }}>
                    {bike.available ? '✅ Available' : '❌ Unavailable'}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
