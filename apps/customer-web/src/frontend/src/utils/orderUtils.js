/**
 * Frontend Order Utilities
 * Resolves fields like order platform (SKINCARE vs COSMETICS) without modifying backend APIs.
 */

export function resolveOrderPlatform(order, cartItems = []) {
  const items = (order?.items && order.items.length > 0) ? order.items : (cartItems || []);

  if (!items || items.length === 0) {
    const activeTheme = typeof window !== 'undefined' ? localStorage.getItem('fairenne_theme') : null;
    return activeTheme === 'skincare' ? 'SKINCARE' : 'COSMETICS';
  }

  const cosmeticsKeywords = [
    'cosmetic', 'makeup', 'lipstick', 'blush', 'mascara',
    'eyeshadow', 'perfume', 'brush', 'liner', 'lip blur', 'velvet'
  ];

  const hasCosmetic = items.some(it => {
    const cat = (it.category || it.product?.category || '').toLowerCase();
    const name = (it.name || it.product?.name || '').toLowerCase();
    return cosmeticsKeywords.some(kw => cat.includes(kw) || name.includes(kw));
  });

  return hasCosmetic ? 'COSMETICS' : 'SKINCARE';
}

export function normalizeOrder(order, cartItems = []) {
  if (!order || typeof order !== 'object') return order;
  return {
    ...order,
    platform: resolveOrderPlatform(order, cartItems)
  };
}
