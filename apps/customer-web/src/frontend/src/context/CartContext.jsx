import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, openAuthModal } = useAuth();
  const { showToast } = useToast();
  const [cart, setCart] = useState([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [pendingCartAction, setPendingCartAction] = useState(null);

  // Load cart from local storage when user changes
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`coskinn_cart_${user.mobile || user.email}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, [user]);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`coskinn_cart_${user.mobile || user.email}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = useCallback((product) => {
    if (!user) {
      setPendingCartAction(product);
      openAuthModal();
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        showToast(`${product.name} quantity increased.`, 'info');
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        showToast(`✓ ${product.name} added to your cart.`, 'success');
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }, [user, openAuthModal, showToast]);

  useEffect(() => {
    if (user && pendingCartAction) {
      addToCart(pendingCartAction);
      setPendingCartAction(null);
    }
  }, [user, pendingCartAction, addToCart]);

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, delta) => {
    setCart((prevCart) => prevCart.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const openCart = () => setIsCartDrawerOpen(true);
  const closeCart = () => setIsCartDrawerOpen(false);

  const memoizedContextValue = useMemo(() => ({
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartCount, 
    cartSubtotal,
    isCartDrawerOpen,
    openCart,
    closeCart
  }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartSubtotal, isCartDrawerOpen]);

  return (
    <CartContext.Provider value={memoizedContextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
