import { toast } from 'sonner';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../../core/api/orders';
import { Search, Loader2, Truck, CheckSquare, FileOutput } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HandoverScreen = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [isShipping, setIsShipping] = useState(false);

  // We fetch packed orders to hand them over to the courier
  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin', 'orders', { status: 'PACKED' }],
    queryFn: () => orderApi.getAdminOrders({ status: 'PACKED' }),
  });

  const { data: shipments } = useQuery({
    queryKey: ['admin', 'shipments'],
    queryFn: () => orderApi.getAllShipments(),
  });

  const handleShipOrders = async () => {
    if (!window.confirm(`Mark ${selectedOrderIds.length} orders as SHIPPED? This will notify customers.`)) return;

    setIsShipping(true);
    let successCount = 0;
    
    for (const id of selectedOrderIds) {
      try {
        await orderApi.updateOrderStatus(id, 'SHIPPED', 'Handed over to courier');
        successCount++;
      } catch (err) {
        console.error(`Failed to ship ${id}`, err);
      }
    }
    
    setIsShipping(false);
    queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
    setSelectedOrderIds([]);
    toast.success();
  };

  const toggleSelection = (id: string) => {
    setSelectedOrderIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (!orders) return;
    if (selectedOrderIds.length === orders.length) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(orders.map((o: any) => o.id));
    }
  };

  const filteredOrders = orders?.filter((o: any) => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Courier Handover</h1>
          <p className="text-slate-500 text-sm mt-1">Manifest and dispatch packed orders to the courier partner.</p>
        </div>
      </div>

      {selectedOrderIds.length > 0 && (
        <div className="bg-primary-50 border border-primary-100 p-4 rounded-2xl flex items-center justify-between animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center text-primary-900 font-medium">
            <CheckSquare className="h-5 w-5 mr-3 text-primary-600" />
            {selectedOrderIds.length} Order(s) Selected for Handover
          </div>
          <div className="flex gap-2">
            <button 
              className="px-4 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center"
            >
              <FileOutput className="h-4 w-4 mr-2" />
              Print Manifest
            </button>
            <button 
              onClick={handleShipOrders}
              disabled={isShipping}
              className="px-4 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm flex items-center disabled:opacity-50"
            >
              {isShipping ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Truck className="h-4 w-4 mr-2" />}
              Dispatch & Mark Shipped
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search Packed Orders..."
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
                <th className="px-6 py-4 text-left">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-600 cursor-pointer"
                    onChange={toggleSelectAll}
                    checked={orders && orders.length > 0 && selectedOrderIds.length === orders.length}
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">AWB / Shipment</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Boxes / Weight</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></td></tr>
              ) : !filteredOrders || filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-500 bg-slate-50">
                    <Truck className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <p className="text-lg font-medium text-slate-700">No packed orders pending handover.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order: any) => {
                  const isSelected = selectedOrderIds.includes(order.id);
                  const shipment = shipments?.find((s:any) => s.orderId === order.id);
                  
                  return (
                    <tr key={order.id} className={`hover:bg-slate-50 transition-colors ${isSelected ? 'bg-primary-50/50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-600 cursor-pointer"
                          checked={isSelected}
                          onChange={() => toggleSelection(order.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-slate-900 font-mono">#{order.id.slice(-8).toUpperCase()}</div>
                        <div className="text-xs text-slate-500 mt-1">{new Date(order.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{order.user?.name || 'Guest'}</div>
                        <div className="text-xs text-slate-500 mt-1">{order.shippingAddress?.pincode}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {shipment ? (
                          <div>
                            <span className="text-sm font-mono font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{shipment.awbNumber}</span>
                          </div>
                        ) : (
                          <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1 rounded-full">Missing AWB</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-slate-900">1 Box</div>
                        <div className="text-xs text-slate-500 mt-1">0.5 kg</div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
