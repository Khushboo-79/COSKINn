import api from './api';

export const cartService = {
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  addToCart: async (productId, variantId = undefined, quantity = 1) => {
    try {
      const response = await api.post('/cart/items', { productId, variantId, quantity });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await api.put(`/cart/items/${itemId}`, { quantity });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  removeFromCart: async (itemId) => {
    try {
      const response = await api.delete(`/cart/items/${itemId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
