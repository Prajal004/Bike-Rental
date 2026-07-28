import React from 'react';
import { BikeCard } from './BikeCard';

export const BikeList = ({ bikes, title, seeAllLink }) => {
  if (!bikes || bikes.length === 0) {
    return <p className="text-muted">No bikes available</p>;
  }
  return (
    <div className="bike-list-section">
      <div className="section-header">
        <h3 className="section-title">{title || 'Bikes'}</h3>
        {seeAllLink && <a href={seeAllLink} className="see-all">See All</a>}
      </div>
      <div className="bike-grid">
        {bikes.map((bike) => (
          <BikeCard key={bike.id} bike={bike} />
        ))}
      </div>
    </div>
  );
};