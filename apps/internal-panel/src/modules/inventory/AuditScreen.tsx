import { toast } from 'sonner';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryApi } from '../../core/api/inventory';
import { ArrowLeft, Calculator, Save, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AuditScreen = () => {
  const queryClient = useQueryClient();
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>('');
  const [physicalCounts, setPhysicalCounts] = useState<Record<string, number>>({});

  const { data: warehouses } = useQuery({
    queryKey: ['inventory', 'warehouses'],
    queryFn: inventoryApi.getWarehouses,
  });

  const { data: stockList, isLoading } = useQuery({
    queryKey: ['inventory', 'stock'],
    queryFn: () => inventoryApi.getGlobalStock(),
  });

  const adjustmentMutation = useMutation({
    mutationFn: (payload: any) => inventoryApi.adjustStock(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'stock'] });
    }
  });

  const handleCountChange = (sku: string, value: string) => {
    const num = parseInt(value, 10);
    setPhysicalCounts(prev => ({
      ...prev,
      [sku]: isNaN(num) ? 0 : num
    }));
  };

  const handleReconcile = async () => {
    if (!selectedWarehouseId) {
      toast('Please select a warehouse first.');
      return;
    }

    const discrepancies = stockList?.filter(item => {
      const physical = physicalCounts[item.sku];
      return physical !== undefined && physical !== item.available;
    });

    if (!discrepancies || discrepancies.length === 0) {
      toast('No discrepancies found to reconcile.');
      return;
    }

    const confirm = window.confirm(`You are about to reconcile ${discrepancies.length} SKU(s). This will create ledger entries. Proceed?`);
    if (!confirm) return;

    for (const item of discrepancies) {
      const physical = physicalCounts[item.sku];
      const diff = physical - item.available;
      
      const payload = {
        sku: item.sku,
        warehouseId: selectedWarehouseId,
        quantity: Math.abs(diff),
        reasonCode: diff > 0 ? 'MANUAL_CORRECTION' : 'SHRINKAGE',
        notes: `Audit reconciliation variance of ${diff}`,
        type: diff > 0 ? 'IN' : 'OUT'
      };

      try {
        if (diff > 0) {
          await inventoryApi.stockIn({ ...payload, reasonCode: payload.reasonCode });
        } else {
          await inventoryApi.stockOut({ ...payload, reasonCode: payload.reasonCode });
        }
      } catch (e) {
        console.error('Failed to reconcile sku', item.sku, e);
      }
    }

    toast('Reconciliation complete.');
    setPhysicalCounts({});
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/inventory" className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory Audit</h1>
          <p className="text-slate-500 text-sm mt-1">Perform cyclic counts and reconcile discrepancies.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-[calc(100vh-200px)]">
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Calculator className="h-5 w-5 text-slate-500" />
            <select
              value={selectedWarehouseId}
              onChange={(e) => setSelectedWarehouseId(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none min-w-[200px]"
            >
              <option value="">Select Target Warehouse...</option>
              {warehouses?.map(w => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleReconcile}
            disabled={!selectedWarehouseId || Object.keys(physicalCounts).length === 0}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            Reconcile Discrepancies
          </button>
        </div>
        
        <div className="flex-1 overflow-auto">
          {isLoading ? (
            <div className="p-12 text-center text-slate-500">Loading system counts...</div>
          ) : (
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-white sticky top-0 shadow-sm z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">System Count</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider w-48">Physical Count</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Variance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {stockList?.map((item: any) => {
                  const physical = physicalCounts[item.sku];
                  const hasInput = physical !== undefined;
                  const variance = hasInput ? physical - item.available : null;
                  
                  return (
                    <tr key={item.sku} className={`hover:bg-slate-50 transition-colors ${hasInput ? 'bg-blue-50/30' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.sku}</td>
                      <td className="px-6 py-4 text-sm text-slate-500 truncate max-w-xs">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-slate-700">{item.available}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          disabled={!selectedWarehouseId}
                          value={hasInput ? physical : ''}
                          onChange={(e) => handleCountChange(item.sku, e.target.value)}
                          placeholder="Count..."
                          className="w-full text-right px-3 py-1.5 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 disabled:bg-slate-100"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {!hasInput ? (
                          <span className="text-slate-300">-</span>
                        ) : variance === 0 ? (
                          <span className="inline-flex items-center text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full text-xs font-medium">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Match
                          </span>
                        ) : (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variance! > 0 ? 'text-blue-600 bg-blue-50' : 'text-red-600 bg-red-50'}`}>
                            <AlertOctagon className="h-3 w-3 mr-1" />
                            {variance! > 0 ? `+${variance}` : variance}
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
