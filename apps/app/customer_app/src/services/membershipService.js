import api from './api';

export const membershipService = {
  getMyTier: async () => {
    try {
      const response = await api.get('/membership/my-tier');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
