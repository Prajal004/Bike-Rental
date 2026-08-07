import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BikeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [days, setDays] = useState(1);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const bike = {
    id: id,
    name: 'Honda CB Shine',
    brand: 'Honda',
    year: 2024,
    cc: 125,
    pricePerDay: 350,
    description: 'Best commuter bike in Nepal. Excellent mileage and comfortable ride.',
    available: true,
    rating: 4.5,
    images: [
      'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Honda+CB+Shine',
      'https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Honda+CB+Shine+Side',
      'https://via.placeholder.com/400x300/FF9800/FFFFFF?text=Honda+CB+Shine+Rear',
      'https://via.placeholder.com/400x300/9C27B0/FFFFFF?text=Honda+CB+Shine+Front',
    ],
    reviews: [
      { id: 1, user: 'Ram K.', rating: 5, comment: 'Amazing bike! Perfect for city rides.', date: '2026-07-28' },
      { id: 2, user: 'Sita P.', rating: 4, comment: 'Good condition, smooth ride.', date: '2026-07-27' },
      { id: 3, user: 'Hari S.', rating: 3, comment: 'Average bike, but value for money.', date: '2026-07-26' },
    ]
  };

  const [bikeState, setBikeState] = useState(bike);

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

  const handleDeleteReview = (id) => {
    if (window.confirm('Delete this review?')) {
      setBikeState({
        ...bikeState,
        reviews: bikeState.reviews.filter(r => r.id !== id),
      });
      alert('✅ Review deleted!');
    }
  };

  const totalPrice = bikeState.pricePerDay * days;

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      {/* ✅ Images Gallery */}
      <div style={{ textAlign: 'center' }}>
        <img
          src={bikeState.images[selectedImage]}
          alt={bikeState.name}
          style={{
            width: '100%',
            height: '250px',
            objectFit: 'cover',
            borderRadius: '12px',
            background: '#f5f5f5',
          }}
        />
        {/* ✅ Thumbnails */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px' }}>
          {bikeState.images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              style={{
                width: '60px',
                height: '60px',
                padding: '0',
                border: selectedImage === index ? '3px solid #4CAF50' : '2px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                overflow: 'hidden',
                background: 'white',
              }}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </button>
          ))}
        </div>
      </div>

      <h1>{bikeState.name}</h1>
      <p style={{ color: '#888' }}>{bikeState.brand} · {bikeState.year} · {bikeState.cc}cc</p>
      <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#4CAF50' }}>
        Rs {bikeState.pricePerDay} <span style={{ fontSize: '14px', color: '#888', fontWeight: 'normal' }}>/ day</span>
      </p>

      <p style={{ marginTop: '8px' }}>
        <span style={{
          padding: '4px 12px',
          borderRadius: '12px',
          background: bikeState.available ? '#dcfce7' : '#fee2e2',
          color: bikeState.available ? '#166534' : '#991b1b',
          fontWeight: 'bold',
          fontSize: '14px',
        }}>
          {bikeState.available ? '✅ Available' : '❌ Unavailable'}
        </span>
      </p>

      <div style={{ marginTop: '16px' }}>
        <h4>Description</h4>
        <p style={{ color: '#666' }}>{bikeState.description}</p>
      </div>

      {/* ✅ Reviews Section */}
      <div style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4>⭐ Reviews ({bikeState.reviews.length})</h4>
          <span style={{ color: '#f5a623' }}>Average: {bikeState.rating.toFixed(1)}</span>
        </div>

        {/* Add Review Form */}
        <div style={{
          background: '#f8f9fa',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '12px',
          border: '1px solid #eee',
        }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{ fontWeight: '600' }}>Rating:</label>
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setNewReview({ ...newReview, rating: star })} style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: star <= newReview.rating ? '#f5a623' : '#ddd',
              }}>★</button>
            ))}
          </div>
          <textarea
            placeholder="Write your review..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', minHeight: '60px' }}
          />
          <button onClick={handleAddReview} style={{
            padding: '6px 16px',
            marginTop: '8px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}>Submit Review</button>
        </div>

        {/* Reviews List */}
        {bikeState.reviews.map((review) => (
          <div key={review.id} style={{
            background: '#f8f9fa',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '8px',
            border: '1px solid #eee',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{review.user}</strong>
              <div>
                <span style={{ color: '#f5a623' }}>{'⭐'.repeat(review.rating)}</span>
                {review.user === 'You' && (
                  <button onClick={() => handleDeleteReview(review.id)} style={{
                    marginLeft: '8px',
                    padding: '2px 8px',
                    background: '#E53935',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}>Delete</button>
                )}
              </div>
            </div>
            <p style={{ margin: '4px 0', color: '#555' }}>{review.comment}</p>
            <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>{review.date}</p>
          </div>
        ))}
      </div>

      {/* Booking Section */}
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

        <button onClick={() => navigate('/booking', { state: { bike: bikeState, days, totalPrice } })} style={{
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
        }}>Book Now</button>
      </div>
    </div>
  );
};

export default BikeDetail;
