import api from './api';

export const wishlistService = {
  getWishlist: async () => {
    try {
      const response = await api.get('/wishlist');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  addToWishlist: async (productId) => {
    try {
      const response = await api.post(`/wishlist/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  removeFromWishlist: async (productId) => {
    try {
      const response = await api.delete(`/wishlist/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
