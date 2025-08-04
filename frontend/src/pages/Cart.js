/*import React from 'react';
import { useCart } from '../context/CartContext'; 
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/order');
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => {
              const imageUrl = `http://localhost:9000${encodeURI(item.image)}`;

              return (
                <div className="cart-item" key={item.id || item._id}>
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="cart-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.avif";
                    }}
                  />
                  <div className="cart-details">
                    <h4>{item.title}</h4>
                    <p>Price: ₹{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: ₹{item.price * item.quantity}</p>
                    <button onClick={() => removeFromCart(item.id || item._id)} className="remove-btn">
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h3>Total to Pay: ₹{totalPrice}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
*/




import React from 'react';
import { useCart } from '../context/CartContext'; 
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const IMAGE_BASE_URL = 'http://localhost:9000';

  const handleCheckout = () => {
    navigate('/order');
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => {
              const imageUrl = `${IMAGE_BASE_URL}${encodeURI(item.image)}`;

              return (
                <div className="cart-item" key={item.id || item._id}>
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="cart-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.avif";
                    }}
                  />
                  <div className="cart-details">
                    <h4>{item.title}</h4>
                    <p>Price: ₹{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: ₹{item.price * item.quantity}</p>
                    <button onClick={() => removeFromCart(item.id || item._id)} className="remove-btn">
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h3>Total to Pay: ₹{totalPrice}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;


/*
import React from 'react';
import { useCart } from '../context/CartContext'; 
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const IMAGE_BASE_URL = 'http://localhost:9000';

  const handleCheckout = () => {
    navigate('/order');
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => {
              const imageUrl = `${IMAGE_BASE_URL}${item.image}`;

              return (
                <div className="cart-item" key={item.id || item._id}>
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="cart-img"
                  />
                  <div className="cart-details">
                    <h4>{item.title}</h4>
                    <p>Price: ₹{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: ₹{item.price * item.quantity}</p>
                    <button onClick={() => removeFromCart(item.id || item._id)} className="remove-btn">
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h3>Total to Pay: ₹{totalPrice}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
*/