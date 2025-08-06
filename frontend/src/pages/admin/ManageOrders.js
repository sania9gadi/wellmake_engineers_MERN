import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ManageOrders.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get('http://localhost:9000/api/order/all-orders', 
        {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(res.data);
      setFilteredOrders(res.data); 
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Something went wrong.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleBack = () => {
    navigate('/admin/dashboard');
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:9000/api/order/admin/order/${orderId}/status`, {
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      setFilteredOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update order status.");
    }
  };

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();
    if (term === '') {
      alert('Please enter an Order ID to search.');
      return;
    }

    const results = orders.filter(order =>
      order._id.toLowerCase().includes(term)
    );
    setFilteredOrders(results);
  };

  const handleShowAll = () => {
    setFilteredOrders(orders);
    setSearchTerm('');
  };

  return (
    <div className="manage-orders">
      <h2>Manage Orders</h2>
      <button className="back-button" onClick={handleBack}>← Back to Dashboard</button>

      <div className="search-controls">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
        <button onClick={handleShowAll} className="reset-button">Show All Orders</button>
      </div>

      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="order-cards-container">
          {filteredOrders.map(order => (
            <div key={order._id} className="order-card">
              <h3>Order ID: {order._id}</h3>
              <p><strong>Customer:</strong> {order.customer?.name || 'N/A'}</p>
              <p><strong>Email:</strong> {order.customer?.email || 'N/A'}</p>

              <div className="products">
                <strong>Products:</strong>
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price (₹)</th>
                      <th>Total (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product, index) => (
                      <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>₹{(order.price / order.products.length).toFixed(2)}</td>
                        <td>₹{((order.price / order.products.length) * product.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Price:</td>
                      <td style={{ fontWeight: 'bold' }}>₹{order.price.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <p><strong>Status:</strong> {order.status || 'Pending'}</p>

              <div className="status-select">
                <label>Update Status: </label>
                <select
                  value={order.status || 'Pending'}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
