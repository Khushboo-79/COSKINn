import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';
import { useAuth } from './AuthContext';

export interface WishlistItem {
  id: string; // Product ID
  name: string;
  price: number;
  image: string;
  category?: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  wishlistCount: number;
  fetchWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useNotification();
  const { isAuthenticated, openAuthModal, token } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const fetchWishlist = async () => {
    if (!isAuthenticated || !token) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/wishlist`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch wishlist');
      const data = await res.json();
      
      const items: WishlistItem[] = data.items.map((item: any) => ({
        id: item.productId,
        name: item.product.name,
        price: Number(item.product.discountPrice || item.product.mrp),
        image: item.product.images?.[0]?.url || 'https://via.placeholder.com/150',
        category: item.product.categoryId // Adjust based on how category is fetched
      }));
      setWishlistItems(items);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [isAuthenticated, token]);

  const addToWishlist = async (productId: string) => {
    if (!isAuthenticated || !token) {
      openAuthModal();
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/wishlist/${productId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        await fetchWishlist();
        showToast('Item added to wishlist!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromWishlist = async (id: string) => {
    if (!token) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/wishlist/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      await fetchWishlist();
    } catch (err) {
      console.error(err);
    }
  };

  const isInWishlist = (id: string) => {
    return wishlistItems.some(item => item.id === id);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, wishlistCount, fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
