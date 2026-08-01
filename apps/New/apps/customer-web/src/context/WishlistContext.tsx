import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

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
  const isGlam = mode === 'glam';

  const [wishlistSkin, setWishlistSkin] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('coskin_wishlist_skin');
    // Fallback to legacy key if it exists
    if (!saved) {
        const legacy = localStorage.getItem('coskin_wishlist');
        return legacy ? JSON.parse(legacy) : [];
    }
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlistGlam, setWishlistGlam] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('coskin_wishlist_glam');
    return saved ? JSON.parse(saved) : [];
  });

  const currentWishlist = isGlam ? wishlistGlam : wishlistSkin;

  useEffect(() => {
    localStorage.setItem('coskin_wishlist_skin', JSON.stringify(wishlistSkin));
  }, [wishlistSkin]);

  useEffect(() => {
    localStorage.setItem('coskin_wishlist_glam', JSON.stringify(wishlistGlam));
  }, [wishlistGlam]);

  const addToWishlist = (item: WishlistItem) => {
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
