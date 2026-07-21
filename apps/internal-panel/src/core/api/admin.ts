import { apiClient } from './client';

export const adminApi = {
  getPendingApprovals: async () => {
    const response = await apiClient.get('/admin/approvals/pending');
    return response.data;
  },
  approveProduct: async (productId: string, data?: any) => {
    const response = await apiClient.post(`/admin/approvals/products/${productId}/approve`, data);
    return response.data;
  },
  rejectProduct: async (productId: string, data: { reason: string }) => {
    const response = await apiClient.post(`/admin/approvals/products/${productId}/reject`, data);
    return response.data;
  },
  resetStaff2FA: async (userId: string) => {
    const response = await apiClient.post(`/admin/staff/${userId}/2fa/reset`);
    return response.data;
  },
  getStaff2FAStatus: async () => {
    const response = await apiClient.get('/admin/staff/2fa');
    return response.data;
  },
  getUsers: async () => {
    const response = await apiClient.get('/admin/config/users');
    return response.data;
  },
  getSettings: async () => {
    const response = await apiClient.get('/admin/config/settings');
    return response.data;
  },
  getOverview: async (platform?: string) => {
    const response = await apiClient.get('/admin/config/overview', { params: { platform } });
    return response.data;
  }
};
