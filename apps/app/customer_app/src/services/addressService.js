import api from './api';

export const addressService = {
  /**
   * Fetch all saved addresses for the current user
   */
  getAddresses: async () => {
    try {
      const response = await api.get('/customer/addresses');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Add a new address
   * @param {Object} data - The address details
   */
  addAddress: async (data) => {
    try {
      const response = await api.post('/customer/addresses', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Update an existing address
   * @param {string} id - The address ID
   * @param {Object} data - The address details
   */
  updateAddress: async (id, data) => {
    try {
      const response = await api.put(`/customer/addresses/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Delete an address
   * @param {string} id - The address ID
   */
  deleteAddress: async (id) => {
    try {
      const response = await api.delete(`/customer/addresses/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
