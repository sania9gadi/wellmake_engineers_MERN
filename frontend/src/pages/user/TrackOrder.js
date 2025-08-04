import React, { useState } from 'react';
import './TrackOrder.css';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const response = await fetch(`http://localhost:9000/api/order/${orderId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Order not found');
      }

      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="track-order-page">
      <h2>Track Your Order 📦</h2>
      <form onSubmit={handleTrack} className="track-form">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Tracking...' : 'Track'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {order && (
        <div className="order-details">
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong> {order.status || 'Pending'}</p>
          <p><strong>Customer:</strong> {order.customer?.name} ({order.customer?.email})</p>
          <p><strong>Total:</strong> ₹{order.Price}</p>
          <p><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>

          <h4>Items:</h4>
          <ul>
            {order.products.map((item, idx) => (
              <li key={idx}>
                {item.title} × {item.quantity} = ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
