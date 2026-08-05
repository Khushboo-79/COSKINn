import { apiClient } from './client';

export const productApi = {
  getStats: async () => {
    const response = await apiClient.get('/product/stats/overview');
    return response.data;
  },

  getProducts: async () => {
    const response = await apiClient.get('/product');
    return response.data;
  },

  getMarketingFeed: async (filters?: any) => {
    const response = await apiClient.get('/product/marketing-feed', { params: filters });
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

  updateCategory: async (id: string, data: any) => {
    const response = await apiClient.put(`/categories/${id}`, data);
    return response.data;
  },

  createProduct: async (data: any) => {
    const response = await apiClient.post('/product', data);
    return response.data;
  },

  getProduct: async (id: string) => {
    const response = await apiClient.get(`/product/${id}`);
    return response.data;
  },

  updateProduct: async ({ id, data }: { id: string, data: any }) => {
    const response = await apiClient.patch(`/product/${id}`, data);
    return response.data;
  },

  exportCsv: async () => {
    const response = await apiClient.get('/product/export/csv', { responseType: 'blob' });
    return response.data;
  },

  importCsv: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post('/product/import/csv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteProduct: async (id: string) => {
    const response = await apiClient.delete(`/product/${id}`);
    return response.data;
  }
};
