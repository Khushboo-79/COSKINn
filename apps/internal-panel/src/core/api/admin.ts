import { apiClient } from './client';

export const adminApi = {
  getPendingApprovals: async () => {
    const response = await apiClient.get('/product?status=PENDING_APPROVAL');
    return response.data.map((p: any) => ({
      id: p.id,
      type: 'Product',
      title: p.name,
      status: 'pending', // map from PENDING_APPROVAL
      requestedBy: 'System User', // In the future, track the submitter ID
      cosmeticsRules: {
        manufacturerName: p.manufacturerName || 'N/A',
        manufacturerAddress: p.manufacturerAddress || 'N/A',
        countryOfOrigin: p.countryOfOrigin || 'N/A',
        netQuantity: p.variants?.[0]?.netQuantity || 'N/A',
        mfgDate: 'N/A', 
        expiryDate: 'N/A',
        batchNumber: 'N/A'
      }
    }));
  },
  approveProduct: async (productId: string, data?: any) => {
    const response = await apiClient.post(`/product/${productId}/approve`, data);
    return response.data;
  },
  rejectProduct: async (productId: string, data: { reason: string }) => {
    const response = await apiClient.post(`/product/${productId}/reject`, data);
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
  getRoles: async () => {
    const response = await apiClient.get('/admin/config/roles');
    return response.data;
  },
  updateRolePanelAccess: async (roleId: string, panelAccess: string[]) => {
    const response = await apiClient.put(`/admin/config/roles/${roleId}/panels`, { panelAccess });
    return response.data;
  },
  assignRole: async (userId: string, roleName: string) => {
    const response = await apiClient.post('/admin/config/users/assign-role', { userId, roleName });
    return response.data;
  },
  getSettings: async () => {
    const response = await apiClient.get('/admin/config/settings');
    return response.data;
  },
  updateSettings: async (data: any) => {
    const response = await apiClient.put('/admin/config/settings', data);
    return response.data;
  },
  getOverview: async (platform?: string) => {
    const response = await apiClient.get('/admin/config/overview', { params: { platform } });
    return response.data;
  },
  getNotifications: async () => {
    const response = await apiClient.get('/admin/config/notifications');
    return response.data;
  }
};
