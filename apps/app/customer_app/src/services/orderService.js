import api from './api';

export const orderService = {
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getOrderById: async (id) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getOrders: async () => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  trackOrder: async (id) => {
    try {
      const response = await api.get(`/orders/${id}/track`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  cancelOrder: async (id, reason) => {
    try {
      const response = await api.post(`/orders/${id}/cancel`, { reason });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  returnOrder: async (id, returnData) => {
    try {
      // returnData might contain reason, refundType, items
      const response = await api.post(`/returns/request`, { orderId: id, ...returnData });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
