// src/context/CartContext.js
import { createContext, useContext, useState } from "react";

// 1. Create Context
const CartContext = createContext();

// 2. Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 3. Add to Cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // 4. Remove from Cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // 5. Clear Entire Cart (use on successful order)
  const clearCart = () => {
    setCartItems([]);
  };

  // 6. Get Total Price
  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price || 0; // fallback if price is undefined
      return total + price * item.quantity;
    }, 0);
  };

  // 7. Get Total Items Count (optional)
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 8. Custom Hook
export const useCart = () => useContext(CartContext);
