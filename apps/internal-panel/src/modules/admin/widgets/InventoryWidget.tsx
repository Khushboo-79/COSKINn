import { useQuery } from '@tanstack/react-query';
import { inventoryApi } from '../../../core/api/inventory';
import { PackageSearch, AlertTriangle, AlertCircle, Loader2 } from 'lucide-react';

export const InventoryWidget = () => {
  const { data: inventory, isLoading } = useQuery({
    queryKey: ['admin', 'inventory-widget'],
    queryFn: () => inventoryApi.getInventory()
  });

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-slate-300 mb-2" />
        <span className="text-slate-500 text-sm">Loading inventory data...</span>
      </div>
    );
  }

  // Filter low stock and near expiry
  const lowStockThreshold = 50;
  const lowStockItems = inventory?.filter((item: any) => item.quantity < lowStockThreshold) || [];
  
  // For near expiry, we check items with expiryDate within 60 days
  const now = new Date();
  const sixtyDaysFromNow = new Date();
  sixtyDaysFromNow.setDate(now.getDate() + 60);

  const nearExpiryItems = inventory?.filter((item: any) => {
    if (!item.batch?.expiryDate) return false;
    const expDate = new Date(item.batch.expiryDate);
    return expDate > now && expDate <= sixtyDaysFromNow;
  }) || [];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-bold text-slate-900 flex items-center">
            <PackageSearch className="h-5 w-5 mr-2 text-rose-500" />
            Inventory Alerts
          </h3>
          <p className="text-xs text-slate-500 mt-1">Low stock and near-expiry feed</p>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center">
            <AlertTriangle className="h-3.5 w-3.5 mr-1.5 text-amber-500" /> Low Stock ({lowStockItems.length})
          </h4>
          {lowStockItems.length === 0 ? (
            <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">All items are sufficiently stocked.</p>
          ) : (
            <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
              {lowStockItems.slice(0, 5).map((item: any) => (
                <div key={item.id} className="flex justify-between items-center text-sm p-2 bg-rose-50/50 rounded border border-rose-100">
                  <span className="font-medium text-slate-800 truncate pr-2">{item.product.name}</span>
                  <span className="text-rose-600 font-bold whitespace-nowrap">{item.quantity} left</span>
                </div>
              ))}
              {lowStockItems.length > 5 && (
                <p className="text-xs text-center text-slate-500 mt-2">+ {lowStockItems.length - 5} more items</p>
              )}
            </div>
          )}
        </div>

        <div className="pt-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center">
            <AlertCircle className="h-3.5 w-3.5 mr-1.5 text-rose-500" /> Near Expiry ({nearExpiryItems.length})
          </h4>
          {nearExpiryItems.length === 0 ? (
            <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">No items expiring in the next 60 days.</p>
          ) : (
            <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
              {nearExpiryItems.slice(0, 5).map((item: any) => (
                <div key={item.id} className="flex justify-between items-center text-sm p-2 bg-amber-50/50 rounded border border-amber-100">
                  <span className="font-medium text-slate-800 truncate pr-2">{item.product.name}</span>
                  <span className="text-amber-600 font-medium whitespace-nowrap text-xs">
                    Exp: {new Date(item.batch.expiryDate).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
