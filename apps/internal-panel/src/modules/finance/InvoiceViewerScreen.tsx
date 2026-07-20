import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { orderApi } from '../../core/api/orders';
import { FileText, Search, Download, FileJson } from 'lucide-react';

export const InvoiceViewerScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin', 'orders'],
    queryFn: () => orderApi.getOrders()
  });

  // Only show invoices for DELIVERED orders (which means they are finalized)
  const invoicedOrders = orders?.filter((o: any) => o.status === 'DELIVERED') || [];
  
  const filteredInvoices = invoicedOrders.filter((o: any) => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (o.userId && o.userId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tax Invoices</h1>
          <p className="text-slate-500 text-sm mt-1">View B2C/B2B GST invoices generated from delivered orders.</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-slate-800 transition-colors">
          <Download className="h-4 w-4 mr-2" /> Bulk Export
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center bg-slate-50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-slate-500">Loading invoices...</div>
        ) : filteredInvoices.length === 0 ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <FileText className="h-12 w-12 text-slate-300 mb-4" />
            <p className="font-medium">No invoices found.</p>
            <p className="text-sm mt-1 text-slate-400">Invoices are generated only for DELIVERED orders.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-200 bg-white">
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Invoice # / Order ID</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Subtotal</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">GST</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Total</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInvoices.map((order: any) => {
                  // Simulate an 18% GST calculation (in reality, backend calculates this based on SKU tax rates)
                  const subtotal = order.totalAmount / 1.18;
                  const gstAmount = order.totalAmount - subtotal;

                  return (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-mono font-medium text-slate-900 mb-1">
                          INV-{order.id.slice(0,8).toUpperCase()}
                        </div>
                        <div className="text-xs text-slate-500">Ord: {order.id.slice(0,8).toUpperCase()}</div>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">
                        {new Date(order.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600 text-right">
                        {formatCurrency(subtotal)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="text-sm font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded">
                          {formatCurrency(gstAmount)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm font-bold text-slate-900 text-right">
                        {formatCurrency(order.totalAmount)}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button className="text-slate-400 hover:text-blue-600 transition-colors" title="Download JSON/PDF">
                          <FileJson className="h-5 w-5 mx-auto" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
