/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Product.css';

function Products() {
  const [products, setProducts] = useState([]);
  const IMAGE_BASE_URL = 'http://localhost:9000';
  useEffect(() => {
    axios.get('http://localhost:9000/api/product')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          title={product.title || product.name || "Untitled"}
          image={`${IMAGE_BASE_URL}${product.imageUrl}`}
          price={product.price}
        />
      ))}
    </div>
  );
}

export default Products;
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Product.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const IMAGE_BASE_URL = 'http://localhost:9000';

  useEffect(() => {
    axios.get('http://localhost:9000/api/product')
      .then((response) => {
        setProducts(response.data);
        const uniqueCategories = ['All', ...new Set(response.data.map(p => p.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(p => p.category === selectedCategory);

  return (
    <div className="products-wrapper">
      <div className="filter-box">
        <label htmlFor="category">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="products-container">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            title={product.title || product.name || "Untitled"}
            image={`${IMAGE_BASE_URL}${product.imageUrl}`}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
