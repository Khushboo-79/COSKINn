import { useQuery } from '@tanstack/react-query';
import { auditApi } from '../../core/api/audit';
import { Loader2, Package, ArrowRightLeft, AlertOctagon, TrendingDown, ClipboardList } from 'lucide-react';
import { format } from 'date-fns';

export const InventoryReportsScreen = () => {
  const { data: adjustments, isLoading } = useQuery({
    queryKey: ['audit', 'stock-adjustments'],
    queryFn: () => auditApi.getStockAdjustmentLog()
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-slate-400" />
        <p>Generating inventory logs...</p>
      </div>
    );
  }

  // Calculate some basic stats
  const damageCount = adjustments?.filter((a: any) => a.reasonCode === 'DAMAGED').length || 0;
  const expiryCount = adjustments?.filter((a: any) => a.reasonCode === 'EXPIRED').length || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center">
            <Package className="h-6 w-6 mr-3 text-amber-600" />
            Inventory & Stock Adjustments
          </h2>
          <p className="text-sm text-slate-500 mt-1">Immutable audit trail of all manual stock changes and write-offs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center text-slate-500 mb-2">
            <ArrowRightLeft className="h-5 w-5 mr-1" />
            <h3 className="font-semibold text-sm">Total Adjustments</h3>
          </div>
          <p className="text-3xl font-black text-slate-900">{adjustments?.length || 0}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center text-rose-600 mb-2">
            <AlertOctagon className="h-5 w-5 mr-1" />
            <h3 className="font-semibold text-sm">Damaged Write-offs</h3>
          </div>
          <p className="text-3xl font-black text-rose-700">{damageCount}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center text-orange-600 mb-2">
            <TrendingDown className="h-5 w-5 mr-1" />
            <h3 className="font-semibold text-sm">Expired Write-offs</h3>
          </div>
          <p className="text-3xl font-black text-orange-700">{expiryCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center">
          <ClipboardList className="h-5 w-5 text-slate-500 mr-2" />
          <h3 className="font-bold text-slate-800">Adjustment Log</h3>
        </div>
        
        {!adjustments || adjustments.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No stock adjustments recorded.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-600">ID</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">SKU</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">Quantity Change</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">Reason</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">Admin ID</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {adjustments.map((adj: any) => (
                  <tr key={adj.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{adj.id}</td>
                    <td className="px-6 py-4 font-mono text-xs font-bold text-slate-700">{adj.sku}</td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${adj.quantity < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {adj.quantity > 0 ? '+' : ''}{adj.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-slate-100 text-slate-700">
                        {adj.reasonCode}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-600">{adj.adminId || 'SYSTEM'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs font-mono">
                      {format(new Date(adj.createdAt), 'dd MMM yyyy, HH:mm')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
