import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BikeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [days, setDays] = useState(1);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const bikeData = {
    1: { name: 'Honda CB Shine', brand: 'Honda', year: 2024, cc: 125, pricePerDay: 350, description: 'Best commuter bike in Nepal.', available: true, rating: 4.5 },
    2: { name: 'Yamaha FZ', brand: 'Yamaha', year: 2024, cc: 150, pricePerDay: 400, description: 'Stylish street bike.', available: true, rating: 4.6 },
    3: { name: 'TVS Apache', brand: 'TVS', year: 2024, cc: 160, pricePerDay: 380, description: 'Performance bike.', available: false, rating: 4.3 },
    4: { name: 'Royal Enfield Classic', brand: 'Royal Enfield', year: 2024, cc: 350, pricePerDay: 1200, description: 'Classic cruiser bike.', available: true, rating: 4.8 },
  };

  const bike = bikeData[id] || bikeData[1];
  const images = [
    '/assets/images/honda-cb-shine.png',
    '/assets/images/yamaha-fz.png',
    '/assets/images/tvs-apache.png',
    '/assets/images/royal-enfield.png'
  ];

  const [bikeState, setBikeState] = useState({
    ...bike,
    images: images,
    reviews: [
      { id: 1, user: 'Ram K.', rating: 5, comment: 'Amazing bike!', date: '2026-07-28' },
      { id: 2, user: 'Sita P.', rating: 4, comment: 'Good ride.', date: '2026-07-27' },
    ]
  });

  const handleAddReview = () => {
    if (!newReview.comment.trim()) {
      alert('Please write a comment');
      return;
    }
    const review = {
      id: bikeState.reviews.length + 1,
      user: 'You',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
    };
    setBikeState({
      ...bikeState,
      reviews: [review, ...bikeState.reviews],
      rating: (bikeState.rating + newReview.rating) / 2,
    });
    setNewReview({ rating: 5, comment: '' });
    alert('✅ Review added!');
  };

  const totalPrice = bikeState.pricePerDay * days;

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <div style={{ textAlign: 'center' }}>
        <img src={bikeState.images[selectedImage]} alt={bikeState.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px', marginBottom: '12px' }} />
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {bikeState.images.map((img, index) => (
            <img key={index} src={img} alt={`${bikeState.name} ${index + 1}`} onClick={() => setSelectedImage(index)} style={{ width: '60px', height: '50px', objectFit: 'cover', borderRadius: '8px', border: selectedImage === index ? '3px solid #4CAF50' : '2px solid #ddd', cursor: 'pointer' }} />
          ))}
        </div>
      </div>

      <h1>{bikeState.name}</h1>
      <p style={{ color: '#888' }}>{bikeState.brand} · {bikeState.year} · {bikeState.cc}cc</p>
      <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#4CAF50' }}>Rs {bikeState.pricePerDay} <span style={{ fontSize: '14px', color: '#888', fontWeight: 'normal' }}>/ day</span></p>

      <p style={{ marginTop: '8px' }}>
        <span style={{ padding: '4px 12px', borderRadius: '12px', background: bikeState.available ? '#dcfce7' : '#fee2e2', color: bikeState.available ? '#166534' : '#991b1b', fontWeight: 'bold', fontSize: '14px' }}>
          {bikeState.available ? '✅ Available' : '❌ Unavailable'}
        </span>
      </p>

      <div style={{ marginTop: '16px' }}>
        <h4>Description</h4>
        <p style={{ color: '#666' }}>{bikeState.description}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4>⭐ Reviews ({bikeState.reviews.length})</h4>
          <span style={{ color: '#f5a623' }}>Average: {bikeState.rating.toFixed(1)}</span>
        </div>

        <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '8px', marginBottom: '12px', border: '1px solid #eee' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{ fontWeight: '600' }}>Rating:</label>
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setNewReview({ ...newReview, rating: star })} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: star <= newReview.rating ? '#f5a623' : '#ddd' }}>★</button>
            ))}
          </div>
          <textarea placeholder="Write your review..." value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', minHeight: '60px' }} />
          <button onClick={handleAddReview} style={{ padding: '6px 16px', marginTop: '8px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit Review</button>
        </div>

        {bikeState.reviews.map((review) => (
          <div key={review.id} style={{ background: '#f8f9fa', padding: '12px', borderRadius: '8px', marginBottom: '8px', border: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{review.user}</strong>
              <span style={{ color: '#f5a623' }}>{'⭐'.repeat(review.rating)}</span>
            </div>
            <p style={{ margin: '4px 0', color: '#555' }}>{review.comment}</p>
            <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>{review.date}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', background: '#f5f5f5', padding: '16px', borderRadius: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <label style={{ fontWeight: '600' }}>📅 Days:</label>
          <button onClick={() => setDays(Math.max(1, days - 1))} style={{ padding: '4px 12px', background: '#ddd', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>−</button>
          <span style={{ fontWeight: '600', minWidth: '24px', textAlign: 'center' }}>{days}</span>
          <button onClick={() => setDays(days + 1)} style={{ padding: '4px 12px', background: '#ddd', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
          <span>Total:</span>
          <span style={{ color: '#4CAF50' }}>Rs {totalPrice}</span>
        </div>

        <button onClick={() => navigate('/booking', { state: { bike: bikeState, days, totalPrice } })} style={{ width: '100%', padding: '14px', marginTop: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Book Now</button>
      </div>
    </div>
  );
};

export default BikeDetail;
