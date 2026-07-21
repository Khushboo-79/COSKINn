import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { warehouseApi } from '../../core/api/warehouse';
import { Search, Plus, FileText, Loader2, Save, X, Calendar, Truck } from 'lucide-react';

export const PurchaseOrderScreen = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // PO Form State
  const [vendorId, setVendorId] = useState('VEND-001');
  const [items, setItems] = useState([{ sku: '', requestedQty: 1, unitPrice: 0 }]);

  const { data: pos, isLoading } = useQuery({
    queryKey: ['admin', 'warehouse', 'pos'],
    queryFn: () => warehouseApi.getPurchaseOrders(),
  });

  const createMutation = useMutation({
    mutationFn: () => warehouseApi.createPurchaseOrder({
      warehouseId: 'default-warehouse',
      vendorId,
      items: items.map(i => ({
        ...i,
        requestedQty: Number(i.requestedQty),
        unitPrice: Number(i.unitPrice)
      }))
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'warehouse', 'pos'] });
      setIsModalOpen(false);
      setItems([{ sku: '', requestedQty: 1, unitPrice: 0 }]);
    },
    onError: (err: any) => {
      alert(`Error creating PO: ${err.response?.data?.message || err.message}`);
    }
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.some(i => !i.sku)) {
      alert('All items must have a SKU');
      return;
    }
    createMutation.mutate();
  };

  const addItem = () => setItems([...items, { sku: '', requestedQty: 1, unitPrice: 0 }]);
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));

  const filteredPOs = pos?.filter((po: any) => 
    po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    po.vendorId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Purchase Orders (PO)</h1>
          <p className="text-slate-500 text-sm mt-1">Manage inbound supply orders.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-xl transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create PO
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search POs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">PO Number</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Value</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <Loader2 className="h-8 w-8 text-primary-500 animate-spin mx-auto mb-4" />
                    <p>Loading Purchase Orders...</p>
                  </td>
                </tr>
              ) : !filteredPOs || filteredPOs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-500 bg-slate-50">
                    <FileText className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <p className="text-lg font-medium text-slate-700">No Purchase Orders found</p>
                  </td>
                </tr>
              ) : (
                filteredPOs.map((po: any) => (
                  <tr key={po.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-slate-900">PO-{po.id.slice(-8).toUpperCase()}</div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(po.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm flex items-center text-slate-700">
                        <Truck className="h-4 w-4 mr-2 text-slate-400" />
                        {po.vendorId || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        po.status === 'PENDING' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                        po.status === 'RECEIVED' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        po.status === 'COMPLETED' ? 'bg-green-100 text-green-800 border-green-200' :
                        'bg-slate-100 text-slate-800 border-slate-200'
                      }`}>
                        {po.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{po.items?.length || 0} SKUs</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-bold text-slate-900">
                        ₹{(po.items || []).reduce((sum: number, i: any) => sum + (i.unitPrice * i.requestedQty), 0).toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create PO Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
              <h2 className="text-lg font-bold text-slate-900">Create Purchase Order</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-1">Vendor ID</label>
                <input
                  type="text"
                  value={vendorId}
                  onChange={e => setVendorId(e.target.value)}
                  className="w-full max-w-xs px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="VEND-001"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <h3 className="font-semibold text-slate-900">Line Items</h3>
                  <button type="button" onClick={addItem} className="text-sm text-primary-600 font-medium hover:text-primary-700 flex items-center">
                    <Plus className="h-4 w-4 mr-1" /> Add Item
                  </button>
                </div>
                
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-end bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-slate-500 mb-1">SKU *</label>
                      <input
                        type="text"
                        required
                        value={item.sku}
                        onChange={e => {
                          const newItems = [...items];
                          newItems[idx].sku = e.target.value;
                          setItems(newItems);
                        }}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm font-mono"
                        placeholder="SKU-123"
                      />
                    </div>
                    <div className="w-24">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Qty *</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={item.requestedQty}
                        onChange={e => {
                          const newItems = [...items];
                          newItems[idx].requestedQty = parseInt(e.target.value) || 1;
                          setItems(newItems);
                        }}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                      />
                    </div>
                    <div className="w-32">
                      <label className="block text-xs font-medium text-slate-500 mb-1">Unit Price (₹) *</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        value={item.unitPrice}
                        onChange={e => {
                          const newItems = [...items];
                          newItems[idx].unitPrice = parseFloat(e.target.value) || 0;
                          setItems(newItems);
                        }}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                      />
                    </div>
                    {items.length > 1 && (
                      <button type="button" onClick={() => removeItem(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg mb-0.5">
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 shrink-0 bg-white">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 font-medium rounded-xl transition-colors">
                Cancel
              </button>
              <button onClick={handleCreate} disabled={createMutation.isPending} className="px-6 py-2 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors flex items-center">
                {createMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Generate PO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
