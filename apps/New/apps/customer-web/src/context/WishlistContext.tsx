import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { useAuth } from './AuthContext';

export interface WishlistItem {
  id: string;
  name: string;
  price: string | number;
  image: string;
  category?: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mode } = useTheme();
  const { isAuthenticated, openAuthModal } = useAuth();
  const isGlam = mode === 'glam';

  const [wishlistSkin, setWishlistSkin] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('coskin_wishlist_skin');
      if (!saved) {
        const legacy = localStorage.getItem('coskin_wishlist');
        const parsedLegacy = legacy ? JSON.parse(legacy) : [];
        return Array.isArray(parsedLegacy) ? parsedLegacy : [];
      }
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  const [wishlistGlam, setWishlistGlam] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('coskin_wishlist_glam');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  const currentWishlist = isGlam ? wishlistGlam : wishlistSkin;

  useEffect(() => {
    localStorage.setItem('coskin_wishlist_skin', JSON.stringify(wishlistSkin));
  }, [wishlistSkin]);

  useEffect(() => {
    localStorage.setItem('coskin_wishlist_glam', JSON.stringify(wishlistGlam));
  }, [wishlistGlam]);

  const addToWishlist = (item: WishlistItem) => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    if (isGlam) {
      setWishlistGlam(prev => {
        if (prev.find(i => i.id === item.id)) return prev;
        return [...prev, item];
      });
    } else {
      setWishlistSkin(prev => {
        if (prev.find(i => i.id === item.id)) return prev;
        return [...prev, item];
      });
    }
  };

  const removeFromWishlist = (id: string) => {
    if (isGlam) {
      setWishlistGlam(prev => prev.filter(item => item.id !== id));
    } else {
      setWishlistSkin(prev => prev.filter(item => item.id !== id));
    }
  };

  const isInWishlist = (id: string) => {
    return currentWishlist.some(item => item.id === id);
  };

  const wishlistCount = currentWishlist.length;

  return (
    <WishlistContext.Provider value={{ 
      wishlistItems: currentWishlist, 
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist, 
      wishlistCount 
    }}>
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
