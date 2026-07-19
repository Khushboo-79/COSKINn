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
  }
};
