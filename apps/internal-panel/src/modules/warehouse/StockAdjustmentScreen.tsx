import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryApi } from '../../core/api/inventory';
import { Settings2, Loader2, Save, History } from 'lucide-react';

export const StockAdjustmentScreen = () => {
  const queryClient = useQueryClient();
  const [sku, setSku] = useState('');
  const [type, setType] = useState<'ABSOLUTE' | 'OFFSET'>('ABSOLUTE');
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState('');
  const [warehouseId] = useState('default-warehouse');

  const adjustMutation = useMutation({
    mutationFn: () => inventoryApi.adjustStock({ sku, warehouseId, type, quantity, reason }),
    onSuccess: () => {
      alert(`Stock adjusted successfully for ${sku}.`);
      queryClient.invalidateQueries({ queryKey: ['admin', 'inventory'] });
      setSku('');
      setQuantity(0);
      setReason('');
    },
    onError: (err: any) => {
      alert(`Error adjusting stock: ${err.response?.data?.message || err.message}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const actionText = type === 'ABSOLUTE' 
      ? `set the stock of ${sku} to exactly ${quantity}` 
      : `adjust the stock of ${sku} by ${quantity > 0 ? '+' : ''}${quantity}`;
      
    if (window.confirm(`Are you sure you want to ${actionText}?`)) {
      adjustMutation.mutate();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Stock Adjustments</h1>
        <p className="text-slate-500 text-sm mt-1">Manual overrides for physical cycle counts and discrepancies.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6 p-4 bg-slate-50 text-slate-700 text-sm rounded-xl border border-slate-200">
          <Settings2 className="h-5 w-5 text-slate-400 shrink-0" />
          <p>
            <strong>Note:</strong> All manual stock adjustments are permanently logged in the audit trail. Please ensure you have authorization before forcing a ledger update.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Product SKU</label>
            <input
              type="text"
              required
              value={sku}
              onChange={e => setSku(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none font-mono"
              placeholder="e.g. SKU-12345"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Adjustment Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as 'ABSOLUTE' | 'OFFSET')}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none bg-white"
              >
                <option value="ABSOLUTE">Absolute (Set Exact Amount)</option>
                <option value="OFFSET">Offset (Add / Subtract)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {type === 'ABSOLUTE' ? 'New Exact Quantity' : 'Offset Amount (e.g. -2)'}
              </label>
              <input
                type="number"
                required
                value={quantity}
                onChange={e => setQuantity(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Adjustment</label>
            <textarea
              required
              value={reason}
              onChange={e => setReason(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none resize-none"
              placeholder="E.g., Discrepancy found during Q3 physical cycle count..."
            />
          </div>

          <button
            type="submit"
            disabled={adjustMutation.isPending}
            className="w-full py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center disabled:opacity-50"
          >
            {adjustMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5 mr-2" />}
            Confirm Adjustment
          </button>
        </form>
      </div>
    </div>
  );
};
