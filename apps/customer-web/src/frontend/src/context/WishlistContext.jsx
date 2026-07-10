import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user, openAuthModal } = useAuth();
  const { showToast } = useToast();
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from local storage when user changes
  useEffect(() => {
    if (user) {
      const savedWishlist = localStorage.getItem(`coskinn_wishlist_${user.mobile || user.email}`);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      } else {
        setWishlist([]);
      }
    } else {
      setWishlist([]);
    }
  }, [user]);

  // Save wishlist to local storage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`coskinn_wishlist_${user.mobile || user.email}`, JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const toggleWishlist = useCallback((product) => {
    if (!user) {
      openAuthModal();
      return;
    }

    setWishlist((prevWishlist) => {
      const existingIndex = prevWishlist.findIndex(item => item.id === product.id);
      if (existingIndex >= 0) {
        // Remove from wishlist
        const newWishlist = [...prevWishlist];
        newWishlist.splice(existingIndex, 1);
        showToast(`Removed from your wishlist.`, 'info');
        return newWishlist;
      } else {
        // Add to wishlist
        showToast(`❤️ ${product.name} saved to wishlist.`, 'success');
        return [...prevWishlist, product];
      }
    });
  }, [user, openAuthModal, showToast]);

  const isInWishlist = useCallback((productId) => {
    return wishlist.some(item => item.id === productId);
  }, [wishlist]);

  const wishlistCount = wishlist.length;

  const memoizedContextValue = useMemo(() => ({
    wishlist, 
    toggleWishlist, 
    isInWishlist, 
    wishlistCount 
  }), [wishlist, toggleWishlist, isInWishlist, wishlistCount]);

  return (
    <WishlistContext.Provider value={memoizedContextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
