import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryApi } from '../../core/api/inventory';
import { AlertTriangle, Clock, Loader2, Save } from 'lucide-react';

export const ExceptionsScreen = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'damaged' | 'expired'>('damaged');
  
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState('');
  const [warehouseId, setWarehouseId] = useState('default-warehouse');

  const reportMutation = useMutation({
    mutationFn: () => {
      const payload = { sku, warehouseId, quantity, reason };
      if (activeTab === 'damaged') {
        return inventoryApi.reportDamaged(payload);
      } else {
        return inventoryApi.reportExpired(payload);
      }
    },
    onSuccess: () => {
      alert(`Successfully reported ${quantity} unit(s) of ${sku} as ${activeTab}.`);
      queryClient.invalidateQueries({ queryKey: ['admin', 'inventory'] });
      setSku('');
      setQuantity(1);
      setReason('');
    },
    onError: (err: any) => {
      alert(`Error reporting exception: ${err.response?.data?.message || err.message}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to deduct ${quantity} unit(s) of ${sku} from available inventory?`)) {
      reportMutation.mutate();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Defect & Exception Reporting</h1>
        <p className="text-slate-500 text-sm mt-1">Proactively flag damaged or expired stock found on the floor.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button
            onClick={() => setActiveTab('damaged')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center transition-colors ${
              activeTab === 'damaged' 
                ? 'bg-red-50 text-red-700 border-b-2 border-red-500' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Report Damaged Stock
          </button>
          <button
            onClick={() => setActiveTab('expired')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center transition-colors ${
              activeTab === 'expired' 
                ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-500' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Clock className="h-4 w-4 mr-2" />
            Report Expired Stock
          </button>
        </div>

        <div className="p-8">
          <div className={`mb-8 p-4 rounded-xl flex gap-3 text-sm ${activeTab === 'damaged' ? 'bg-red-50 text-red-800' : 'bg-orange-50 text-orange-800'}`}>
            {activeTab === 'damaged' ? <AlertTriangle className="h-5 w-5 shrink-0" /> : <Clock className="h-5 w-5 shrink-0" />}
            <p>Submitting this form will <strong>immediately deduct</strong> the specified quantity from available sellable inventory and move it to a quarantined state.</p>
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
                placeholder="Scan or type SKU..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={quantity}
                  onChange={e => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Warehouse ID</label>
                <input
                  type="text"
                  required
                  value={warehouseId}
                  onChange={e => setWarehouseId(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50 text-slate-500 cursor-not-allowed"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Reason / Details</label>
              <textarea
                required
                value={reason}
                onChange={e => setReason(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none resize-none"
                placeholder={activeTab === 'damaged' ? 'E.g., Forklift punctured box...' : 'E.g., Found during cycle count, expired on 2023-01-01...'}
              />
            </div>

            <button
              type="submit"
              disabled={reportMutation.isPending}
              className={`w-full py-3 text-white font-medium rounded-xl transition-colors shadow-sm flex items-center justify-center disabled:opacity-50 ${
                activeTab === 'damaged' ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'
              }`}
            >
              {reportMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5 mr-2" />}
              {activeTab === 'damaged' ? 'Confirm & Deduct Damaged Stock' : 'Confirm & Deduct Expired Stock'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
