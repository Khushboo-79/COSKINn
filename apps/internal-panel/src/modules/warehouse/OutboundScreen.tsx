import { toast } from 'sonner';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../../core/api/orders';
import { warehouseApi } from '../../core/api/warehouse';
import { Package, Search, Loader2, CheckCircle2, ScanBarcode, ArrowRight } from 'lucide-react';

export const OutboundScreen = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [packingOrder, setPackingOrder] = useState<any>(null);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [scannedItems, setScannedItems] = useState<Record<string, number>>({});

  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin', 'orders', { status: 'PROCESSING' }],
    queryFn: () => orderApi.getAdminOrders({ status: 'PROCESSING' }),
  });

  const scanMutation = useMutation({
    mutationFn: (barcode: string) => warehouseApi.verifyBarcodeScan({
      orderId: packingOrder.id,
      barcode
    }),
    onSuccess: (data, barcode) => {
      if (data.success) {
        setScannedItems(prev => ({
          ...prev,
          [barcode]: (prev[barcode] || 0) + 1
        }));
        setBarcodeInput('');
      } else {
        toast(data.message);
      }
    },
    onError: (err: any) => {
      toast.error();
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: () => orderApi.updateOrderStatus(packingOrder.id, 'PACKED', 'Packed verified via scanner'),
    onSuccess: () => {
      toast.success();
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      setPackingOrder(null);
      setScannedItems({});
    },
    onError: (err: any) => {
      toast.error();
    }
  });

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;
    scanMutation.mutate(barcodeInput.trim());
  };

  const startPacking = (order: any) => {
    setPackingOrder(order);
    setScannedItems({});
    setBarcodeInput('');
  };

  const isFullyPacked = packingOrder?.items?.every(
    (item: any) => (scannedItems[item.variant?.sku || item.sku] || 0) >= item.quantity
  );

  const filteredOrders = orders?.filter((o: any) => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Outbound Queue (Pack)</h1>
          <p className="text-slate-500 text-sm mt-1">Pick and pack orders that are currently PROCESSING.</p>
        </div>
      </div>

      {!packingOrder ? (
        <>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search by Order ID..."
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
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {isLoading ? (
                    <tr><td colSpan={3} className="px-6 py-12 text-center text-slate-500"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></td></tr>
                  ) : !filteredOrders || filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-16 text-center text-slate-500 bg-slate-50">
                        <Package className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                        <p className="text-lg font-medium text-slate-700">No orders pending packing.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order: any) => (
                      <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-slate-900 font-mono">#{order.id.slice(-8).toUpperCase()}</div>
                          <div className="text-xs text-slate-500 mt-1">{new Date(order.createdAt).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">{order.items.length} SKUs ({order.items.reduce((s:number, i:any)=>s+i.quantity, 0)} units)</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => startPacking(order)}
                            className="px-4 py-2 bg-primary-50 text-primary-700 hover:bg-primary-100 font-medium rounded-xl transition-colors shadow-sm inline-flex items-center"
                          >
                            Pack Order <ArrowRight className="h-4 w-4 ml-2" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-900 text-lg">Packing Order #{packingOrder.id.slice(-8).toUpperCase()}</h2>
                  <p className="text-sm text-slate-500 mt-1">Scan each item's barcode to verify.</p>
                </div>
                <button 
                  onClick={() => setPackingOrder(null)}
                  className="text-slate-500 hover:text-slate-700 font-medium text-sm"
                >
                  Cancel Packing
                </button>
              </div>
              <div className="p-6">
                <form onSubmit={handleScanSubmit} className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ScanBarcode className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      autoFocus
                      type="text"
                      placeholder="Scan SKU barcode here..."
                      value={barcodeInput}
                      onChange={(e) => setBarcodeInput(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none font-mono text-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!barcodeInput.trim() || scanMutation.isPending}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 disabled:opacity-50"
                  >
                    Enter
                  </button>
                </form>

                <div className="space-y-3">
                  {packingOrder.items.map((item: any) => {
                    const itemSku = item.variant?.sku || item.sku;
                    const itemName = item.variant?.product?.name || item.productName || 'Unknown Product';
                    const scanned = scannedItems[itemSku] || 0;
                    const complete = scanned >= item.quantity;
                    return (
                      <div key={item.id} className={`p-4 rounded-xl border flex items-center justify-between ${complete ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex items-center gap-4">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${complete ? 'bg-green-100 text-green-600' : 'bg-white text-slate-400 border border-slate-200'}`}>
                            {complete ? <CheckCircle2 className="h-6 w-6" /> : <Package className="h-5 w-5" />}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{itemName}</p>
                            <p className="text-sm font-mono text-slate-500">{itemSku}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${complete ? 'text-green-700' : 'text-slate-900'}`}>
                            {scanned} / {item.quantity}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Packing Summary</h3>
              <p className="text-slate-400 text-sm mb-6">Verify all items before sealing the box.</p>
              
              <div className="flex justify-between items-center mb-6 py-4 border-y border-slate-700">
                <span className="text-slate-300">Total Units</span>
                <span className="text-2xl font-bold">{packingOrder.items.reduce((s:number, i:any)=>s+i.quantity, 0)}</span>
              </div>

              <button
                onClick={() => updateStatusMutation.mutate()}
                disabled={!isFullyPacked || updateStatusMutation.isPending}
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:bg-slate-700 flex items-center justify-center"
              >
                {updateStatusMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Mark as Packed'}
              </button>
              
              {!isFullyPacked && (
                <p className="text-xs text-center text-slate-400 mt-3">Scan all items to enable packing.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
