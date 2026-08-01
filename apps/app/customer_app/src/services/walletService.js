import api from './api';

export const walletService = {
  getWalletBalance: async () => {
    try {
      const response = await api.get('/wallet');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getRewardPoints: async () => {
    try {
      const response = await api.get('/reward-point');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
