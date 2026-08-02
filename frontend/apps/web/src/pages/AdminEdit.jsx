import React, { useState } from 'react';

const AdminEdit = ({ type, data, onSave }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    alert(`${type} updated successfully!`);
  };

  const fields = type === 'customer' ? ['name', 'email', 'phone'] :
                 type === 'shop' ? ['shopName', 'address', 'phone', 'email'] :
                 ['name', 'brand', 'year', 'cc', 'pricePerDay'];

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', background: 'white', borderRadius: '8px', border: '1px solid #eee' }}>
      <h3>Edit {type.charAt(0).toUpperCase() + type.slice(1)}</h3>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field} style={{ marginBottom: '10px' }}>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input type="text" name={field} value={formData[field] || ''} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
          </div>
        ))}
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save Changes</button>
      </form>
    </div>
  );
};

export default AdminEdit;
