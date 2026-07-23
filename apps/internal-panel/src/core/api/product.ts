import { apiClient } from './client';

export const productApi = {
  getStats: async () => {
    // Mocking for now since there might not be a direct backend endpoint for this yet
    // return apiClient.get('/product/stats').then(res => res.data);
    return new Promise<{ totalProducts: number, activeVariants: number, lowStockSkus: number, totalCategories: number }>((resolve) => {
      setTimeout(() => {
        resolve({
          totalProducts: 142,
          activeVariants: 350,
          lowStockSkus: 12,
          totalCategories: 8
        });
      }, 500);
    });
  },

  getProducts: async () => {
    const response = await apiClient.get('/product');
    return response.data;
  },

  getCategories: async () => {
    const response = await apiClient.get('/categories');
    return response.data;
  },

  createCategory: async (data: any) => {
    const response = await apiClient.post('/categories', data);
    return response.data;
  },

  createProduct: async (data: any) => {
    const response = await apiClient.post('/product', data);
    return response.data;
  }
};
