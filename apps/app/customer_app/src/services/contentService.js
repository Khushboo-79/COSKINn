import api from './api';

export const contentService = {
  getFaqs: async () => {
    try {
      const response = await api.get('/content/faqs');
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
