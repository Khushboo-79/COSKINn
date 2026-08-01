import api from './api';

export const catalogService = {
  getHome: async () => {
    try {
      const response = await api.get('/catalog/home');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  getCategories: async (platform) => {
    try {
      const url = platform ? `/categories?platform=${platform}` : '/categories';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getSkinTypes: async () => {
    try {
      const response = await api.get('/catalog/skin-types');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getSkinConcerns: async () => {
    try {
      const response = await api.get('/catalog/skin-concerns');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getIngredients: async () => {
    try {
      const response = await api.get('/catalog/ingredients');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getProducts: async (filters = {}) => {
    try {
      const response = await api.get('/catalog/products', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getNewArrivals: async (platform) => {
    try {
      const params = { sort: 'new_arrivals' };
      if (platform) params.platform = platform;
      const response = await api.get('/catalog/products', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
