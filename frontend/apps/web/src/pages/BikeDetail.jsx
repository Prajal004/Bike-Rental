import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motorcycleAPI } from '@rental/shared/api';
import { formatCurrency, formatDate } from '@rental/shared/utils';

const BikeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    fetchBike();
  }, [id]);

  const fetchBike = async () => {
    try {
      const response = await motorcycleAPI.getById(id);
      if (response.success) {
        setBike(response.data);
      }
    } catch (error) {
      console.error('Error fetching bike:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loader-container"><div className="loader"></div></div>;
  }

  if (!bike) {
    return <div className="not-found">Bike not found</div>;
  }

  const totalPrice = bike.pricePerDay * days;

  return (
    <div className="detail-page">
      <div className="detail-gallery">
        <div className="main-image">
          <span className="detail-emoji">🏍️</span>
          <div className="gallery-badges">
            <span className="rating-badge">⭐ {bike.rating || 4.5}</span>
            <span className={`avail-badge ${bike.available ? 'available' : 'unavailable'}`}>
              {bike.available ? 'Available' : 'Unavailable'}
            </span>
          </div>
        </div>
        <div className="thumbnails">
          <span className="thumb active">🏍️</span>
          <span className="thumb">🔧</span>
          <span className="thumb">⚙️</span>
        </div>
      </div>

      <div className="detail-info">
        <h1>{bike.name}</h1>
        <div className="detail-meta">
          <span className="detail-brand">{bike.brand} · {bike.year} · {bike.cc}cc</span>
        </div>
        <div className="detail-price">
          <span className="price-amount">{formatCurrency(bike.pricePerDay)}</span>
          <span className="price-per">/ day</span>
        </div>

        <div className="detail-section">
          <h4>Description</h4>
          <p>{bike.description || 'No description available.'}</p>
        </div>

        <div className="detail-section">
          <h4>Specifications</h4>
          <div className="specs-grid">
            <div className="spec-item"><span>Engine</span><span>{bike.cc}cc</span></div>
            <div className="spec-item"><span>Year</span><span>{bike.year}</span></div>
            <div className="spec-item"><span>Brand</span><span>{bike.brand}</span></div>
            <div className="spec-item"><span>Status</span><span>{bike.available ? '✅ Available' : '❌ Unavailable'}</span></div>
          </div>
        </div>

        <div className="booking-section">
          <div className="booking-controls">
            <div className="date-group">
              <label>Pickup Date</label>
              <input type="date" className="input-field" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>
            <div className="days-group">
              <label>Days</label>
              <div className="days-control">
                <button onClick={() => setDays(Math.max(1, days - 1))}>−</button>
                <span>{days}</span>
                <button onClick={() => setDays(days + 1)}>+</button>
              </div>
            </div>
          </div>
          <div className="total-price">
            <span>Total:</span>
            <span className="total-amount">{formatCurrency(totalPrice)}</span>
          </div>
          <button className="book-btn" onClick={() => navigate('/booking', { state: { bike, days, totalPrice } })}>
            Book Now
          </button>
        </div>
      </div>

      <style>{`
        .detail-page { padding-bottom: 20px; }
        .detail-gallery { margin-bottom: 16px; }
        .main-image {
          height: 200px;
          background: #f0f0f0;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .detail-emoji { font-size: 72px; }
        .gallery-badges {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .rating-badge {
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
        }
        .avail-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }
        .avail-badge.available { background: #4CAF50; color: white; }
        .avail-badge.unavailable { background: #dc2626; color: white; }

        .thumbnails { display: flex; gap: 8px; margin-top: 8px; }
        .thumb {
          width: 48px;
          height: 48px;
          background: #f0f0f0;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          border: 2px solid transparent;
        }
        .thumb.active { border-color: #4CAF50; }

        .detail-info h1 { font-size: 24px; font-weight: 700; }
        .detail-meta { color: #888; font-size: 14px; margin: 4px 0 12px; }
        .detail-price { display: flex; align-items: baseline; gap: 4px; margin-bottom: 16px; }
        .price-amount { font-size: 28px; font-weight: 700; color: #4CAF50; }
        .price-per { font-size: 14px; color: #888; }

        .detail-section { margin-top: 16px; }
        .detail-section h4 { font-size: 16px; font-weight: 600; margin-bottom: 6px; }
        .detail-section p { color: #666; line-height: 1.6; font-size: 14px; }

        .specs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .spec-item {
          background: #f5f5f5;
          padding: 8px 12px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }

        .booking-section {
          background: #f5f5f5;
          border-radius: 16px;
          padding: 16px;
          margin-top: 20px;
        }
        .booking-controls {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .date-group label, .days-group label {
          font-size: 13px;
          font-weight: 600;
          display: block;
          margin-bottom: 4px;
          color: #555;
        }
        .days-control {
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          border-radius: 8px;
          padding: 4px;
        }
        .days-control button {
          width: 32px;
          height: 32px;
          border: none;
          background: #f0f0f0;
          border-radius: 50%;
          font-size: 18px;
          cursor: pointer;
        }
        .days-control button:hover { background: #4CAF50; color: white; }
        .days-control span { font-weight: 600; min-width: 24px; text-align: center; }

        .total-price {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-top: 1px solid #ddd;
          margin-top: 12px;
          font-size: 18px;
          font-weight: 700;
        }
        .total-amount { color: #4CAF50; }

        .book-btn {
          width: 100%;
          padding: 14px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
        }
        .book-btn:hover { background: #388E3C; }

        .loader-container { display: flex; justify-content: center; align-items: center; min-height: 200px; }
        .loader {
          width: 40px;
          height: 40px;
          border: 4px solid #f0f0f0;
          border-top: 4px solid #4CAF50;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .not-found { text-align: center; padding: 40px; color: #888; font-size: 18px; }
      `}</style>
    </div>
  );
};

export default BikeDetail;
