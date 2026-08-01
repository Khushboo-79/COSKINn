/**
 * imageResolver.js
 *
 * Resolves product image URLs across Cart, Checkout, Order History, and Order Tracking pages.
 * Supports resolving from:
 * 1. An object (cart item, order item, product object) by checking image fields or product name
 * 2. A backend relative path (e.g., "/assets/overnight_mask.webp")
 * 3. A product name (e.g., "COSKINn Overnight Mask")
 */

import { skincareProducts } from '../constants/skincareProducts';
import { cosmeticsProducts } from '../constants/cosmeticsProducts';

// Eagerly import all images from assets/images/ via Vite's import.meta.glob
const imageModules = import.meta.glob('../assets/images/*', { eager: true, as: 'url' });

// Build a lookup map: filename (e.g. "daily_moisturiser.webp") -> resolved URL
const imageMap = {};
for (const path in imageModules) {
  const filename = path.split('/').pop();
  imageMap[filename] = imageModules[path];
}

// Build a product name -> image URL lookup map from our frontend catalog
const productNameMap = {};
const allProducts = [...(skincareProducts || []), ...(cosmeticsProducts || [])];
for (const prod of allProducts) {
  if (prod.name && prod.image) {
    const cleanName = prod.name.toLowerCase().trim();
    productNameMap[cleanName] = prod.image;
  }
}

// Default fallback image if nothing matched
const DEFAULT_IMAGE = imageMap['daily_moisturiser.webp'] || '/default-product.png';

/**
 * Resolves a product image from an item object, a backend path, or a product name.
 *
 * @param {object|string|null|undefined} input - cart item, order item, image path, or product name
 * @param {string} [fallback=DEFAULT_IMAGE] - fallback image URL
 * @returns {string} - the resolved URL
 */
export function resolveProductImage(input, fallback = DEFAULT_IMAGE) {
  if (!input) return fallback;

  // 1. If input is an object (order item, cart item, product object)
  if (typeof input === 'object') {
    // First check if there is an image URL property on the object
    const maybeUrl =
      input.image ||
      input.images?.[0]?.url ||
      input.images?.[0] ||
      input.variant?.product?.images?.[0]?.url ||
      input.variant?.product?.images?.[0] ||
      input.product?.images?.[0]?.url ||
      input.product?.images?.[0];

    if (typeof maybeUrl === 'string' && maybeUrl.trim() !== '' && !maybeUrl.includes('via.placeholder.com')) {
      const filename = maybeUrl.split('/').pop();
      if (filename && imageMap[filename]) {
        return imageMap[filename];
      }
      if (maybeUrl.startsWith('http') || maybeUrl.startsWith('data:')) {
        return maybeUrl;
      }
    }

    // If image property didn't resolve, check by product name
    const name =
      input.variant?.product?.name ||
      input.product?.name ||
      input.name ||
      input.variant?.name ||
      '';

    if (typeof name === 'string' && name.trim() !== '') {
      const cleanName = name.toLowerCase().trim();
      if (productNameMap[cleanName]) {
        return productNameMap[cleanName];
      }
      for (const [keyName, imgUrl] of Object.entries(productNameMap)) {
        if (keyName === cleanName || cleanName.includes(keyName) || keyName.includes(cleanName)) {
          return imgUrl;
        }
      }
    }

    return fallback;
  }

  // 2. If input is a string (image path or product name)
  if (typeof input === 'string') {
    const cleanStr = input.toLowerCase().trim();
    if (productNameMap[cleanStr]) {
      return productNameMap[cleanStr];
    }
    for (const [keyName, imgUrl] of Object.entries(productNameMap)) {
      if (keyName === cleanStr || cleanStr.includes(keyName) || keyName.includes(cleanStr)) {
        return imgUrl;
      }
    }

    const filename = input.split('/').pop();
    if (filename && imageMap[filename]) {
      return imageMap[filename];
    }
    if (input.startsWith('http') && !input.includes('via.placeholder.com')) {
      return input;
    }
  }

  return fallback;
}

export default resolveProductImage;
