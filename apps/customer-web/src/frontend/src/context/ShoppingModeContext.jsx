import React, { createContext, useContext, useState, useEffect } from 'react';

const ShoppingModeContext = createContext();

export const useShoppingMode = () => {
  const context = useContext(ShoppingModeContext);
  if (!context) {
    throw new Error('useShoppingMode must be used within a ShoppingModeProvider');
  }
  return context;
};

export const ShoppingModeProvider = ({ children }) => {
  // Initialize from localStorage or default to 'skincare'
  const [shoppingMode, setShoppingMode] = useState(() => {
    const savedMode = localStorage.getItem('florie_shopping_mode');
    return savedMode === 'makeup' ? 'makeup' : 'skincare';
  });

  // Persist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('florie_shopping_mode', shoppingMode);
  }, [shoppingMode]);

  const toggleMode = () => {
    setShoppingMode(prev => prev === 'skincare' ? 'makeup' : 'skincare');
  };

  return (
    <ShoppingModeContext.Provider value={{ shoppingMode, setShoppingMode, toggleMode }}>
      {children}
    </ShoppingModeContext.Provider>
  );
};
