import React from 'react';
import './UserNavbar.css';
import SidebarCart from './SidebarCart'; // make sure path is correct

const UserNavbar = ({ cartOpen, setCartOpen }) => {
  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      {/* 🔷 Navigation Bar */}
      <nav className="navbar">
        <a href="/">Home</a>
        <a href="/user/dashboard">Dashboard</a>
        <a href="/products">Products</a>

        {/* 🛒 Cart Button */}
        <button onClick={() => setCartOpen(true)} className="cart-icon-btn">
          🛒
        </button>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* 🧩 Sidebar Cart Drawer */}
      <SidebarCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default UserNavbar;
