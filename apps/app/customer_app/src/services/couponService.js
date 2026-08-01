import api from './api';

export const couponService = {
  getAvailableCoupons: async () => {
    try {
      const response = await api.get('/cart/coupon/available');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  applyCoupon: async (couponCode) => {
    try {
      const response = await api.post('/cart/coupon/apply', { code: couponCode });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  removeCoupon: async () => {
    try {
      const response = await api.delete('/cart/coupon');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
