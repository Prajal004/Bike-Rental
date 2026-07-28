import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@rental/shared/utils';

export const BikeCard = ({ bike }) => {
  return (
    <Link to={`/bike/${bike.id}`} className="bike-card">
      <div className="bike-image">
        <span className="bike-emoji">🏍️</span>
        {!bike.available && <span className="badge unavailable">Unavailable</span>}
        {bike.available && <span className="badge available">Available</span>}
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
};