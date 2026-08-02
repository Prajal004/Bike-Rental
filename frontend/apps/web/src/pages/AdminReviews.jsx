import React, { useState } from 'react';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([
    { id: 1, user: 'Ram K.', bike: 'Honda CB Shine', rating: 5, comment: 'Amazing bike!', date: '2026-07-28' },
    { id: 2, user: 'Sita P.', bike: 'Yamaha FZ', rating: 4, comment: 'Good ride', date: '2026-07-27' },
    { id: 3, user: 'Hari S.', bike: 'TVS Apache', rating: 3, comment: 'Average', date: '2026-07-26' },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Delete this review?')) {
      setReviews(reviews.filter(r => r.id !== id));
      alert('Review deleted!');
    }
  };

  return (
    <div>
      <h2>⭐ All Reviews</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', marginTop: '16px' }}>
        <thead style={{ background: '#f5f5f5' }}>
          <tr>
            <th style={{ padding: '10px', textAlign: 'left' }}>User</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Bike</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Rating</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Comment</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{r.user}</td>
              <td style={{ padding: '10px' }}>{r.bike}</td>
              <td style={{ padding: '10px' }}>{'⭐'.repeat(r.rating)}</td>
              <td style={{ padding: '10px' }}>{r.comment}</td>
              <td style={{ padding: '10px' }}>{r.date}</td>
              <td style={{ padding: '10px' }}>
                <button onClick={() => handleDelete(r.id)} style={{ padding: '4px 12px', background: '#E53935', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReviews;
