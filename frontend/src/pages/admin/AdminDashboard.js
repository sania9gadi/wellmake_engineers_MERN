import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  // Assuming admin info is stored in localStorage after login
  const adminInfo = JSON.parse(localStorage.getItem('adminInfo')) || {
    name: "Admin",
    email: "admin@example.com",
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <NavLink to="inquiries" className={({ isActive }) => isActive ? 'active' : ''}>
                Inquiries
              </NavLink>
            </li>
            <li>
              <NavLink to="orders" className={({ isActive }) => isActive ? 'active' : ''}>
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink to="add-product" className={({ isActive }) => isActive ? 'active' : ''}>
                Add Product
              </NavLink>
            </li>
            <li>
              <NavLink to="Quote-response" className={({ isActive }) => isActive ? 'active' : ''}>
                Quotation Response
              </NavLink>
            </li>
            <li>
              <NavLink to="all-users" className={({ isActive }) => isActive ? 'active' : ''}>
                All Users
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="content">
        <div className="welcome-box">
          <h2>Hi, {adminInfo.name} 👋</h2>
          <div className="admin-profile">
            <p><strong>Email:</strong> {adminInfo.email}</p>
          </div>
        </div>
        
        <Outlet /> {/* Render nested routes */}
      </main>
    </div>
  );
};

export default AdminDashboard;
