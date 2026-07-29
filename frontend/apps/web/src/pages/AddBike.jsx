import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBike = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    year: '',
    cc: '',
    pricePerDay: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Bike added successfully! (Mock)');
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2>Add New Bike</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Bike Name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }} required />
        <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }} required />
        <input type="number" name="year" placeholder="Year" value={formData.year} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
        <input type="number" name="cc" placeholder="CC" value={formData.cc} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
        <input type="number" name="pricePerDay" placeholder="Price Per Day" value={formData.pricePerDay} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows="3" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px' }}>Add Bike</button>
      </form>
    </div>
  );
};

export default AddBike;
