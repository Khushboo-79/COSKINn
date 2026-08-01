import api from './api';

export const offerService = {
  getActiveOffers: async () => {
    try {
      const response = await api.get('/offer/active');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
