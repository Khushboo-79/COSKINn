import { useState, useEffect } from 'react';
import { ArrowRightLeft, Search, Building2, FileText, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/axios';
import toast from 'react-hot-toast';

export default function TransfersScreen() {
  const [sourceWarehouse, setSourceWarehouse] = useState('');
  const [destWarehouse, setDestWarehouse] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    setItems([...items, { id: Date.now(), sku: 'SKU-' + Math.floor(Math.random() * 1000), name: 'Transfer Item', qty: 10, stock: 50 }]);
  };

  const handleQtyChange = (id: number, qty: number) => {
    setItems(items.map(item => item.id === id ? { ...item, qty: Number(qty) } : item));
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleInitiateTransfer = async () => {
    if (!sourceWarehouse || !destWarehouse) {
      toast.error('Please select both source and destination warehouses');
      return;
    }
    if (sourceWarehouse === destWarehouse) {
      toast.error('Source and destination cannot be the same');
      return;
    }
    if (items.length === 0) {
      toast.error('Please add at least one item to transfer');
      return;
    }

    setIsLoading(true);
    try {
      const requests = items.map(item => 
        api.post('/inventory/transfer', {
          fromWarehouseId: sourceWarehouse,
          toWarehouseId: destWarehouse,
          sku: item.sku,
          quantity: item.qty
        })
      );
      
      await Promise.all(requests);
      toast.success('Transfer initiated successfully!');
      setItems([]); 
    } catch (err) {
      console.error(err);
      toast.error('Failed to initiate transfer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Warehouse Transfers</h2>
          <p className="text-sm text-slate-500 mt-1">Move stock safely between internal warehouse locations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-slate-400" /> Transfer Route
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center relative">
              <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-3 p-2 bg-slate-50 border border-slate-200 rounded-full z-10">
                 <ArrowRightLeft className="w-4 h-4 text-slate-400" />
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Source Warehouse</label>
                <select 
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all shadow-sm"
                  value={sourceWarehouse}
                  onChange={(e) => setSourceWarehouse(e.target.value)}
                >
                  <option value="">Select Origin...</option>
                  {warehouses.map(w => (
                    <option key={w.id} value={w.id}>{w.name} ({w.code})</option>
                  ))}
                </select>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Destination Warehouse</label>
                <select 
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none transition-all shadow-sm"
                  value={destWarehouse}
                  onChange={(e) => setDestWarehouse(e.target.value)}
                >
                  <option value="">Select Destination...</option>
                  {warehouses.map(w => (
                    <option key={w.id} value={w.id}>{w.name} ({w.code})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-slate-400" /> Items to Transfer
              </h3>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Search available stock..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                  disabled={!sourceWarehouse}
                />
              </div>
            </div>

            {items.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                <ArrowRightLeft className="w-10 h-10 text-slate-300 mb-3" />
                <p className="font-semibold text-slate-600">No items selected</p>
                <p className="text-sm text-slate-500 max-w-sm mt-1">
                  {!sourceWarehouse ? 'Please select a source warehouse first to browse available stock.' : 'Search the source warehouse to add items to this transfer.'}
                </p>
                <button onClick={handleAddItem} disabled={!sourceWarehouse} className="mt-4 text-sm font-semibold text-rose-600 hover:text-rose-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  + Add Sample Transfer Item
                </button>
              </div>
            ) : (
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">SKU</th>
                      <th className="px-4 py-3">Product Name</th>
                      <th className="px-4 py-3 text-right">Available in Source</th>
                      <th className="px-4 py-3 w-32">Qty to Move</th>
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
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-400" /> Transfer Summary
            </h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">From</span>
                <span className="font-semibold text-slate-800">{warehouses.find(w => w.id === sourceWarehouse)?.name || '-'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">To</span>
                <span className="font-semibold text-slate-800">{warehouses.find(w => w.id === destWarehouse)?.name || '-'}</span>
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between text-sm">
                <span className="text-slate-500">Total SKUs</span>
                <span className="font-semibold text-slate-800">{items.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Total Units</span>
                <span className="font-semibold text-slate-800">{items.reduce((acc, item) => acc + (item.qty || 0), 0)}</span>
              </div>
            </div>

            <button 
              onClick={handleInitiateTransfer}
              disabled={isLoading || !sourceWarehouse || !destWarehouse || items.length === 0}
              className="w-full bg-blue-600 text-white rounded-xl py-3 font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-sm shadow-blue-200">
              <CheckCircle2 className="w-5 h-5" /> {isLoading ? 'Processing...' : 'Initiate Transfer'}
            </button>
            <p className="text-center text-xs text-slate-400 mt-3">This will mark items as "In Transit" until received.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
