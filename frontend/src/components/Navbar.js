// ✅ FINAL UPDATED NAVBAR.JS

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext"; // Dark mode context
import { useCart } from "../context/CartContext";    // 🛒 Cart context
import "./Navbar.css";
import logo from "../assets/wme-logo.jpg";

const Navbar = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const [showLinks, setShowLinks] = useState(false);

  const { cartItems } = useCart(); // ✅ Cart items from context
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0); // Count total quantity

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className="logo-img" />
        Wellmake
      </div>

      {/* Hamburger for mobile */}
      <div className="hamburger" onClick={() => setShowLinks(!showLinks)}>
        ☰
      </div>

      {/* Nav Links */}
      <ul className={`navbar-links ${showLinks ? "show" : ""}`}>
        <li><Link to="/" onClick={() => setShowLinks(false)}>Home</Link></li>
        <li><Link to="/products" onClick={() => setShowLinks(false)}>Products</Link></li>
        <li><Link to="/inquiry" onClick={() => setShowLinks(false)}>Contact Us</Link></li>

        {role === "user" && (
          <>
            <li><Link to="/user/dashboard" onClick={() => setShowLinks(false)}>Dashboard</Link></li>
          </>
        )}

        {role === "admin" && (
          <li><Link to="/admin/dashboard" onClick={() => setShowLinks(false)}>Dashboard</Link></li>
        )}

        {!role && (
          <>
            <li><Link to="/login" onClick={() => setShowLinks(false)}>Login</Link></li>
            <li><Link to="/signup" onClick={() => setShowLinks(false)}>Signup</Link></li>
          </>
        )}
      </ul>

      {/* Right Side Controls */}
      <div className="navbar-controls">
        {/* 🌙 Dark Mode Toggle */}
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* 🛒 Cart Button */}
        {role === "user" && (
          <button className="cart-button" onClick={() => navigate("/cart")}>
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        )}

        {/* 🔓 Logout */}
        {role && (
          <button className="logout-button" onClick={logout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
