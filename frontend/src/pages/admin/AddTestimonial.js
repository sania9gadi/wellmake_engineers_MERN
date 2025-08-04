// ✅ AddTestimonial.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddTestimonial = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    rating: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/admin/testimonials', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Testimonial added successfully');
      setFormData({ name: '', message: '', rating: '' });
    } catch (error) {
      console.error('Error adding testimonial:', error);
      alert('Failed to add testimonial');
    }
  };

  return (
    <div>
      <h3>Add New Testimonial</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />
        <input type="number" name="rating" placeholder="Rating (1-5)" value={formData.rating} onChange={handleChange} required min="1" max="5" />
        <button type="submit">Add Testimonial</button>
      </form>
    </div>
  );
};

export default AddTestimonial;
