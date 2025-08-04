import React from 'react';
import './SidebarCart.css'; // Create this file for styling

const SidebarCart = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar-cart ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Your Cart</h2>
        {/* Your cart items go here */}
      </div>
    </div>
  );
};

export default SidebarCart;
