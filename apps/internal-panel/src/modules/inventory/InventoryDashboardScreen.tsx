import { useQuery } from '@tanstack/react-query';
import { inventoryApi } from '../../core/api/inventory';
import { Package, AlertTriangle, ArrowDownToLine, RefreshCcw, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const InventoryDashboardScreen = () => {
  const { data: rawStats, isLoading: statsLoading } = useQuery({
    queryKey: ['inventory', 'stats'],
    queryFn: inventoryApi.getDashboardStats,
  });

  const stats = rawStats ? {
    totalSkus: rawStats.kpis?.totalSkus?.value || 0,
    lowStockCount: rawStats.kpis?.lowStock?.value || 0,
    nearExpiryCount: 0, // Backend doesn't return nearExpiry count yet
    pendingGrn: rawStats.kpis?.pendingPos?.value || 0,
  } : null;

  const { data: rawStockList, isLoading: stockLoading } = useQuery({
    queryKey: ['inventory', 'stock'],
    queryFn: () => inventoryApi.getGlobalStock(),
  });

  const stockList = rawStockList?.map((item: any) => ({
    sku: item.sku,
    name: 'Product Name', // Backend currently doesn't return the name in getGlobalStock
    available: item.totalQuantity || 0,
    reserved: item.totalReservedQty || 0,
    damaged: item.damaged || 0, // Backend might not have this yet
    expired: item.expired || 0  // Backend might not have this yet
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time stock visibility across all warehouses.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/inventory/returns" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center">
            Process Returns
          </Link>
          <Link to="/inventory/report-damage" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center">
            Report Damage/Expiry
          </Link>
          <Link to="/inventory/detailed" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center">
            Detailed View
          </Link>
          <Link to="/inventory/transfer" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center">
            Transfer Stock
          </Link>
          <Link to="/inventory/adjust" className="px-4 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-sm flex items-center">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Manual Adjustment
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      {statsLoading ? (
        <div className="h-32 bg-slate-100 rounded-2xl animate-pulse"></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Total SKUs Active</p>
                <h3 className="text-2xl font-bold text-slate-900">{stats?.totalSkus || 0}</h3>
              </div>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Package className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          <Link to="/inventory/alerts" className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-amber-300 hover:shadow-md transition-all group cursor-pointer block">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1 group-hover:text-amber-700 transition-colors">Low Stock Alerts</p>
                <h3 className="text-2xl font-bold text-amber-600">{stats?.lowStockCount || 0}</h3>
              </div>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-amber-100 transition-colors">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>
          </Link>

          <Link to="/inventory/alerts" className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-red-300 hover:shadow-md transition-all group cursor-pointer block">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1 group-hover:text-red-700 transition-colors">Near Expiry</p>
                <h3 className="text-2xl font-bold text-red-600">{stats?.nearExpiryCount || 0}</h3>
              </div>
              <div className="p-2 bg-red-50 text-red-600 rounded-lg group-hover:bg-red-100 transition-colors">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>
          </Link>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Pending GRN</p>
                <h3 className="text-2xl font-bold text-slate-900">{stats?.pendingGrn || 0}</h3>
              </div>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <ArrowDownToLine className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stock Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900">Global Stock Ledger</h3>
        </div>
        
        {stockLoading ? (
          <div className="p-12 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary-500" />
            <p>Loading ledger data...</p>
          </div>
        ) : !stockList || stockList.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No stock data available. Have you added any products yet?
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Available</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Reserved</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Damaged</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Expired</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {stockList.map((item: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.sku}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-green-600">{item.available}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-amber-600">{item.reserved}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600">{item.damaged}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600">{item.expired}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Tools & Reports Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Operations & Reporting</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link to="/inventory/scanner" className="p-4 border border-slate-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all flex items-center group">
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg group-hover:bg-white group-hover:text-primary-600 mr-3">
              <RefreshCcw className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-slate-900 group-hover:text-primary-700">Barcode Scanner</p>
              <p className="text-xs text-slate-500 mt-0.5">Rapid SKU lookup tool</p>
            </div>
          </Link>
          
          <Link to="/inventory/audit" className="p-4 border border-slate-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all flex items-center group">
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg group-hover:bg-white group-hover:text-primary-600 mr-3">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-slate-900 group-hover:text-primary-700">Inventory Audit</p>
              <p className="text-xs text-slate-500 mt-0.5">Cyclic physical counts</p>
            </div>
          </Link>
          
          <Link to="/inventory/reservations" className="p-4 border border-slate-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all flex items-center group">
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg group-hover:bg-white group-hover:text-amber-600 mr-3">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-slate-900 group-hover:text-amber-700">Reservations</p>
              <p className="text-xs text-slate-500 mt-0.5">Locked stock visibility</p>
            </div>
          </Link>
          
          <Link to="/inventory/reports" className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center group">
            <div className="p-2 bg-slate-100 text-slate-600 rounded-lg group-hover:bg-white group-hover:text-blue-600 mr-3">
              <ArrowDownToLine className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-slate-900 group-hover:text-blue-700">Movement Logs</p>
              <p className="text-xs text-slate-500 mt-0.5">Immutable ledger export</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
