import { apiClient } from './client';

export const warehouseApi = {
  getPurchaseOrders: async (): Promise<any[]> => {
    const { data } = await apiClient.get('/warehouse/purchase-orders');
    return data;
  },

  createPurchaseOrder: async (payload: { warehouseId: string, vendorId?: string, items: any[] }): Promise<any> => {
    const { data } = await apiClient.post('/warehouse/purchase-orders', payload);
    return data;
  },

  getBins: async (): Promise<any[]> => {
    const { data } = await apiClient.get('/warehouse/bins');
    return data;
  },

  createBin: async (payload: { warehouseId: string, code: string, description?: string }): Promise<any> => {
    const { data } = await apiClient.post('/warehouse/bins', payload);
    return data;
  },

  createGrn: async (payload: { purchaseOrderId: string, items: any[] }): Promise<any> => {
    const { data } = await apiClient.post('/warehouse/grn', payload);
    return data;
  },

  verifyBarcodeScan: async (payload: { orderId: string, barcode: string }): Promise<any> => {
    const { data } = await apiClient.post('/warehouse/scan', payload);
    return data;
  }
};
