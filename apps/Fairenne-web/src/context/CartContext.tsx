import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNotification } from './NotificationContext';
import { useAuth } from './AuthContext';
import confetti from 'canvas-confetti';

export interface CartItem {
  id: string; // The cart item id
  productId: string; // The actual product ID
  name: string;
  price: number; 
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  cartTotal: number;
  cartCount: number;
  getCartTotal: () => number;
  fetchCart: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useNotification();
  const { isAuthenticated, openAuthModal, token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  const triggerStars = () => {
    const defaults = { spread: 360, ticks: 50, gravity: 0, decay: 0.94, startVelocity: 30, colors: ['#000000', '#333333', '#111111'] };
    function shoot() {
      confetti({ ...defaults, particleCount: 40, scalar: 1.2, shapes: ['star'] });
      confetti({ ...defaults, particleCount: 10, scalar: 0.75, shapes: ['circle'] });
    }
    setTimeout(shoot, 0); setTimeout(shoot, 100); setTimeout(shoot, 200);
  };

  const fetchCart = async () => {
    if (!isAuthenticated || !token) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/cart`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch cart');
      const data = await res.json();
      
      const items: CartItem[] = data.items.map((item: any) => ({
        id: item.id,
        productId: item.productId,
        name: item.product.name,
        price: Number(item.product.discountPrice || item.product.mrp),
        image: item.product.images?.[0]?.url || 'https://via.placeholder.com/150',
        quantity: item.quantity
      }));
      setCartItems(items);
      setCartTotal(data.summary.finalTotal);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCartItems([]);
      setCartTotal(0);
    }
  }, [isAuthenticated, token]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!isAuthenticated || !token) {
      openAuthModal();
      return;
    }
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/cart/items`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, quantity })
      });
      if (res.ok) {
        await fetchCart();
        setIsCartOpen(true);
        showToast(`Item added to cart!`);
        triggerStars();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (id: string) => {
    if (!token) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/cart/items/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (!token) return;
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/cart/items/${id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity })
      });
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    if (!token) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/cart`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const getCartTotal = () => cartTotal;
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal,
      cartCount,
      getCartTotal,
      fetchCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
