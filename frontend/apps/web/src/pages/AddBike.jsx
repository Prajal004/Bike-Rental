import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motorcycleAPI } from '@rental/shared/api';

const AddBike = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    year: '',
    cc: '',
    pricePerDay: '',
    description: '',
    shopId: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.brand || !formData.pricePerDay) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await motorcycleAPI.create({
        ...formData,
        year: parseInt(formData.year),
        cc: parseInt(formData.cc),
        pricePerDay: parseFloat(formData.pricePerDay),
      });
      if (response.success) {
        alert('Bike added successfully!');
        navigate('/');
      }
    } catch (error) {
      alert('Failed to add bike: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-bike-page">
      <h2>Add New Bike</h2>
      <p className="subtitle">List your bike for rental</p>

      <form onSubmit={handleSubmit} className="add-bike-form">
        <div className="form-group">
          <label>Bike Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Honda CB Shine"
            className="input-field"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Brand *</label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select Brand</option>
              <option value="Honda">Honda</option>
              <option value="Yamaha">Yamaha</option>
              <option value="TVS">TVS</option>
              <option value="Bajaj">Bajaj</option>
              <option value="Royal Enfield">Royal Enfield</option>
              <option value="Suzuki">Suzuki</option>
              <option value="KTM">KTM</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="2024"
              className="input-field"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>CC</label>
            <input
              type="number"
              name="cc"
              value={formData.cc}
              onChange={handleChange}
              placeholder="125"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Price Per Day (Rs) *</label>
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleChange}
              placeholder="350"
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the bike"
            className="input-field"
            rows="3"
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Bike'}
        </button>
      </form>

      <style>{`
        .add-bike-page { padding: 8px 0 20px; }
        .add-bike-page h2 { font-size: 24px; font-weight: 700; }
        .subtitle { color: #888; font-size: 14px; margin-bottom: 20px; }

        .add-bike-form { display: flex; flex-direction: column; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-weight: 600; font-size: 14px; color: #333; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .form-group textarea { resize: vertical; min-height: 80px; }
        .form-group select { appearance: auto; }
      `}</style>
    </div>
  );
};

export default AddBike;
