// src/pages/user/MyOrders.js

import React, { useEffect, useState } from 'react';
import './MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/order/user/${user?._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          alert(data.message || "Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchOrders();
    }
  }, [user?._id, token]);

  return (
    <div className="orders-list">
      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          <div className="order-header">
            <h3>Order ID: {order._id}</h3>
            <p>Status: <strong>{order.status || 'Pending'}</strong></p>
            <p>Placed On: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="order-items">
            <h4>Items:</h4>
            <ul>
              {order.products.map((item, index) => (
                <li key={index} className="order-item">
                  <div className="item-details">
                    <div className="item-name">{item.name}</div>
                    <div className="item-qty">Quantity: {item.quantity}</div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="order-total">Total: ₹{order.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
