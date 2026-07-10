import { useState, useEffect } from 'react';
import { Search, Plus, FileText, DownloadCloud, Clock, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/axios';
import toast from 'react-hot-toast';

export default function PurchaseOrdersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [purchaseOrders, setPurchaseOrders] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showPOModal, setShowPOModal] = useState(false);

  useEffect(() => {
    fetchPurchaseOrders();
    fetchWarehouses();
  }, []);

  const fetchPurchaseOrders = async () => {
    try {
      const { data } = await api.get('/purchase-orders');
      setPurchaseOrders(data);
    } catch (err) {
      toast.error('Failed to load purchase orders');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const { data } = await api.get('/inventory/warehouses');
      setWarehouses(data);
      if (data.length > 0) setSelectedWarehouseId(data[0].id);
    } catch (err) {
      console.error('Failed to load warehouses');
    }
  };

  const handleCreatePO = async () => {
    if (!selectedWarehouseId) {
      toast.error('Please select a destination warehouse');
      return;
    }
    try {
      await api.post('/purchase-orders', {
        warehouseId: selectedWarehouseId,
        status: 'DRAFT'
      });
      toast.success('Purchase Order Draft Created!');
      setShowPOModal(false);
      fetchPurchaseOrders();
    } catch (error) {
      toast.error('Failed to create Purchase Order');
    }
  };

  const filteredOrders = purchaseOrders.filter(po => 
    po.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Purchase Orders</h2>
          <p className="text-sm text-slate-500 mt-1">Create and track orders placed with COSKINn Manufacturer.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => toast('Preparing export...', { icon: '⬇️' })}
            className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <DownloadCloud className="w-4 h-4" /> Export POs
          </button>
          <button 
            onClick={() => setShowPOModal(true)}
            className="bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> Create PO
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-400" /> Active Purchase Orders
          </h3>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search PO number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm w-72 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-white text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">PO Number</th>
              <th className="px-6 py-4">Supplier</th>
              <th className="px-6 py-4">Order Date</th>
              <th className="px-6 py-4">Destination</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr><td colSpan={6} className="text-center py-8 text-slate-500">Loading purchase orders...</td></tr>
            ) : filteredOrders.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-slate-500">No purchase orders found.</td></tr>
            ) : filteredOrders.map(po => (
              <tr key={po.id} className="hover:bg-slate-50/50 group transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-slate-700">{po.id}</td>
                <td className="px-6 py-4 font-medium text-slate-800">COSKINn Manufacturer</td>
                <td className="px-6 py-4 text-slate-500">{new Date(po.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-slate-700 font-medium">{po.warehouse?.name || 'N/A'}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                    po.status === 'RECEIVED' ? 'bg-emerald-50 text-emerald-700' : 
                    po.status === 'ISSUED' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {po.status === 'RECEIVED' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    {po.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm font-semibold text-rose-600 hover:text-rose-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create PO Modal */}
      {showPOModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Create Purchase Order</h3>
              <button 
                onClick={() => setShowPOModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Supplier</label>
                  <input type="text" value="COSKINn Central Manufacturer" disabled className="w-full px-4 py-2.5 bg-slate-100 text-slate-500 border border-slate-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Destination Warehouse</label>
                  <select 
                    value={selectedWarehouseId}
                    onChange={(e) => setSelectedWarehouseId(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500">
                    {warehouses.map(wh => (
                      <option key={wh.id} value={wh.id}>{wh.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Items to Order (Mock)</label>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                      <tr>
                        <th className="px-4 py-2">Product</th>
                        <th className="px-4 py-2 w-32">Quantity</th>
                        <th className="px-4 py-2 w-16"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2">
                          <select className="w-full bg-transparent outline-none">
                            <option>Vitamin C Serum</option>
                            <option>Hydrating Toner</option>
                          </select>
                        </td>
                        <td className="px-4 py-2">
                          <input type="number" defaultValue={100} className="w-full border border-slate-200 rounded px-2 py-1 text-center" />
                        </td>
                        <td className="px-4 py-2 text-center text-red-400 hover:text-red-500 cursor-pointer">×</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="bg-slate-50 p-2 text-center border-t border-slate-200 text-rose-600 font-semibold cursor-pointer hover:bg-slate-100 text-sm">
                    + Add Item
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex gap-3 border-t border-slate-100">
                <button 
                  onClick={() => setShowPOModal(false)}
                  className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreatePO}
                  className="flex-1 bg-rose-600 text-white py-3 rounded-xl font-semibold hover:bg-rose-700 transition-colors shadow-sm shadow-rose-200"
                >
                  Draft Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
