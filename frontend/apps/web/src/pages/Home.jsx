import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motorcycleAPI } from '@rental/shared/api';
import { formatCurrency } from '@rental/shared/utils';
import { COLORS } from '@rental/shared/constants';

const Home = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const [allRes, featuredRes] = await Promise.all([
        motorcycleAPI.getAll(),
        motorcycleAPI.getFeatured(),
      ]);
      if (allRes.success) setBikes(allRes.data.motorcycles || []);
      if (featuredRes.success) setFeatured(featuredRes.data.motorcycles || []);
    } catch (error) {
      console.error('Error fetching bikes:', error);
    } finally {
      setLoading(false);
    }
  };

  const BikeCard = ({ bike }) => (
    <Link to={`/bike/${bike.id}`} className="bike-card">
      <div className="bike-image">
        <span className="bike-emoji">🏍️</span>
      </div>
      <div className="bike-info">
        <h4>{bike.name}</h4>
        <p className="bike-brand">{bike.brand} · {bike.cc}cc</p>
        <div className="bike-meta">
          <span className="bike-price">{formatCurrency(bike.pricePerDay)}<span className="per-day">/day</span></span>
          <span className="bike-rating">⭐ {bike.rating || 4.5}</span>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="home-page">
      <div className="banner">
        <div className="banner-text">
          <h2>Find Your Ride</h2>
          <p>Best bikes at best prices</p>
        </div>
        <span className="banner-icon">🏍️</span>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search bikes..." className="search-input" />
        <button className="search-btn">🔍</button>
      </div>

      <div className="section">
        <div className="section-header">
          <h3 className="section-title">Featured Bikes</h3>
          <Link to="/" className="see-all">See All</Link>
        </div>
        <div className="bike-grid">
          {featured.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h3 className="section-title">All Bikes</h3>
          <Link to="/" className="see-all">See All</Link>
        </div>
        <div className="bike-grid">
          {bikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </div>

      <style>{`
        .home-page { padding-bottom: 20px; }

        .banner {
          background: linear-gradient(135deg, #4CAF50, #388E3C);
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          color: white;
        }
        .banner-text h2 { font-size: 22px; font-weight: 700; }
        .banner-text p { opacity: 0.85; font-size: 14px; margin-top: 2px; }
        .banner-icon { font-size: 48px; }

        .search-bar {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }
        .search-input {
          flex: 1;
          padding: 12px 16px;
          border: 1.5px solid #ddd;
          border-radius: 12px;
          font-size: 15px;
        }
        .search-input:focus { outline: none; border-color: #4CAF50; }
        .search-btn {
          padding: 12px 16px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 18px;
          cursor: pointer;
        }

        .section { margin-top: 16px; }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .see-all { color: #4CAF50; font-weight: 600; text-decoration: none; font-size: 14px; }

        .bike-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .bike-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: transform 0.2s;
        }
        .bike-card:hover { transform: translateY(-2px); }

        .bike-image {
          height: 100px;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
        }
        .bike-info { padding: 10px 12px; }
        .bike-info h4 { font-size: 14px; font-weight: 600; }
        .bike-brand { font-size: 12px; color: #888; margin: 2px 0 4px; }
        .bike-meta { display: flex; justify-content: space-between; align-items: center; }
        .bike-price { font-weight: 700; color: #4CAF50; font-size: 15px; }
        .per-day { font-weight: 400; color: #888; font-size: 10px; }
        .bike-rating { font-size: 12px; color: #888; }
      `}</style>
    </div>
  );
};

export default Home;
