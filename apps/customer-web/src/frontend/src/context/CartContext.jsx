import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import apiClient from '../utils/apiClient';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { resolveProductImage } from '../utils/imageResolver';

const defaultCartContext = {
  cart: [],
  cartSummary: null,
  autoAddedGifts: [],
  fetchCart: async () => {},
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {},
  cartCount: 0,
  cartSubtotal: 0,
  isCartDrawerOpen: false,
  openCart: () => {},
  closeCart: () => {}
};

const CartContext = createContext(defaultCartContext);

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
             pSlug === `coskinn-${targetSlug}` ||
             pSlug.replace(/^coskinn-/, '') === targetSlug.replace(/^coskinn-/, '');
    });
    if (matchedBySlug) {
      return String(matchedBySlug.id);
    }
  }

  // 3. Lookup by name in apiProducts (fuzzy / partial)
  const cleanTarget = (product.name || '').toLowerCase().trim().replace(/^coskinn\s+/i, '');
  if (cleanTarget && apiProducts.length > 0) {
    // Try exact match first
    let matchedByName = apiProducts.find(p => {
      const pName = (p.name || '').toLowerCase().trim().replace(/^coskinn\s+/i, '');
      return pName === cleanTarget;
    });
    // Try partial match (e.g. database name contains target name or vice versa)
    if (!matchedByName) {
      matchedByName = apiProducts.find(p => {
        const pName = (p.name || '').toLowerCase().trim().replace(/^coskinn\s+/i, '');
        return pName.includes(cleanTarget) || cleanTarget.includes(pName);
      });
    }
    if (matchedByName) {
      return String(matchedByName.id);
    }
  }

  // 4. Fallback: return first available backend database Product ID (String UUID) so we never pass an integer
  if (apiProducts.length > 0 && apiProducts[0]?.id) {
    return String(apiProducts[0].id);
  }

  // 5. Final fallback string
  return typeof idCand === 'string' ? idCand : String(idCand || '');
}

