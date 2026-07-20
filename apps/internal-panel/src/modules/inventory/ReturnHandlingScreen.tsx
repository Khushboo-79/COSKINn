import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryApi } from '../../core/api/inventory';
import { ArrowLeft, RotateCcw, PackageCheck, AlertOctagon, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const ReturnHandlingScreen = () => {
  const queryClient = useQueryClient();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const { data: returns, isLoading } = useQuery({
    queryKey: ['inventory', 'returns'],
    queryFn: inventoryApi.getReturns,
  });

  const restockMutation = useMutation({
    mutationFn: (data: { sku: string, quantity: number, warehouseId: string }) => {
      return inventoryApi.stockIn({
        sku: data.sku,
        quantity: data.quantity,
        warehouseId: data.warehouseId,
        reasonCode: 'RETURN_RESTOCK',
        notes: 'Customer return inspected and restocked.'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'returns'] });
      queryClient.invalidateQueries({ queryKey: ['inventory', 'stock'] });
      alert('Return successfully restocked to available inventory.');
      setProcessingId(null);
    },
    onError: (err: any) => {
      alert(`Error restocking: ${err.response?.data?.message || err.message}`);
      setProcessingId(null);
    }
  });

  const quarantineMutation = useMutation({
    mutationFn: (data: { sku: string, quantity: number, warehouseId: string }) => {
      return inventoryApi.reportDamaged({
        sku: data.sku,
        quantity: data.quantity,
        warehouseId: data.warehouseId,
        reason: 'Customer return failed inspection - Damaged.'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'returns'] });
      queryClient.invalidateQueries({ queryKey: ['inventory', 'stock'] });
      alert('Return successfully quarantined as damaged stock.');
      setProcessingId(null);
    },
    onError: (err: any) => {
      alert(`Error quarantining: ${err.response?.data?.message || err.message}`);
      setProcessingId(null);
    }
  });

  const handleAction = (ret: any, action: 'RESTOCK' | 'QUARANTINE') => {
    // In a real flow, we'd need the target warehouseId. We'll default to 'W1' or similar if not provided by the return object.
    const warehouseId = ret.warehouseId || '1'; 
    setProcessingId(ret.id);

    if (action === 'RESTOCK') {
      restockMutation.mutate({ sku: ret.sku, quantity: ret.quantity, warehouseId });
    } else {
      quarantineMutation.mutate({ sku: ret.sku, quantity: ret.quantity, warehouseId });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/inventory" className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Return Handling (QC)</h1>
          <p className="text-slate-500 text-sm mt-1">Inspect customer returns and determine stock disposition.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center text-slate-700 font-medium">
            <RotateCcw className="h-5 w-5 mr-2 text-slate-500" />
            Pending Returns for Inspection
          </div>
        </div>
        
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary-500" />
            <p>Loading pending returns...</p>
          </div>
        ) : !returns || returns.length === 0 ? (
          <div className="p-16 text-center text-slate-500">
            <RotateCcw className="h-10 w-10 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium text-slate-700">No pending returns</p>
            <p className="mt-1">All returned items have been processed.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Return ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Qty</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer Reason</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">QC Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {returns.map((ret: any, idx: number) => {
                  const isProcessing = processingId === ret.id;
                  
                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">#{ret.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{ret.sku}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">{ret.quantity}</td>
                      <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate" title={ret.reason}>
                        {ret.reason || 'No reason provided'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleAction(ret, 'RESTOCK')}
                            disabled={isProcessing}
                            className="px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 font-medium transition-colors flex items-center disabled:opacity-50"
                          >
                            <PackageCheck className="h-4 w-4 mr-1.5" />
                            Restock
                          </button>
                          <button
                            onClick={() => handleAction(ret, 'QUARANTINE')}
                            disabled={isProcessing}
                            className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 font-medium transition-colors flex items-center disabled:opacity-50"
                          >
                            <AlertOctagon className="h-4 w-4 mr-1.5" />
                            Quarantine
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
