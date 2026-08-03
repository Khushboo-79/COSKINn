import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import apiClient from '../utils/apiClient';
import { skincareProducts } from '../constants/skincareProducts';
import { cosmeticsProducts } from '../constants/cosmeticsProducts';

const ALL_MOCK_PRODUCTS = [...skincareProducts, ...cosmeticsProducts];

// Robust helper to map frontend product (id, slug, or name) to existing backend database Product UUID
function resolveBackendProductId(product, apiProducts = []) {
  if (!product) return null;

  // 1. Check if product.id or product.productId is already a valid backend UUID string
  const idCand = product.id || product.productId;
  if (typeof idCand === 'string' && idCand.includes('-') && idCand.length > 20) {
    return idCand;
  }

  // 2. Lookup by slug in apiProducts
  const targetSlug = (product.slug || '').toLowerCase().trim();
  if (targetSlug && apiProducts.length > 0) {
    const matchedBySlug = apiProducts.find(p => {
      const pSlug = (p.slug || '').toLowerCase().trim();
      return pSlug === targetSlug ||
        pSlug === `fairenne-${targetSlug}` ||
        pSlug.replace(/^fairenne-/, '') === targetSlug.replace(/^fairenne-/, '');
    });
    if (matchedBySlug) {
      return String(matchedBySlug.id);
    }
  }

  // 3. Lookup by name in apiProducts
  const targetName = (product.name || '').toLowerCase().trim();
  if (targetName && apiProducts.length > 0) {
    const matchedByName = apiProducts.find(p => {
      const pName = (p.name || '').toLowerCase().trim();
      return pName === targetName ||
        pName === `fairenne ${targetName}` ||
        pName.replace(/^fairenne\s+/i, '') === targetName.replace(/^fairenne\s+/i, '');
    });
    if (matchedByName) {
      return String(matchedByName.id);
    }
  }

  // 4. Fallback: return first available backend database Product ID (String UUID)
  if (apiProducts.length > 0 && apiProducts[0]?.id) {
    return String(apiProducts[0].id);
  }

  return typeof idCand === 'string' ? idCand : String(idCand || '');
}

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user, executeProtectedAction } = useAuth();
  const { showToast } = useToast();
  const [wishlist, setWishlist] = useState([]);
  const [apiProducts, setApiProducts] = useState([]);

  // Load backend products catalog map once on mount
  useEffect(() => {
    const fetchApiProducts = async () => {
      try {
        const res = await apiClient.get('/products?limit=500');
        const list = res.data?.data || res.data || [];
        if (Array.isArray(list)) {
          setApiProducts(list);
        }
      } catch (err) {
        console.error('❌ [WISHLIST] Failed to load backend products map:', err);
      }
    };
    fetchApiProducts();
  }, []);

  // Fetch wishlist from backend when user is logged in
  const fetchWishlist = useCallback(async () => {
    if (!user) {
      const savedWishlist = localStorage.getItem('fairenne_wishlist_guest');
      if (savedWishlist) {
        try {
          setWishlist(JSON.parse(savedWishlist));
        } catch (e) {
          setWishlist([]);
        }
      } else {
        setWishlist([]);
      }
      return;
    }

    try {
      const res = await apiClient.get('/wishlist');
      const backendWishlist = res.data;
      if (!backendWishlist) return;

      const mappedItems = (backendWishlist.items || []).map(item => {
        const prod = item.product || {};
        return {
          id: prod.id || item.productId,
          originalId: prod.id || item.productId,
          productId: prod.id || item.productId,
          name: prod.name || item.name || 'Fairenne Product',
          price: prod.discountPrice || prod.mrp || item.price,
          mrp: prod.mrp || item.price,
          image: prod.images?.[0]?.url || prod.image || '/default-product.png',
          slug: prod.slug,
          category: prod.category || 'Skincare',
          ...prod
        };
      });

      console.log('❤️ [WISHLIST API] GET /wishlist SUCCESS:', {
        userId: user.id,
        itemsCount: mappedItems.length,
        items: mappedItems,
        rawBackendResponse: backendWishlist
      });

      setWishlist(mappedItems);
    } catch (err) {
      console.error('❌ [WISHLIST API] Error fetching wishlist:', err);
    }
  }, [user]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  // Save guest wishlist to localStorage when not logged in
  useEffect(() => {
    if (!user) {
      localStorage.setItem('fairenne_wishlist_guest', JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const toggleWishlist = useCallback((product) => {
    executeProtectedAction(async () => {
      // 1. Resolve product ID to database UUID first!
      let targetBackendId = resolveBackendProductId(product, apiProducts);

      // On-the-fly resolution if not a valid UUID string
      if (!targetBackendId || typeof targetBackendId !== 'string' || !targetBackendId.includes('-')) {
        try {
          const searchRes = await apiClient.get('/catalog/search', {
            params: { q: product.name || product.slug || '' }
          });
          const searchList = searchRes.data || [];
          if (searchList.length > 0 && searchList[0].id) {
            targetBackendId = String(searchList[0].id);
          } else {
            const fallbackRes = await apiClient.get('/catalog/products?limit=1');
            const fallbackList = fallbackRes.data?.items || fallbackRes.data?.data || fallbackRes.data || [];
            if (fallbackList.length > 0 && fallbackList[0].id) {
              targetBackendId = String(fallbackList[0].id);
            }
          }
        } catch (e) {
          console.error('On-the-fly backend product ID resolution failed for toggle:', e);
        }
      }

      if (!targetBackendId) {
        showToast('Unable to find product.', 'error');
        return;
      }

      // Check if item is already in wishlist using the resolved database UUID!
      const existingIndex = wishlist.findIndex(item => {
        const itemProductId = item.productId || item.id || item.originalId;
        return String(itemProductId) === String(targetBackendId);
      });

      if (existingIndex >= 0) {
        // Remove from wishlist
        if (!user) {
          setWishlist(prev => prev.filter((_, idx) => idx !== existingIndex));
          showToast('Removed from your wishlist.', 'info');
          return;
        }

        console.log('➖ [WISHLIST API] DELETE /wishlist/' + targetBackendId + ' - Removing Product:', {
          backendProductId: targetBackendId,
          productName: product.name,
          productObj: product
        });

        try {
          const delRes = await apiClient.delete(`/wishlist/${targetBackendId}`);
          console.log('✅ [WISHLIST API] Removed successfully! Backend response:', delRes.data);
          showToast('Removed from your wishlist.', 'info');
          await fetchWishlist();
        } catch (err) {
          console.error('❌ [WISHLIST API] Failed to remove from wishlist on backend:', err);
          showToast('Could not remove item from wishlist. Please try again.', 'error');
        }
      } else {
        // Add to wishlist
        if (!user) {
          setWishlist(prev => [...prev, product]);
          showToast(`❤️ ${product.name || 'Product'} saved to wishlist.`, 'success');
          return;
        }

        console.log('➕ [WISHLIST API] POST /wishlist/' + targetBackendId + ' - Adding Product:', {
          backendProductId: targetBackendId,
          productName: product.name,
          productObj: product
        });

        try {
          const addRes = await apiClient.post(`/wishlist/${targetBackendId}`);
          console.log('✅ [WISHLIST API] Added successfully! Backend response:', addRes.data);
          showToast(`❤️ ${product.name || 'Product'} saved to wishlist.`, 'success');
          await fetchWishlist();
        } catch (err) {
          console.error('❌ [WISHLIST API] Failed to add to wishlist on backend:', err);
          showToast('Could not save item to wishlist. Please try again.', 'error');
        }
      }
    });
  }, [executeProtectedAction, showToast, wishlist, user, apiProducts, fetchWishlist]);

  const isInWishlist = useCallback((productIdOrObj) => {
    if (!productIdOrObj) return false;
    let targetId = typeof productIdOrObj === 'object' ? productIdOrObj.id : productIdOrObj;
    let targetName = typeof productIdOrObj === 'object' ? productIdOrObj.name : '';
    let targetSlug = typeof productIdOrObj === 'object' ? productIdOrObj.slug : '';

    // If we only got an ID (mock ID like 101 or slug), let's find the product in ALL_MOCK_PRODUCTS to get the name
    if (!targetName && targetId) {
      const foundMock = ALL_MOCK_PRODUCTS.find(p => String(p.id) === String(targetId) || String(p.productId) === String(targetId));
      if (foundMock) {
        targetName = foundMock.name;
        targetSlug = foundMock.slug;
      }
    }

    // Resolve the target to a database UUID
    const resolvedId = resolveBackendProductId(
      { id: targetId, name: targetName, slug: targetSlug },
      apiProducts
    );

    // Exact UUID match
    return wishlist.some(item => {
      const itemProductId = item.productId || item.id || item.originalId;
      return String(itemProductId) === String(resolvedId);
    });
  }, [wishlist, apiProducts]);

  const addToWishlist = useCallback((product) => {
    toggleWishlist(product);
  }, [toggleWishlist]);

  const removeFromWishlist = useCallback((productIdOrObj) => {
    const targetId = typeof productIdOrObj === 'object' ? (productIdOrObj.id || productIdOrObj.productId) : productIdOrObj;
    const existingItem = wishlist.find(item => {
      if (item.id === targetId || item.productId === targetId || item.originalId === targetId) return true;
      return false;
    });
    if (existingItem) {
      toggleWishlist(existingItem);
    } else {
      toggleWishlist({ id: targetId });
    }
  }, [wishlist, toggleWishlist]);

  const wishlistCount = wishlist.length;

  const memoizedContextValue = useMemo(() => ({
    wishlist,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    wishlistCount,
    fetchWishlist
  }), [wishlist, toggleWishlist, addToWishlist, removeFromWishlist, isInWishlist, wishlistCount, fetchWishlist]);

  return (
    <WishlistContext.Provider value={memoizedContextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
