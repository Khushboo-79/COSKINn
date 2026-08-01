import { apiClient } from './client';

export const auditApi = {
  getLogs: async (page: number = 1, limit: number = 50, entity?: string) => {
    const { data } = await apiClient.get('/admin/audit/logs', {
      params: { page, limit, entity }
    });
    return data;
  },

  getSessionActivityLog: async () => {
    const { data } = await apiClient.get('/admin/audit/session-activity');
    return data;
  },

  getStockAdjustmentLog: async () => {
    const { data } = await apiClient.get('/admin/audit/stock-adjustments');
    return data;
  },

  getSalesReport: async () => {
    const { data } = await apiClient.get('/admin/audit/sales-report');
    return data;
  },

  getRefundReport: async () => {
    const { data } = await apiClient.get('/admin/audit/refund-report');
    return data;
  },

  getPaymentReport: async () => {
    const { data } = await apiClient.get('/admin/audit/payment-report');
    return data;
  },
  
  getRewardUsageLog: async () => {
    const { data } = await apiClient.get('/admin/audit/reward-usage');
    return data;
  }
};
