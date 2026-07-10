import { useState, useEffect } from 'react';
import { PackageMinus, Search, Building2, DownloadCloud, FileText, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/axios';
import toast from 'react-hot-toast';

export default function StockOutScreen() {
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [dispatchReason, setDispatchReason] = useState('wholesale');
  const [referenceNum, setReferenceNum] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
  
  const [adjWarehouseId, setAdjWarehouseId] = useState('');
  const [adjSku, setAdjSku] = useState('');
  const [adjQuantity, setAdjQuantity] = useState(0);
  const [adjReason, setAdjReason] = useState('');

  const handleAdjustmentSubmit = async () => {
    if (!adjWarehouseId || !adjSku || !adjReason || adjQuantity === 0) {
      toast.error('Please fill all required adjustment fields');
      return;
    }
    try {
      await api.post('/inventory/adjustment', {
        warehouseId: adjWarehouseId,
        sku: adjSku,
        quantity: Number(adjQuantity),
        reason: adjReason
      });
      toast.success('Stock adjusted successfully');
      setShowAdjustmentModal(false);
      setAdjWarehouseId('');
      setAdjSku('');
      setAdjQuantity(0);
      setAdjReason('');
    } catch (err) {
      toast.error('Failed to adjust stock');
    }
  };

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const { data } = await api.get('/inventory/warehouses');
        setWarehouses(data);
      } catch (err) {
        console.error('Failed to load warehouses', err);
      }
    };
    fetchWarehouses();
  }, []);

  const handleAddItem = () => {
    // Mock selecting an item from the warehouse
    setItems([...items, { id: Date.now(), sku: 'SKU-' + Math.floor(Math.random() * 1000), name: 'Dispatch Product', qty: 5, stock: 120 }]);
  };

  const handleQtyChange = (id: number, qty: number) => {
    setItems(items.map(item => item.id === id ? { ...item, qty: Number(qty) } : item));
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleConfirmDispatch = async () => {
    if (!selectedWarehouse) {
      toast.error('Please select a source warehouse');
      return;
    }
    if (items.length === 0) {
      toast.error('Please add at least one item to dispatch');
      return;
    }

    setIsLoading(true);
    try {
      // Send multiple requests since backend currently expects single item per call
      const requests = items.map(item => {
        if (dispatchReason === 'damage') {
          return api.post('/inventory/damaged', {
            sku: item.sku,
            quantity: item.qty,
            reason: referenceNum || 'Damaged Write-off'
          });
        } else if (dispatchReason === 'expired') {
          return api.post('/inventory/expired', {
            sku: item.sku,
            quantity: item.qty,
            batchNo: referenceNum || 'UNKNOWN-BATCH'
          });
        } else {
          return api.post('/inventory/stock-out', {
            warehouseId: selectedWarehouse,
            sku: item.sku,
            quantity: item.qty,
            reference: referenceNum
          });
        }
      });
      
      await Promise.all(requests);
      toast.success('Stock dispatched successfully!');
      setItems([]); 
      setReferenceNum('');
    } catch (err) {
      console.error(err);
      toast.error('Failed to dispatch stock');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Stock Out (Dispatch)</h2>
          <p className="text-sm text-slate-500 mt-1">Record outgoing inventory for wholesale, transfers, or damage write-offs.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => {
              toast.success('Template downloaded successfully! (Mock)');
            }}
            className="bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <DownloadCloud className="w-4 h-4" /> Export Template
          </button>
          <button 
            onClick={() => setShowAdjustmentModal(true)}
            className="bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2 shadow-sm">
            Stock Adjustment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-slate-400" /> Dispatch Details
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Source Warehouse *</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                  value={selectedWarehouse}
                  onChange={(e) => setSelectedWarehouse(e.target.value)}
                >
                  <option value="">Select Warehouse...</option>
                  {warehouses.map(w => (
                    <option key={w.id} value={w.id}>{w.name} ({w.code})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Dispatch Reason / Type *</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                  value={dispatchReason}
                  onChange={(e) => setDispatchReason(e.target.value)}
                >
                  <option value="wholesale">B2B Wholesale Order</option>
                  <option value="transfer">Warehouse Transfer</option>
                  <option value="damage">Damage Write-off</option>
                  <option value="expired">Expired Write-off</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Reference Number (Order ID / Return ID)</label>
              <input 
                type="text" 
                placeholder="e.g. B2B-ORD-9912"
                value={referenceNum}
                onChange={(e) => setReferenceNum(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <PackageMinus className="w-5 h-5 text-slate-400" /> Items to Dispatch
              </h3>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Search available stock..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                />
              </div>
            </div>

            {items.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                <PackageMinus className="w-10 h-10 text-slate-300 mb-3" />
                <p className="font-semibold text-slate-600">No items selected</p>
                <p className="text-sm text-slate-500 max-w-sm mt-1">Search the warehouse inventory to add items to this dispatch.</p>
                <button onClick={handleAddItem} className="mt-4 text-sm font-semibold text-rose-600 hover:text-rose-700">
                  + Add Sample Dispatch Item
                </button>
              </div>
            ) : (
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">SKU</th>
                      <th className="px-4 py-3">Product Name</th>
                      <th className="px-4 py-3 text-right">Available</th>
                      <th className="px-4 py-3 w-32">Qty Out</th>
                      <th className="px-4 py-3 w-16"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-mono text-xs text-slate-500">{item.sku}</td>
                        <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
                        <td className="px-4 py-3 text-right text-slate-500">{item.stock}</td>
                        <td className="px-4 py-3">
                          <input type="number" min="1" max={item.stock} value={item.qty} onChange={(e) => handleQtyChange(item.id, parseInt(e.target.value))} className="w-full border border-slate-200 rounded-lg px-2 py-1 text-sm focus:border-rose-500 outline-none" />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => handleRemoveItem(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">&times;</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
                  <button onClick={handleAddItem} className="text-xs font-bold text-slate-600 hover:text-slate-800">+ Add Another Line</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-400" /> Dispatch Summary
            </h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Source</span>
                <span className="font-semibold text-slate-800">{warehouses.find(w => w.id === selectedWarehouse)?.name || '-'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Total SKUs</span>
                <span className="font-semibold text-slate-800">{items.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Total Units Out</span>
                <span className="font-semibold text-slate-800">{items.reduce((acc, item) => acc + (item.qty || 0), 0)}</span>
              </div>
            </div>

            <button 
              onClick={handleConfirmDispatch}
              disabled={isLoading || !selectedWarehouse || items.length === 0}
              className="w-full bg-slate-800 text-white rounded-xl py-3 font-bold hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-sm">
              <CheckCircle2 className="w-5 h-5" /> {isLoading ? 'Processing...' : 'Confirm Dispatch'}
            </button>
            <p className="text-center text-xs text-slate-400 mt-3">This action will immediately deduct from live inventory.</p>
          </div>
        </div>
      </div>

      {showAdjustmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Stock Adjustment</h3>
              <button 
                onClick={() => setShowAdjustmentModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Warehouse</label>
                <select 
                  value={adjWarehouseId}
                  onChange={(e) => setAdjWarehouseId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                >
                  <option value="">Select Warehouse...</option>
                  {warehouses.map(w => (
                    <option key={w.id} value={w.id}>{w.name} ({w.code})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">SKU</label>
                <input 
                  type="text" 
                  placeholder="e.g. CSK-VC-001" 
                  value={adjSku}
                  onChange={(e) => setAdjSku(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Adjustment Quantity (+ / -)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 5 or -5" 
                  value={adjQuantity}
                  onChange={(e) => setAdjQuantity(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Reason</label>
                <textarea 
                  placeholder="e.g. Stock count mismatch" 
                  rows={2} 
                  value={adjReason}
                  onChange={(e) => setAdjReason(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                ></textarea>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  onClick={() => setShowAdjustmentModal(false)}
                  className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAdjustmentSubmit}
                  className="flex-1 bg-rose-600 text-white py-3 rounded-xl font-semibold hover:bg-rose-700 transition-colors shadow-sm shadow-rose-200"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
