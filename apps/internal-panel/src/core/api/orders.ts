import { apiClient } from './client';

export interface AdminOrderFilters {
  status?: string;
  paymentMode?: string;
  email?: string;
  mobile?: string;
  platform?: 'COSMETICS' | 'SKINCARE';
}

export const orderApi = {
  getAdminOrders: async (filters?: AdminOrderFilters): Promise<any[]> => {
    const { data } = await apiClient.get('/admin/orders', { params: filters });
    return data;
  },

  getOrderById: async (id: string): Promise<any> => {
    const { data } = await apiClient.get(`/admin/orders/${id}`);
    return data;
  },

  updateOrderStatus: async (id: string, status: string, notes?: string): Promise<any> => {
    const { data } = await apiClient.put(`/admin/orders/${id}/status`, { status, notes });
    return data;
  },

  getInvoice: async (id: string): Promise<any> => {
    const { data } = await apiClient.get(`/admin/orders/${id}/invoice`);
    return data;
  },

  // Logistics & Exceptions (Phase 3)
  adminCancelOrder: async (id: string, reason: string): Promise<any> => {
    const { data } = await apiClient.post(`/admin/orders/${id}/cancel`, { reason });
    return data;
  },
  
  createShipment: async (payload: { orderId: string, warehouseId: string, boxLength: number, boxWidth: number, boxHeight: number, boxWeight: number }): Promise<any> => {
    const { data } = await apiClient.post('/shipping/shipments', payload);
    return data;
  },
  
  getAllShipments: async (): Promise<any[]> => {
    const { data } = await apiClient.get('/shipping/all');
    return data;
  },

  getAllReturns: async (status?: string): Promise<any[]> => {
    const { data } = await apiClient.get('/returns', { params: { status } });
    return data;
  },

  processReturn: async (id: string, payload: { status: 'APPROVED' | 'REJECTED', adminNotes?: string, refundType?: 'WALLET' | 'ORIGINAL_SOURCE' }): Promise<any> => {
    const { data } = await apiClient.put(`/returns/${id}/process`, payload);
    return data;
  },

  processQC: async (id: string, payload: { items: { sku: string, sellableQty: number, damagedQty: number }[], notes: string }): Promise<any> => {
    const { data } = await apiClient.post(`/returns/${id}/qc`, payload);
    return data;
  },

  getAllRefunds: async (): Promise<any[]> => {
    const { data } = await apiClient.get('/refunds/admin/all');
    return data;
  },

  processWalletRefund: async (payload: { orderId: string, amount: number, reason: string }): Promise<any> => {
    const { data } = await apiClient.post('/refunds/process/wallet', payload);
    return data;
  },

  processGatewayRefund: async (payload: { orderId: string, amount: number, reason: string }): Promise<any> => {
    const { data } = await apiClient.post('/refunds/process/original-source', payload);
    return data;
  },

  // Cross-Panel (Phase 4)
  generatePickList: async (payload: { orderIds: string[], warehouseId: string }): Promise<any> => {
    const { data } = await apiClient.post('/warehouse/pick-list', payload);
    return data;
  }
};
