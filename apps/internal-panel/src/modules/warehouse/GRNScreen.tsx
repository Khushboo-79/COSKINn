import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { warehouseApi } from '../../core/api/warehouse';
import { ClipboardCheck, Loader2, Save, X, Search, AlertTriangle } from 'lucide-react';

export const GRNScreen = () => {
  const queryClient = useQueryClient();
  const [selectedPO, setSelectedPO] = useState<any>(null);
  const [grnItems, setGrnItems] = useState<any[]>([]);

  const { data: pos, isLoading: loadingPOs } = useQuery({
    queryKey: ['admin', 'warehouse', 'pos'],
    queryFn: () => warehouseApi.getPurchaseOrders(),
  });

  const pendingPOs = pos?.filter((po: any) => po.status === 'PENDING') || [];

  const handleSelectPO = (po: any) => {
    setSelectedPO(po);
    setGrnItems(po.items.map((i: any) => ({
      sku: i.sku,
      requestedQty: i.requestedQty,
      receivedQty: i.requestedQty, // Default to receiving all
      acceptedQty: i.requestedQty, // Default to accepting all
      rejectedQty: 0,
      reason: ''
    })));
  };

  const grnMutation = useMutation({
    mutationFn: () => warehouseApi.createGrn({
      purchaseOrderId: selectedPO.id,
      items: grnItems.map(i => ({
        sku: i.sku,
        receivedQty: Number(i.receivedQty),
        acceptedQty: Number(i.acceptedQty),
        rejectedQty: Number(i.rejectedQty),
        reason: i.reason
      }))
    }),
    onSuccess: () => {
      alert('GRN processed successfully. Inventory has been updated.');
      queryClient.invalidateQueries({ queryKey: ['admin', 'warehouse', 'pos'] });
      setSelectedPO(null);
      setGrnItems([]);
    },
    onError: (err: any) => {
      alert(`Error processing GRN: ${err.response?.data?.message || err.message}`);
    }
  });

  const handleCreateGrn = () => {
    // Validate
    const hasError = grnItems.some(i => i.receivedQty !== (i.acceptedQty + i.rejectedQty));
    if (hasError) {
      alert("Error: For each SKU, Accepted Qty + Rejected Qty must equal Received Qty.");
      return;
    }
    const hasRejectionsWithoutReason = grnItems.some(i => i.rejectedQty > 0 && !i.reason.trim());
    if (hasRejectionsWithoutReason) {
      alert("Error: You must provide a reason for any rejected quantities.");
      return;
    }

    if (window.confirm("Confirm GRN submission? This will permanently update inventory levels.")) {
      grnMutation.mutate();
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Goods Receipt Notes (GRN)</h1>
          <p className="text-slate-500 text-sm mt-1">Receive physical stock against pending Purchase Orders.</p>
        </div>
      </div>

      {!selectedPO ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Select Pending PO to Receive</h2>
          </div>
          {loadingPOs ? (
            <div className="p-12 text-center"><Loader2 className="h-8 w-8 text-primary-500 animate-spin mx-auto" /></div>
          ) : pendingPOs.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <ClipboardCheck className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="font-medium">No pending Purchase Orders available.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {pendingPOs.map((po: any) => (
                <div key={po.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <h3 className="font-bold text-slate-900 font-mono">PO-{po.id.slice(-8).toUpperCase()}</h3>
                    <div className="text-sm text-slate-500 mt-1">Vendor: {po.vendorId || 'N/A'} • Items: {po.items.length}</div>
                  </div>
                  <button 
                    onClick={() => handleSelectPO(po)}
                    className="px-4 py-2 bg-white border border-primary-200 text-primary-700 hover:bg-primary-50 font-medium rounded-xl transition-colors shadow-sm"
                  >
                    Start Receiving
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-bold text-slate-900 text-lg flex items-center">
                Receiving PO-{selectedPO.id.slice(-8).toUpperCase()}
              </h2>
              <p className="text-sm text-slate-500 mt-1">Verify physical quantities against the order.</p>
            </div>
            <button 
              onClick={() => setSelectedPO(null)}
              className="text-slate-500 hover:text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              Cancel Receiving
            </button>
          </div>

          <div className="p-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="pb-3 text-sm font-semibold text-slate-600">SKU</th>
                  <th className="pb-3 text-sm font-semibold text-slate-600 text-center">Ordered</th>
                  <th className="pb-3 text-sm font-semibold text-slate-600 text-center">Received</th>
                  <th className="pb-3 text-sm font-semibold text-green-600 text-center">Accepted</th>
                  <th className="pb-3 text-sm font-semibold text-red-600 text-center">Rejected</th>
                  <th className="pb-3 text-sm font-semibold text-slate-600">Rejection Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {grnItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-4 font-mono text-sm text-slate-900 font-medium">{item.sku}</td>
                    <td className="py-4 text-center text-slate-500">{item.requestedQty}</td>
                    <td className="py-4 px-2">
                      <input 
                        type="number" min="0" value={item.receivedQty}
                        onChange={(e) => {
                          const newItems = [...grnItems];
                          newItems[idx].receivedQty = parseInt(e.target.value) || 0;
                          // auto adjust accepted if they match perfectly initially
                          if (newItems[idx].rejectedQty === 0) {
                             newItems[idx].acceptedQty = newItems[idx].receivedQty;
                          }
                          setGrnItems(newItems);
                        }}
                        className="w-full max-w-[100px] mx-auto text-center px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                      />
                    </td>
                    <td className="py-4 px-2">
                      <input 
                        type="number" min="0" value={item.acceptedQty}
                        onChange={(e) => {
                          const newItems = [...grnItems];
                          newItems[idx].acceptedQty = parseInt(e.target.value) || 0;
                          newItems[idx].rejectedQty = Math.max(0, newItems[idx].receivedQty - newItems[idx].acceptedQty);
                          setGrnItems(newItems);
                        }}
                        className="w-full max-w-[100px] mx-auto text-center px-3 py-2 border border-green-200 bg-green-50 text-green-700 rounded-lg outline-none focus:border-green-500 font-medium"
                      />
                    </td>
                    <td className="py-4 px-2">
                      <input 
                        type="number" min="0" value={item.rejectedQty}
                        onChange={(e) => {
                          const newItems = [...grnItems];
                          newItems[idx].rejectedQty = parseInt(e.target.value) || 0;
                          newItems[idx].acceptedQty = Math.max(0, newItems[idx].receivedQty - newItems[idx].rejectedQty);
                          setGrnItems(newItems);
                        }}
                        className="w-full max-w-[100px] mx-auto text-center px-3 py-2 border border-red-200 bg-red-50 text-red-700 rounded-lg outline-none focus:border-red-500 font-medium"
                      />
                    </td>
                    <td className="py-4">
                      <input 
                        type="text"
                        placeholder="Required if rejected > 0"
                        value={item.reason}
                        onChange={(e) => {
                          const newItems = [...grnItems];
                          newItems[idx].reason = e.target.value;
                          setGrnItems(newItems);
                        }}
                        className={`w-full px-3 py-2 border rounded-lg outline-none text-sm ${item.rejectedQty > 0 && !item.reason ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
             <div className="text-sm text-slate-500 flex items-center">
               <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
               Accepted quantities will immediately increase available stock.
             </div>
             <button
               onClick={handleCreateGrn}
               disabled={grnMutation.isPending}
               className="px-6 py-2 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors shadow-sm flex items-center disabled:opacity-50"
             >
               {grnMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
               Submit GRN
             </button>
          </div>
        </div>
      )}
    </div>
  );
};
