import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    brochureUrl: '',
    category: '',
    subcategory: '',
    features: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        features: formData.features.split(',').map(f => f.trim())
      };

      await axios.post('http://localhost:9000/api/product/add', productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      alert('✅ Product added successfully!');
      setFormData({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        brochureUrl: '',
        category: '',
        subcategory: '',
        features: ''
      });
    } catch (error) {
      console.error('❌ Error adding product:', error.response?.data || error.message);
      alert('❌ Failed to add product. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} required />
        <input type="text" name="brochureUrl" placeholder="Brochure URL" value={formData.brochureUrl} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category (e.g. Cold Rooms)" value={formData.category} onChange={handleChange} required />
        <input type="text" name="subcategory" placeholder="Subcategory (e.g. Modular Cold Room)" value={formData.subcategory} onChange={handleChange} required />
        <textarea name="features" placeholder="Features (comma separated)" value={formData.features} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Product'}</button>
      </form>
    </div>
  );
};

export default AddProduct;
