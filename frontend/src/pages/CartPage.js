/* src/pages/CartPage.js
import React from 'react';
import { useCart } from '../context/CartContext';
import './CartPage.css';

function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td><img src={item.image} alt={item.title} className="cart-img" /></td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.price * item.quantity}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-total">
            <h3>Total: ₹{totalPrice}</h3>
            <button className="checkout-btn">Proceed ssto Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
*/


import React from 'react';
import { useCart } from '../context/CartContext';
import './CartPage.css';

function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const IMAGE_BASE_URL = 'http://localhost:9000';

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const imageUrl = `${IMAGE_BASE_URL}${item.image}`;

                return (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>
                      <img
                        src={imageUrl}
                        alt={item.title}
                        className="cart-img"
                      />
                    </td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price}</td>
                    <td>₹{item.price * item.quantity}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="cart-total">
            <h3>Total: ₹{totalPrice}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;





/*
import React from 'react';
import { useCart } from '../context/CartContext';
import './CartPage.css';

function CartPage() {
  const { cartItems, removeFromCart, totalPrice } = useCart();
  const IMAGE_BASE_URL = 'http://localhost:9000';

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const imageUrl = `${IMAGE_BASE_URL}${item.image}`;

                return (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>
                      <img
                        src={imageUrl}
                        alt={item.title}
                        className="cart-img"
                      />
                    </td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price}</td>
                    <td>₹{item.price * item.quantity}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="cart-total">
            <h3>Total: ₹{totalPrice}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
*/