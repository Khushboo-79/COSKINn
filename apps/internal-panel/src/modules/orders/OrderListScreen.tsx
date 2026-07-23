import { toast } from 'sonner';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../../core/api/orders';
import { Search, Filter, ShoppingBag, Eye, Calendar, CreditCard, RefreshCcw, CheckSquare, ListPlus, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const OrderListScreen = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    status: '',
    paymentMode: '',
    search: '',
  });

  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);

  const { data: orders, isLoading, refetch } = useQuery({
    queryKey: ['admin', 'orders', filters],
    queryFn: () => orderApi.getAdminOrders({
      status: filters.status || undefined,
      paymentMode: filters.paymentMode || undefined,
      email: filters.search.includes('@') ? filters.search : undefined,
      mobile: filters.search && !filters.search.includes('@') && /^\d+$/.test(filters.search) ? filters.search : undefined
    }),
  });

  const generatePickListMutation = useMutation({
    mutationFn: () => orderApi.generatePickList({ 
      orderIds: selectedOrderIds, 
      warehouseId: 'default-warehouse' 
    }),
    onSuccess: (data) => {
      toast.success();
      setSelectedOrderIds([]); // Clear selection
    },
    onError: (err: any) => {
      toast.error();
    }
  });

  // Bulk status update (using individual API calls for MVP, but a real bulk endpoint is better)
  const handleBulkStatusUpdate = async (newStatus: string) => {
    const notes = prompt(`Enter notes for marking ${selectedOrderIds.length} orders as ${newStatus}:`);
    if (!notes) return;

    setIsBulkUpdating(true);
    let successCount = 0;
    
    for (const id of selectedOrderIds) {
      try {
        await orderApi.updateOrderStatus(id, newStatus, notes);
        successCount++;
      } catch (err) {
        console.error(`Failed to update ${id}`, err);
      }
    }
    
    setIsBulkUpdating(false);
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

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'PLACED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PAYMENT_CONFIRMED': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'PROCESSING': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'PACKED': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'SHIPPED': return 'bg-violet-100 text-violet-800 border-violet-200';
      case 'OUT_FOR_DELIVERY': return 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200';
      case 'DELIVERED': return 'bg-green-100 text-green-800 border-green-200';
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
      case 'RETURN_REQUESTED': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Order Management</h1>
          <p className="text-slate-500 text-sm mt-1">Search, filter, and manage customer orders.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => refetch()}
            className="flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-xl transition-colors shadow-sm"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedOrderIds.length > 0 && (
        <div className="bg-primary-50 border border-primary-100 p-4 rounded-2xl flex items-center justify-between animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center text-primary-900 font-medium">
            <CheckSquare className="h-5 w-5 mr-3 text-primary-600" />
            {selectedOrderIds.length} Order(s) Selected
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => handleBulkStatusUpdate('PACKED')}
              disabled={isBulkUpdating}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center"
            >
              {isBulkUpdating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Mark Packed
            </button>
            <button 
              onClick={() => generatePickListMutation.mutate()}
              disabled={generatePickListMutation.isPending}
              className="px-4 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm flex items-center disabled:opacity-50"
            >
              {generatePickListMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <ListPlus className="h-4 w-4 mr-2" />
              )}
              Handoff to Warehouse (Pick List)
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search by Email or Mobile..."
            value={filters.search}
            onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-slate-400" />
          </div>
          <select
            value={filters.status}
            onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white appearance-none"
          >
            <option value="">All Statuses</option>
            <option value="PLACED">Placed</option>
            <option value="PAYMENT_CONFIRMED">Payment Confirmed</option>
            <option value="PROCESSING">Processing</option>
            <option value="PACKED">Packed</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CreditCard className="h-4 w-4 text-slate-400" />
          </div>
          <select
            value={filters.paymentMode}
            onChange={(e) => setFilters(f => ({ ...f, paymentMode: e.target.value }))}
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white appearance-none"
          >
            <option value="">All Payment Modes</option>
            <option value="ONLINE">Prepaid (ONLINE)</option>
            <option value="COD">Cash on Delivery (COD)</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Order Details</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p>Loading orders...</p>
                    </div>
                  </td>
                </tr>
              ) : !orders || orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-500 bg-slate-50">
                    <ShoppingBag className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <p className="text-lg font-medium text-slate-700">No orders found</p>
                    <p className="mt-1">Try adjusting your search filters.</p>
                  </td>
                </tr>
              ) : (
                orders.map((order: any) => {
                  const isSelected = selectedOrderIds.includes(order.id);
                  return (
                    <tr 
                      key={order.id} 
                      className={`hover:bg-slate-50 transition-colors group ${isSelected ? 'bg-primary-50/50' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-600 cursor-pointer"
                          checked={isSelected}
                          onChange={() => toggleSelection(order.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap" onClick={() => navigate(`/orders/${order.id}`)}>
                        <div className="flex items-center cursor-pointer">
                          <div>
                            <div className="text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                              #{order.id.slice(-8).toUpperCase()}
                            </div>
                            <div className="text-xs text-slate-500 mt-1 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => navigate(`/orders/${order.id}`)}>
                        <div className="text-sm font-medium text-slate-900">
                          {order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Guest'}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{order.user?.email || order.address?.email || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => navigate(`/orders/${order.id}`)}>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => navigate(`/orders/${order.id}`)}>
                        <div className="text-sm text-slate-900 flex items-center">
                          <span className={`h-2 w-2 rounded-full mr-2 ${order.paymentStatus === 'PAID' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                          {order.paymentMode}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right cursor-pointer" onClick={() => navigate(`/orders/${order.id}`)}>
                        <div className="text-sm font-bold text-slate-900">₹{order.finalTotal.toFixed(2)}</div>
                        <div className="text-xs text-slate-500 mt-1">{order.items?.length || 0} items</div>
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
