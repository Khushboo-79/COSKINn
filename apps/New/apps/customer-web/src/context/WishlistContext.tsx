import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { useAuth } from './AuthContext';
import api from '../services/api';

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
  const [serverWishlist, setServerWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    localStorage.setItem('coskin_wishlist_glam', JSON.stringify(wishlistGlam));
  }, [wishlistGlam]);

  useEffect(() => {
    localStorage.setItem('coskin_wishlist_skin', JSON.stringify(wishlistSkin));
  }, [wishlistSkin]);

  // Fetch wishlist from server on auth
  useEffect(() => {
    const fetchWishlist = async () => {
      if (isAuthenticated) {
        setIsLoading(true);
        try {
          const res = await api.get('/wishlist');
          if (res.data?.items) {
            const mapped = res.data.items.map((item: any) => ({
              id: item.product.id,
              name: item.product.name,
              price: item.product.discountPrice || item.product.mrp,
              image: item.product.images?.[0]?.url || 'https://via.placeholder.com/150',
            }));
            setServerWishlist(mapped);
          }
        } catch (error) {
          console.error("Failed to load wishlist", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setServerWishlist([]);
      }
    };
    fetchWishlist();
  }, [isAuthenticated]);

  const currentWishlist = isAuthenticated ? serverWishlist : (isGlam ? wishlistGlam : wishlistSkin);

  const addToWishlist = async (item: WishlistItem) => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    
    // Optimistic UI Update
    setServerWishlist(prev => {
      if (prev.find(i => i.id === item.id)) return prev;
      return [...prev, item];
    });

    try {
      await api.post(`/wishlist/${item.id}`);
    } catch (err) {
      console.error("Failed to add to wishlist", err);
      // Revert if failed
      setServerWishlist(prev => prev.filter(i => i.id !== item.id));
    }
  };

  const removeFromWishlist = async (id: string) => {
    if (!isAuthenticated) {
      if (isGlam) setWishlistGlam(prev => prev.filter(item => item.id !== id));
      else setWishlistSkin(prev => prev.filter(item => item.id !== id));
      return;
    }

    // Optimistic UI Update
    const previous = [...serverWishlist];
    setServerWishlist(prev => prev.filter(item => item.id !== id));

    try {
      await api.delete(`/wishlist/${id}`);
    } catch (err) {
      console.error("Failed to remove from wishlist", err);
      setServerWishlist(previous); // Revert
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
