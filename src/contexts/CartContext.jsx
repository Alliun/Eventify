import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (event) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === event.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === event.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...event, quantity: 1 }];
    });
  };

  const removeFromCart = (eventId) => {
    setCartItems(prev => prev.filter(item => item.id !== eventId));
  };

  const updateQuantity = (eventId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(eventId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === eventId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.quantity * 1), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};