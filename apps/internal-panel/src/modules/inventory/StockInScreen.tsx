import { useState, useEffect, useRef } from 'react';
import { PackagePlus, Search, Building2, UploadCloud, FileText, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/axios';
import toast from 'react-hot-toast';

export default function StockInScreen() {
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [supplier, setSupplier] = useState<any>(null);
  const [poRef, setPoRef] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n');
        const parsedItems: any[] = [];
        // Assuming CSV format: SKU,Name,Quantity
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          const [sku, name, qtyStr] = lines[i].split(',');
          if (sku && qtyStr) {
            parsedItems.push({
              id: Date.now() + i,
              sku: sku.trim(),
              name: name?.trim() || sku.trim(),
              qty: parseInt(qtyStr.trim(), 10) || 0
            });
          }
        }
        setItems(prev => [...prev, ...parsedItems]);
        toast.success(`Imported ${parsedItems.length} items from CSV`);
        setShowImportModal(false);
      } catch (err) {
        toast.error('Failed to parse CSV file');
      }
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    // Fetch real warehouses
    const fetchWarehouses = async () => {
      try {
        const { data } = await api.get('/inventory/warehouses');
        setWarehouses(data);
      } catch (err) {
        console.error('Failed to load warehouses', err);
      }
    };
    const fetchSupplier = async () => {
      try {
        const { data } = await api.get('/inventory/suppliers');
        if (data.length > 0) setSupplier(data[0]);
      } catch (err) {
        console.error('Failed to load suppliers');
      }
    };
    fetchWarehouses();
    fetchSupplier();
  }, []);

  const handleAddItem = () => {
    // In a real app, this would select a product from the DB. 
    // Here we just mock adding an item for demonstration.
    setItems([...items, { id: Date.now(), sku: 'SKU-' + Math.floor(Math.random() * 1000), name: 'Sample Product', qty: 10 }]);
  };

  const handleQtyChange = (id: number, qty: number) => {
    setItems(items.map(item => item.id === id ? { ...item, qty: Number(qty) } : item));
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleConfirmIntake = async () => {
    if (!selectedWarehouse) {
      toast.error('Please select a destination warehouse');
      return;
    }
    if (items.length === 0) {
      toast.error('Please add at least one item to receive');
      return;
    }

    setIsLoading(true);
    try {
      // Send multiple requests since backend currently expects single item per call
      const requests = items.map(item => 
        api.post('/inventory/stock-in', {
          warehouseId: selectedWarehouse,
          sku: item.sku,
          quantity: item.qty,
          reference: poRef
        })
      );
      
      await Promise.all(requests);
      toast.success('Stock received successfully!');
      setItems([]); // Clear form
      setPoRef('');
    } catch (err) {
      console.error(err);
      toast.error('Failed to receive stock');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Stock In (Receive)</h2>
          <p className="text-sm text-slate-500 mt-1">Record incoming inventory from suppliers or returns.</p>
        </div>
        <button 
          onClick={() => setShowImportModal(true)}
          className="bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2 shadow-sm">
          <UploadCloud className="w-4 h-4" /> Import CSV
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-slate-400" /> Intake Details
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Destination Warehouse *</label>
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
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Purchase Order Ref (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. PO-2023-441"
                  value={poRef}
                  onChange={(e) => setPoRef(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Supplier / Source</label>
              <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 font-medium">
                {supplier?.name || 'Default Supplier'}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <PackagePlus className="w-5 h-5 text-slate-400" /> Items to Receive
              </h3>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Search by SKU or Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                />
              </div>
            </div>

            {items.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                <PackagePlus className="w-10 h-10 text-slate-300 mb-3" />
                <p className="font-semibold text-slate-600">No items added yet</p>
                <p className="text-sm text-slate-500 max-w-sm mt-1">Search for products above or import a CSV to start building your intake list.</p>
                <button onClick={handleAddItem} className="mt-4 text-sm font-semibold text-rose-600 hover:text-rose-700">
                  + Add Sample Item
                </button>
              </div>
            ) : (
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">SKU</th>
                      <th className="px-4 py-3">Product Name</th>
                      <th className="px-4 py-3 w-32">Qty Received</th>
                      <th className="px-4 py-3 w-16"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-mono text-xs text-slate-500">{item.sku}</td>
                        <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
                        <td className="px-4 py-3">
                          <input type="number" min="1" value={item.qty} onChange={(e) => handleQtyChange(item.id, parseInt(e.target.value))} className="w-full border border-slate-200 rounded-lg px-2 py-1 text-sm focus:border-rose-500 outline-none" />
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
              <FileText className="w-5 h-5 text-slate-400" /> Intake Summary
            </h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Destination</span>
                <span className="font-semibold text-slate-800">{warehouses.find(w => w.id === selectedWarehouse)?.name || '-'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Total SKUs</span>
                <span className="font-semibold text-slate-800">{items.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Total Units</span>
                <span className="font-semibold text-slate-800">{items.reduce((acc, item) => acc + (item.qty || 0), 0)}</span>
              </div>
            </div>

            <button 
              onClick={handleConfirmIntake}
              disabled={isLoading || !selectedWarehouse || items.length === 0}
              className="w-full bg-rose-600 text-white rounded-xl py-3 font-bold hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-sm shadow-rose-200">
              <CheckCircle2 className="w-5 h-5" /> {isLoading ? 'Processing...' : 'Confirm Intake'}
            </button>
            <p className="text-center text-xs text-slate-400 mt-3">This action will instantly update live inventory levels.</p>
          </div>
        </div>
      </div>

      {/* Import CSV Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Import CSV</h3>
              <button 
                onClick={() => setShowImportModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl mx-auto flex items-center justify-center">
                <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <p className="font-bold text-slate-800">Drag & Drop your CSV file</p>
                <p className="text-xs text-slate-500 mt-1">Make sure it matches the required template format.</p>
              </div>
              <input 
                type="file" 
                accept=".csv" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileUpload} 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-slate-800 text-white py-3 rounded-xl font-semibold mt-4 hover:bg-slate-700 transition-colors"
              >
                Browse Files
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
