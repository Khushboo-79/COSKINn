import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { inventoryApi } from '../../core/api/inventory';
import { AlertTriangle, Clock, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const InventoryAlertsScreen = () => {
  const [activeTab, setActiveTab] = useState<'LOW_STOCK' | 'NEAR_EXPIRY'>('LOW_STOCK');

  const { data: lowStockAlerts, isLoading: loadingLowStock } = useQuery({
    queryKey: ['inventory', 'alerts', 'low-stock'],
    queryFn: inventoryApi.getLowStockAlerts,
  });

  const { data: expiryAlerts, isLoading: loadingExpiry } = useQuery({
    queryKey: ['inventory', 'alerts', 'near-expiry'],
    queryFn: inventoryApi.getNearExpiryAlerts,
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/inventory" className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory Alerts</h1>
          <p className="text-slate-500 text-sm mt-1">Monitor critical stock levels and expiring batches.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100 bg-slate-50">
          <button
            onClick={() => setActiveTab('LOW_STOCK')}
            className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center transition-all border-b-2 ${
              activeTab === 'LOW_STOCK' 
                ? 'border-amber-500 text-amber-700 bg-white' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle className="h-5 w-5 mr-2" />
            Low Stock Alerts
            {lowStockAlerts && lowStockAlerts.length > 0 && (
              <span className="ml-2 bg-amber-100 text-amber-700 py-0.5 px-2 rounded-full text-xs">
                {lowStockAlerts.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('NEAR_EXPIRY')}
            className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center transition-all border-b-2 ${
              activeTab === 'NEAR_EXPIRY' 
                ? 'border-red-500 text-red-700 bg-white' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Clock className="h-5 w-5 mr-2" />
            Near Expiry Alerts
            {expiryAlerts && expiryAlerts.length > 0 && (
              <span className="ml-2 bg-red-100 text-red-700 py-0.5 px-2 rounded-full text-xs">
                {expiryAlerts.length}
              </span>
            )}
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'LOW_STOCK' && (
            <div>
              {loadingLowStock ? (
                <div className="p-12 flex flex-col items-center text-slate-500">
                  <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary-500" />
                  <p>Loading alerts...</p>
                </div>
              ) : !lowStockAlerts || lowStockAlerts.length === 0 ? (
                <div className="p-12 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-3 text-slate-300" />
                  No low stock alerts. All SKUs are above their thresholds!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50 rounded-t-lg">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">SKU</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Available</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Threshold</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {lowStockAlerts.map((alert: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-medium text-slate-900 text-sm">{alert.sku}</td>
                          <td className="px-6 py-4 text-right font-bold text-amber-600 text-sm">{alert.available}</td>
                          <td className="px-6 py-4 text-right text-slate-500 text-sm">{alert.threshold || 50}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
                              Restock Needed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'NEAR_EXPIRY' && (
            <div>
              {loadingExpiry ? (
                <div className="p-12 flex flex-col items-center text-slate-500">
                  <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary-500" />
                  <p>Loading alerts...</p>
                </div>
              ) : !expiryAlerts || expiryAlerts.length === 0 ? (
                <div className="p-12 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <Clock className="h-8 w-8 mx-auto mb-3 text-slate-300" />
                  No near-expiry alerts. All batches are healthy!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50 rounded-t-lg">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">SKU</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Batch Number</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Expiry Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {expiryAlerts.map((alert: any, idx: number) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-medium text-slate-900 text-sm">{alert.sku}</td>
                          <td className="px-6 py-4 text-slate-500 text-sm">{alert.batchNumber}</td>
                          <td className="px-6 py-4 text-right font-medium text-slate-900 text-sm">{alert.quantity}</td>
                          <td className="px-6 py-4 text-sm text-red-600 font-medium">
                            {new Date(alert.expiryDate).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
