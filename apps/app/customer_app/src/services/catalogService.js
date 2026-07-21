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
  
  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
