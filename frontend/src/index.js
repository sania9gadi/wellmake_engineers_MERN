// index.js ya main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext'; // ✅ Import ThemeProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>         {/* ✅ Wrap ThemeProvider first */}
      <CartProvider>        {/* ✅ Then wrap CartProvider */}
        <App />
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);
