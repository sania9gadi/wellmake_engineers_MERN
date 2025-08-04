// src/pages/ProductCategory.js
import React from 'react';
import { useParams } from 'react-router-dom';
import productsData from '../data/productsData';
import ProductCard from '../components/ProductCard';

function ProductCategory() {
  const { category } = useParams();
  const products = productsData[category] || [];

  return (
    <div className="section">
      <h2 style={{ marginBottom: "30px" }}>
        {category.replace(/-/g, ' ').toUpperCase()}
      </h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
}

export default ProductCategory;
