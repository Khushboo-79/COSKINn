import api from './api';

export const locationService = {
  getIpLocation: async () => {
    try {
      const response = await api.get('/location/ip');
      return response.data;
    } catch (error) {
      console.error('Error in getIpLocation:', error);
      throw error;
    }
  },
  reverseGeocode: async (lat, lng) => {
    try {
      const response = await api.get(`/location/reverse-geocode?lat=${lat}&lng=${lng}`);
      return response.data;
    } catch (error) {
      console.error('Error in reverseGeocode:', error);
      throw error;
    }
  }
};
