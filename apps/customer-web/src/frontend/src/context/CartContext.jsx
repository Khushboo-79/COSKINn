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
      openAuthModal();
      return;
    }

    try {
      await apiClient.post('/cart/items', { productId: product.id, quantity: qty });
      showToast(`✓ ${product.name} added to your cart.`, 'success');
      await fetchCart();
    } catch (err) {
      console.error('Failed to add to cart:', err);
      showToast('Failed to add to cart', 'error');
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
      console.error('Failed to remove from cart:', err);
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
      console.error('Failed to update quantity:', err);
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
