import { useNavigate } from "react-router-dom";
import './ProductCard.css';
import { useCart } from '../context/CartContext';

function ProductCard({ id, title, description, image, price }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const role = localStorage.getItem('role'); 
    if (!role) {
      alert('Please login first to add items to cart.');
      navigate('/login');
      return;
    }

    addToCart({ id, title, price, image, description, quantity: 1 });
  };

  return (
    <div className="product-card-list">
      <img src={image} alt={title} className="product-img-list" />

      <div className="product-details">
        <h3>{title}</h3>
        <p>{description}</p>
        <p><strong>₹{price.toLocaleString()}</strong></p>

        <div className="card-actions">
          <button onClick={() => navigate(`/products/details/${id}`)}>View Details</button>
          
          <a href="/get-quote">
            <button>Get Quotation</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
