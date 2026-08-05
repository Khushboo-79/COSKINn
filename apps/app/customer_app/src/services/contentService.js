import api from './api';

export const contentService = {
  getArticles: async (type) => {
    try {
      const url = type ? `/content/articles?type=${type}` : '/content/articles';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getFaqs: async () => {
    try {
      const response = await api.get('/content/faqs');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getArticleBySlug: async (slug) => {
    try {
      const response = await api.get(`/content/articles/${slug}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  submitTicket: async (ticketData) => {
    try {
      const response = await api.post('/support/tickets', ticketData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
