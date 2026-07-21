import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import apiClient from '../utils/apiClient';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, openAuthModal } = useAuth();
  const { showToast } = useToast();
  const [cart, setCart] = useState([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [pendingCartAction, setPendingCartAction] = useState(null);

  const [cartSummary, setCartSummary] = useState(null);

  const fetchCart = useCallback(async () => {
    if (!user) {
      setCart([]);
      setCartSummary(null);
      return;
    }
    try {
      const res = await apiClient.get('/cart');
      const backendCart = res.data;
      
      const mappedItems = backendCart.items.map(item => ({
        cartItemId: item.id, // The ID of the cart_item row
        id: item.product.id, // The product ID, used by frontend
        name: item.product.name,
        slug: item.product.slug,
        price: item.product.discountPrice || item.product.mrp,
        originalPrice: item.product.mrp,
        image: item.product.images?.[0]?.url || '',
        quantity: item.quantity
      }));

      setCart(mappedItems);
      setCartSummary(backendCart.summary);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  }, [user]);

  // Load cart on user change
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = useCallback(async (product, qty = 1) => {
    if (!user) {
      setPendingCartAction(product);
      openAuthModal();
      return;
    }

    try {
      await apiClient.post('/cart/items', { productId: product.id, quantity: qty });
      showToast(`✓ ${product.name} added to your cart.`, 'success');
      await fetchCart();
      setIsCartDrawerOpen(true);
    } catch (err) {
      console.warn('Backend cart failed, using local fallback for:', product.name);
      setCart(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
          return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
        }
        return [...prev, {
          cartItemId: Math.random().toString(36).substr(2, 9),
          id: product.id,
          name: product.name,
          slug: product.slug || '',
          price: product.price || product.discountPrice || product.originalPrice,
          originalPrice: product.originalPrice,
          image: product.image || product.images?.[0] || '',
          quantity: qty
        }];
      });
      showToast(`✓ ${product.name} added to your cart (Offline Mode).`, 'success');
      setIsCartDrawerOpen(true);
    }
  }, [user, openAuthModal, showToast, fetchCart]);

  const removeFromCart = useCallback(async (productId) => {
    try {
      const item = cart.find(i => i.id === productId);
      if (item && item.cartItemId) {
        await apiClient.delete(`/cart/items/${item.cartItemId}`);
        await fetchCart();
      }
    } catch (err) {
      console.warn('Backend cart failed, using local fallback to remove');
      setCart(prev => prev.filter(item => item.id !== productId));
    }
  }, [cart, fetchCart]);

  const updateQuantity = useCallback(async (productId, delta) => {
    try {
      const item = cart.find(i => i.id === productId);
      if (item && item.cartItemId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        await apiClient.put(`/cart/items/${item.cartItemId}`, { quantity: newQuantity });
        await fetchCart();
      }
    } catch (err) {
      console.warn('Backend cart failed, using local fallback to update quantity');
      setCart(prev => prev.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      }));
    }
  }, [cart, fetchCart]);

  const clearCart = useCallback(async () => {
    try {
      await apiClient.delete('/cart');
      setCart([]);
      setCartSummary(null);
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  }, []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const openCart = () => setIsCartDrawerOpen(true);
  const closeCart = () => setIsCartDrawerOpen(false);

  const memoizedContextValue = useMemo(() => ({
    cart,
    cartSummary, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartCount, 
    cartSubtotal,
    isCartDrawerOpen,
    openCart,
    closeCart
  }), [cart, cartSummary, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartSubtotal, isCartDrawerOpen]);

  return (
    <CartContext.Provider value={memoizedContextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
