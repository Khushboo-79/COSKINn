import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../../core/api/orders';
import { ClipboardCheck, Loader2, Save, X, Search, AlertTriangle, BoxSelect } from 'lucide-react';

export const ReturnsQCScreen = () => {
  const queryClient = useQueryClient();
  const [selectedReturn, setSelectedReturn] = useState<any>(null);
  const [qcItems, setQcItems] = useState<any[]>([]);
  const [notes, setNotes] = useState('');

  const { data: returns, isLoading } = useQuery({
    queryKey: ['admin', 'returns'],
    queryFn: () => orderApi.getAllReturns(),
  });

  // Only show returns that are waiting for warehouse QC (e.g., APPROVED or physical RECEIVED status)
  const pendingReturns = returns?.filter((r: any) => r.status === 'APPROVED' || r.status === 'RECEIVED') || [];

  const handleSelectReturn = (ret: any) => {
    setSelectedReturn(ret);
    setQcItems(ret.items.map((i: any) => ({
      sku: i.sku,
      returnedQty: i.quantity,
      sellableQty: i.quantity, // Default to all sellable
      damagedQty: 0
    })));
    setNotes('');
  };

  const qcMutation = useMutation({
    mutationFn: () => orderApi.processQC(selectedReturn.id, {
      items: qcItems.map(i => ({
        sku: i.sku,
        sellableQty: Number(i.sellableQty),
        damagedQty: Number(i.damagedQty)
      })),
      notes
    }),
    onSuccess: () => {
      alert('Return QC completed. Inventory has been updated.');
      queryClient.invalidateQueries({ queryKey: ['admin', 'returns'] });
      setSelectedReturn(null);
      setQcItems([]);
      setNotes('');
    },
    onError: (err: any) => {
      alert(`Error processing QC: ${err.response?.data?.message || err.message}`);
    }
  });

  const handleSubmit = () => {
    const hasError = qcItems.some(i => i.returnedQty !== (i.sellableQty + i.damagedQty));
    if (hasError) {
      alert("Error: Sellable Qty + Damaged Qty must equal the Returned Qty for each item.");
      return;
    }
    
    if (window.confirm("Confirm QC results? Sellable units will be added to available inventory immediately.")) {
      qcMutation.mutate();
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Returns Quality Control</h1>
          <p className="text-slate-500 text-sm mt-1">Inspect returned units and route to sellable or damaged bins.</p>
        </div>
      </div>

      {!selectedReturn ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Pending Returns Queue</h2>
          </div>
          {isLoading ? (
            <div className="p-12 text-center"><Loader2 className="h-8 w-8 text-amber-500 animate-spin mx-auto" /></div>
          ) : pendingReturns.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <BoxSelect className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="font-medium">No returned orders waiting for inspection.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {pendingReturns.map((ret: any) => (
                <div key={ret.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <h3 className="font-bold text-slate-900 font-mono">RET-{ret.id.slice(-8).toUpperCase()}</h3>
                    <div className="text-sm text-slate-500 mt-1">Order: #{ret.orderId.slice(-8).toUpperCase()} • Reason: {ret.reason}</div>
                  </div>
                  <button 
                    onClick={() => handleSelectReturn(ret)}
                    className="px-4 py-2 bg-amber-50 text-amber-700 hover:bg-amber-100 font-medium rounded-xl transition-colors shadow-sm"
                  >
                    Start Inspection
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="p-6 border-b border-slate-100 bg-amber-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-bold text-amber-900 text-lg flex items-center">
                Inspecting Return RET-{selectedReturn.id.slice(-8).toUpperCase()}
              </h2>
              <p className="text-sm text-amber-700 mt-1">Reason: {selectedReturn.reason}</p>
            </div>
            <button 
              onClick={() => setSelectedReturn(null)}
              className="text-amber-700 hover:text-amber-900 bg-white border border-amber-200 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>

          <div className="p-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="pb-3 text-sm font-semibold text-slate-600">SKU</th>
                  <th className="pb-3 text-sm font-semibold text-slate-600 text-center">Returned Qty</th>
                  <th className="pb-3 text-sm font-semibold text-green-600 text-center">Sellable Qty</th>
                  <th className="pb-3 text-sm font-semibold text-red-600 text-center">Damaged Qty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {qcItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-4 font-mono text-sm text-slate-900 font-medium">{item.sku}</td>
                    <td className="py-4 text-center text-slate-500 font-bold">{item.returnedQty}</td>
                    <td className="py-4 px-2">
                      <input 
                        type="number" min="0" max={item.returnedQty} value={item.sellableQty}
                        onChange={(e) => {
                          const newItems = [...qcItems];
                          const val = parseInt(e.target.value) || 0;
                          newItems[idx].sellableQty = val;
                          newItems[idx].damagedQty = Math.max(0, item.returnedQty - val);
                          setQcItems(newItems);
                        }}
                        className="w-full max-w-[120px] mx-auto text-center px-3 py-2 border border-green-200 bg-green-50 text-green-700 rounded-lg outline-none focus:border-green-500 font-medium"
                      />
                    </td>
                    <td className="py-4 px-2">
                      <input 
                        type="number" min="0" max={item.returnedQty} value={item.damagedQty}
                        onChange={(e) => {
                          const newItems = [...qcItems];
                          const val = parseInt(e.target.value) || 0;
                          newItems[idx].damagedQty = val;
                          newItems[idx].sellableQty = Math.max(0, item.returnedQty - val);
                          setQcItems(newItems);
                        }}
                        className="w-full max-w-[120px] mx-auto text-center px-3 py-2 border border-red-200 bg-red-50 text-red-700 rounded-lg outline-none focus:border-red-500 font-medium"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <label className="block text-sm font-medium text-slate-700 mb-2">Inspection Notes (Required if any items are damaged)</label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                rows={3}
                placeholder="E.g., Box was crushed during transit, product leaked..."
              />
            </div>
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
             <div className="text-sm text-slate-500 flex items-center max-w-lg">
               <AlertTriangle className="h-5 w-5 mr-3 text-amber-500 flex-shrink-0" />
               Sellable units are instantly restocked. Damaged units are moved to quarantine and will not be available for sale.
             </div>
             <button
               onClick={handleSubmit}
               disabled={qcMutation.isPending}
               className="px-6 py-2 bg-amber-600 text-white font-medium rounded-xl hover:bg-amber-700 transition-colors shadow-sm flex items-center disabled:opacity-50"
             >
               {qcMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
               Submit QC Report
             </button>
          </div>
        </div>
      )}
    </div>
  );
};
