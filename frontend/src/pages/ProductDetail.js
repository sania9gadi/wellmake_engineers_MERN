/*import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

function ProductDetail() {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const IMAGE_BASE_URL = 'http://localhost:9000';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${IMAGE_BASE_URL}/api/product/${productId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Error fetching product');
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p style={{ padding: '40px' }}>Loading...</p>;
  if (error) return <p style={{ padding: '40px', color: 'red' }}>Error: {error}</p>;
  if (!product) return <p style={{ padding: '40px' }}>Product not found</p>;

  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img
          src={`${IMAGE_BASE_URL}${product.imageUrl}`}
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.description?.trim() || 'No description available.'}</p>
        <p className="price">₹{product.price.toLocaleString()}</p>

        {product.features?.length > 0 && (
          <>
            <h4>Features:</h4>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </>
        )}

        {product.brochureUrl && (
          <a
            href={
              product.brochureUrl.startsWith('http')
                ? product.brochureUrl
                : `${IMAGE_BASE_URL}${product.brochureUrl}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="btn-download-brochure"
          >
            📄 Download Brochure
          </a>
        )}

        <button
          className="add-to-cart"
          onClick={() =>
            addToCart({
              id: product._id,
              title: product.name,
              price: product.price,
              image: product.imageUrl,
              description: product.description,
              quantity: 1
            })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
*/

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

function ProductDetail() {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const IMAGE_BASE_URL = 'http://localhost:9000';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${IMAGE_BASE_URL}/api/product/${productId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Error fetching product');
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p style={{ padding: '40px' }}>Loading...</p>;
  if (error) return <p style={{ padding: '40px', color: 'red' }}>Error: {error}</p>;
  if (!product) return <p style={{ padding: '40px' }}>Product not found</p>;

  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img
          src={`${IMAGE_BASE_URL}${product.imageUrl}`}
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="price">₹{product.price.toLocaleString()}</p>

        {product.features?.length > 0 && (
          <>
            <h4>Features:</h4>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </>
        )}

        {product.brochureUrl && (
          <a
            href={
              product.brochureUrl.startsWith('http')
                ? product.brochureUrl
                : `${IMAGE_BASE_URL}${product.brochureUrl}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="btn-download-brochure"
          >
            📄 Download Brochure
          </a>
        )}

        <button
          className="add-to-cart"
          onClick={() =>
            addToCart({
              id: product._id,
              title: product.name,
              price: product.price,
              image: product.imageUrl,
              quantity: 1
            })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
