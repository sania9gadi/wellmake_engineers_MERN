import React from 'react';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
        <a href="/">Home</a>
      <a href="/admin/dashboard">Dashboard</a>
      <a href="/admin/orders">Orders</a>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default AdminNavbar;
