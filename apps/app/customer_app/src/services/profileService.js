import api from './api';

export const profileService = {
  getProfile: async () => {
    try {
      const response = await api.get('/customer/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/customer/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
