import React, { useState } from 'react';

export const DeliveryOptions = ({ onSelect }) => {
  const [pickupOption, setPickupOption] = useState('shop');
  const [dropOption, setDropOption] = useState('shop');

  const options = {
    pickup: [
      { id: 'shop', label: 'Pickup from Shop', icon: '🏪', desc: 'Visit our shop to collect the bike' },
      { id: 'delivery', label: 'Delivery to Location', icon: '🚚', desc: 'We deliver the bike to your location' },
    ],
    drop: [
      { id: 'shop', label: 'Drop at Shop', icon: '🏪', desc: 'Return the bike at our shop' },
      { id: 'pickup', label: 'Pickup from Location', icon: '🛻', desc: 'We pickup the bike from your location' },
    ],
  };

  return (
    <div className="delivery-options">
      <h3>🚚 Delivery Options</h3>
      <div className="option-section">
        <h4>📍 Pickup</h4>
        <div className="option-group">
          {options.pickup.map((opt) => (
            <label key={opt.id} className={`option-card ${pickupOption === opt.id ? 'active' : ''}`}>
              <input type="radio" name="pickup" value={opt.id} checked={pickupOption === opt.id} onChange={() => setPickupOption(opt.id)} />
              <span className="option-icon">{opt.icon}</span>
              <div className="option-info"><strong>{opt.label}</strong><small>{opt.desc}</small></div>
            </label>
          ))}
        </div>
      </div>
      <div className="option-section">
        <h4>📍 Drop</h4>
        <div className="option-group">
          {options.drop.map((opt) => (
            <label key={opt.id} className={`option-card ${dropOption === opt.id ? 'active' : ''}`}>
              <input type="radio" name="drop" value={opt.id} checked={dropOption === opt.id} onChange={() => setDropOption(opt.id)} />
              <span className="option-icon">{opt.icon}</span>
              <div className="option-info"><strong>{opt.label}</strong><small>{opt.desc}</small></div>
            </label>
          ))}
        </div>
      </div>
      <button className="btn-primary" onClick={() => onSelect({ pickup: pickupOption, drop: dropOption })}>Confirm Options</button>
    </div>
  );
};