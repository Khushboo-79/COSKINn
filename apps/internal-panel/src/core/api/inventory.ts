import { apiClient } from './client';

export interface DashboardStats {
  totalSkus: number;
  lowStockCount: number;
  nearExpiryCount: number;
  pendingGrn: number;
}

export interface StockData {
  sku: string;
  name: string;
  category: string;
  available: number;
  reserved: number;
  damaged: number;
  expired: number;
  lastUpdated: string;
}

export interface StockMovementDto {
  sku: string;
  quantity: number;
  reasonCode: string;
  notes?: string;
  warehouseId?: string;
  batchNumber?: string;
}

export const inventoryApi = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const { data } = await apiClient.get('/inventory/dashboard-stats');
    return data;
  },

  getGlobalStock: async (platform?: string): Promise<StockData[]> => {
    const { data } = await apiClient.get('/inventory/stock', {
      params: { platform }
    });
    return data;
  },

  getStockForSku: async (sku: string): Promise<any> => {
    const { data } = await apiClient.get(`/inventory/stock/${sku}`);
    return data;
  },

  getWarehouses: async (): Promise<any[]> => {
    const { data } = await apiClient.get('/inventory/warehouses');
    return data;
  },

  stockIn: async (payload: StockMovementDto) => {
    const { data } = await apiClient.post('/inventory/stock-in', payload);
    return data;
  },

  stockOut: async (payload: StockMovementDto) => {
    const { data } = await apiClient.post('/inventory/stock-out', payload);
    return data;
  },

  transferStock: async (payload: { sku: string; fromWarehouseId: string; toWarehouseId: string; quantity: number; reason: string }): Promise<any> => {
    const { data } = await apiClient.post('/inventory/transfer', payload);
    return data;
  },

  reportDamaged: async (payload: { sku: string; warehouseId: string; quantity: number; reason: string }): Promise<any> => {
    const { data } = await apiClient.post('/inventory/damaged', payload);
    return data;
  },

  reportExpired: async (payload: { sku: string; warehouseId: string; quantity: number; reason: string }): Promise<any> => {
    const { data } = await apiClient.post('/inventory/expired', payload);
    return data;
  },

  adjustStock: async (payload: { sku: string; warehouseId: string; type: 'ABSOLUTE' | 'OFFSET'; quantity: number; reason: string }): Promise<any> => {
    const { data } = await apiClient.post('/inventory/adjustment', payload);
    return data;
  },

  getLowStockAlerts: async (): Promise<any[]> => {
    const { data } = await apiClient.get('/inventory/alerts/low-stock');
    return data;
  },

  getNearExpiryAlerts: async (): Promise<any[]> => {
    const { data } = await apiClient.get('/inventory/alerts/near-expiry');
    return data;
  },

  reportDamaged: async (payload: { sku: string, warehouseId: string, quantity: number, reason: string, batchNumber?: string }) => {
    const { data } = await apiClient.post('/inventory/damaged', payload);
    return data;
  },

  reportExpired: async (payload: { sku: string, warehouseId: string, quantity: number, batchNumber: string, reason?: string }) => {
    const { data } = await apiClient.post('/inventory/expired', payload);
    return data;
  },

  getReturns: async (): Promise<any[]> => {
    const { data } = await apiClient.get('/inventory/returns');
    return data;
  }
};
