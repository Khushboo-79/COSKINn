import api from './api';

export const productService = {
  /**
   * Fetch a list of products with optional filters
   * @param {Object} params - Query parameters like page, limit, category, skinType, etc.
   */
  getProducts: async (params = {}) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Fetch a single product by ID
   * @param {string} id - The product ID
   */
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Search products by query string
   * @param {string} query - The search string
   */
  searchProducts: async (query) => {
    try {
      const response = await api.get('/products/search', { params: { q: query } });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
