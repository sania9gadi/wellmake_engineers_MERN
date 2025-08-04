import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import SidebarCart from '../../components/SidebarCart';
import './UserDashboard.css';

const UserDashboard = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="user-dashboard">
      <div className="dashboard-body">
        <aside className="sidebar">
          <h2>User Panel</h2>
          <nav>
            <ul>
              
              <li>
                <NavLink to="MyOrders" className={({ isActive }) => isActive ? 'active' : ''}>
                  My Orders
                </NavLink>
              </li>
             <li>
                <NavLink to="MyInquiries" className={({ isActive }) => isActive ? 'active' : ''}>
                  My Inquiries
                </NavLink>
              </li>
              <li>
                <NavLink to="MyQuotations" className={({ isActive }) => isActive ? 'active' : ''}>
                  My Quotations
                </NavLink>
              </li>
              <li>
                <NavLink to="helpcenter" className={({ isActive }) => isActive ? 'active' : ''}>
                 Help Center
                </NavLink>
              </li>  
            </ul>
          </nav>
        </aside>

        <main className="content">
          <Outlet />
        </main>
      </div>

      <SidebarCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default UserDashboard;