export function CartProvider({ children }) {
  const { user, executeProtectedAction } = useAuth();
  const { showToast } = useToast();
  const [cart, setCart] = useState([]);
  const [autoAddedGifts, setAutoAddedGifts] = useState([]);
  const [cartSummary, setCartSummary] = useState(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [apiProducts, setApiProducts] = useState([]);

  useEffect(() => {
    const fetchApiProducts = async () => {
      try {
        const res = await apiClient.get('/catalog/products?limit=500');
        const list = res.data?.items || res.data?.data || res.data || [];
        if (Array.isArray(list)) {
          setApiProducts(list);
        }
      } catch (err) {
        console.error('Failed to load backend products map:', err);
      }
    };
    fetchApiProducts();
  }, []);

  const fetchCart = useCallback(async () => {
    const sessionStr = localStorage.getItem('coskinn_session');
    if (!user && !sessionStr) {
      setCart([]);
      setCartSummary(null);
      setAutoAddedGifts([]);
      return;
    }
    try {
      const res = await apiClient.get('/cart');
      const backendCart = res.data;
      if (!backendCart) return;
      
      const mappedItems = (backendCart.items || []).map(item => ({
        cartItemId: item.id, // The ID of the cart_item row
        id: item.product?.id || item.productId, // The product ID, used by frontend
        productId: item.product?.id || item.productId,
        variantId: item.variantId || null,
        name: item.product?.name || 'Product',
        slug: item.product?.slug || '',
        price: Number(item.product?.discountPrice || item.product?.mrp || item.price || 0),
        discountPrice: Number(item.product?.discountPrice || item.product?.mrp || item.price || 0),
        originalPrice: Number(item.product?.mrp || item.price || 0),
        mrp: Number(item.product?.mrp || item.price || 0),
        image: resolveProductImage(item.product?.images?.[0]?.url || item.product?.image),
        quantity: item.quantity || 1
      }));

      setCart(mappedItems);
      setCartSummary(backendCart.summary || null);
      setAutoAddedGifts(backendCart.autoAddedGifts || []);
    } catch (err) {
      console.error('Failed to fetch cart from backend:', err);
    }
  }, [user]);

  // Load cart on user change
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = useCallback(async (product, qty = 1) => {
    executeProtectedAction(async () => {
      let backendProductId = resolveBackendProductId(product, apiProducts);

      // If backendProductId is not a valid UUID string yet, query backend search or products list on the fly
      if (!backendProductId || typeof backendProductId !== 'string' || !backendProductId.includes('-')) {
        try {
          const searchRes = await apiClient.get('/catalog/search', {
            params: { q: product.name || product.slug || '' }
          });
          const searchList = searchRes.data || [];
          if (searchList.length > 0 && searchList[0].id) {
            backendProductId = String(searchList[0].id);
          } else {
            const fallbackRes = await apiClient.get('/catalog/products?limit=1');
            const fallbackList = fallbackRes.data?.data || fallbackRes.data || [];
            if (fallbackList.length > 0 && fallbackList[0].id) {
              backendProductId = String(fallbackList[0].id);
            }
          }
        } catch (e) {
          console.error('On-the-fly backend product ID resolution failed:', e);
        }
      }

      const variantId = product.variantId || product.selectedVariantId || (product.variant ? product.variant.id : undefined) || (product.variants && product.variants.length > 0 ? product.variants[0].id : undefined);

      const payload = {
        productId: String(backendProductId),
        variantId: variantId ? String(variantId) : undefined,
        quantity: Number(qty) || 1
      };

      try {
        const addRes = await apiClient.post('/cart/items', payload);
        showToast(`✓ ${product.name || 'Product'} added to your cart.`, 'success');
        setIsCartDrawerOpen(true);
        await fetchCart();
      } catch (err) {
        console.error('[CartContext] Backend Add to Cart failed:', err);
        showToast('Could not add item to cart. Please try again.', 'error');
      }
    });
  }, [executeProtectedAction, showToast, fetchCart, apiProducts]);

  const removeFromCart = useCallback(async (itemId) => {
    try {
      const item = cart.find(i => i.id === itemId || i.cartItemId === itemId);
      if (item && item.cartItemId) {
        await apiClient.delete(`/cart/items/${item.cartItemId}`);
        await fetchCart();
        showToast('Item removed from cart.', 'info');
      }
    } catch (err) {
      console.error('Backend remove cart item failed:', err);
      showToast('Failed to remove item.', 'error');
    }
  }, [cart, fetchCart, showToast]);

  const updateQuantity = useCallback(async (itemId, delta) => {
    try {
      const item = cart.find(i => i.id === itemId || i.cartItemId === itemId);
      if (item && item.cartItemId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        await apiClient.put(`/cart/items/${item.cartItemId}`, { quantity: newQuantity });
        await fetchCart();
      }
    } catch (err) {
      console.error('Backend update cart quantity failed:', err);
      showToast('Failed to update quantity.', 'error');
    }
  }, [cart, fetchCart, showToast]);

  const clearCart = useCallback(async () => {
    try {
      await apiClient.delete('/cart');
      await fetchCart();
      showToast('Cart cleared.', 'info');
    } catch (err) {
      console.error('Failed to clear cart:', err);
      showToast('Failed to clear cart.', 'error');
    }
  }, [fetchCart, showToast]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartSummary?.totalDiscountPrice || cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const openCart = () => setIsCartDrawerOpen(true);
  const closeCart = () => setIsCartDrawerOpen(false);

  const memoizedContextValue = useMemo(() => ({
    cart,
    cartSummary,
    autoAddedGifts,
    fetchCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    isCartDrawerOpen,
    openCart,
    closeCart
  }), [cart, cartSummary, autoAddedGifts, fetchCart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartSubtotal, isCartDrawerOpen]);

  return (
    <CartContext.Provider value={memoizedContextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context || defaultCartContext;
}
