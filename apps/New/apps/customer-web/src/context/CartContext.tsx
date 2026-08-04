import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';

export interface CartItem {
  id: string; // Used as cartItemId if from server, otherwise productId
  productId: string;
  name: string;
  price: number; 
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  cartTotal: number; // Total in INR — use CurrencyContext.formatPrice() to display
  cartCount: number;
  getCartTotal: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
  const [serverCartItems, setServerCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cartItems = isAuthenticated ? serverCartItems : localCartItems;

  useEffect(() => {
    const fetchCart = async () => {
      if (isAuthenticated) {
        setIsLoading(true);
        try {
          const res = await api.get('/cart');
          if (res.data?.items) {
            const mapped = res.data.items.map((item: any) => ({
              id: item.id, // Cart Item ID
              productId: item.productId,
              name: item.product.name,
              price: Number(item.product.discountPrice || item.product.mrp),
              image: item.product.images?.[0]?.url || 'https://via.placeholder.com/150',
              quantity: item.quantity
            }));
            setServerCartItems(mapped);
          }
        } catch (err) {
          console.error("Failed to load cart", err);
        } finally {
          setIsLoading(false);
        }
      } else {
        setServerCartItems([]);
      }
    };
    fetchCart();
  }, [isAuthenticated]);

  const addToCart = async (newItem: CartItem) => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    // Optimistic UI for Server Cart
    setServerCartItems(prev => {
      const existing = prev.find(item => item.productId === newItem.productId);
      if (existing) {
        return prev.map(item => 
          item.productId === newItem.productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: 1, id: 'temp-' + Date.now() }];
    });

    try {
      const res = await api.post('/cart/items', {
        productId: newItem.productId,
        quantity: 1
      });
      // Sync with exact server state
      if (res.data?.items) {
        const mapped = res.data.items.map((item: any) => ({
          id: item.id,
          productId: item.productId,
          name: item.product.name,
          price: Number(item.product.discountPrice || item.product.mrp),
          image: item.product.images?.[0]?.url || 'https://via.placeholder.com/150',
          quantity: item.quantity
        }));
        setServerCartItems(mapped);
      }
    } catch (err) {
      console.error("Failed to add to cart", err);
      // Ideally we'd revert here, but for now we'll just log
    }
  };

  const removeFromCart = async (id: string) => {
    if (!isAuthenticated) {
      setLocalCartItems(prev => prev.filter(item => item.id !== id));
      return;
    }

    const previous = [...serverCartItems];
    setServerCartItems(prev => prev.filter(item => item.id !== id));

    try {
      await api.delete(`/cart/items/${id}`);
    } catch (err) {
      setServerCartItems(previous);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    if (!isAuthenticated) {
      setLocalCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
      return;
    }

    const previous = [...serverCartItems];
    setServerCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));

    try {
      await api.put(`/cart/items/${id}`, { quantity });
    } catch (err) {
      setServerCartItems(previous);
    }
  };

  // cartTotal is always in INR (the base currency)
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const getCartTotal = () => {
    return cartTotal;
  };

  const clearCart = () => {
    if (isAuthenticated) {
      setServerCartItems([]);
    } else {
      setLocalCartItems([]);
      localStorage.removeItem('coskinn_cart');
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal,
      cartCount: cartItems.reduce((total, item) => total + item.quantity, 0),
      getCartTotal,
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
