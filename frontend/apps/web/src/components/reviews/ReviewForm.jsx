import React, { useState } from 'react';
import { Button } from '../common/Button';

export const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment });
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <div className="rating-select">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`star ${star <= rating ? 'filled' : ''}`} onClick={() => setRating(star)}>★</span>
        ))}
      </div>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your review..." className="input-field" rows="3" />
      <Button type="submit">Submit Review</Button>
    </form>
  );
};