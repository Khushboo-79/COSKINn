import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Search, FileText, Download, Mail, Eye, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const statusColors: Record<string, string> = {
  GENERATED: 'bg-emerald-100 text-emerald-700',
  PENDING: 'bg-amber-100 text-amber-700',
  SENT: 'bg-blue-100 text-blue-700',
};

export default function InvoicesScreen() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['adminOrders'],
    queryFn: async () => {
      const res = await api.get('/admin/orders');
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-rose-500">Failed to load invoices.</div>;
  }

  // Generate invoices from orders
  const invoices = orders.map((order: any) => ({
    id: `INV-${order.id.substring(0, 8).toUpperCase()}`,
    orderId: order.id,
    customer: order.user?.email || 'Guest',
    amount: `₹${order.finalAmount}`,
    status: order.status === 'PLACED' ? 'PENDING' : 'GENERATED',
    date: new Date(order.createdAt).toLocaleDateString(),
    type: 'B2C'
  }));

  const filteredInvoices = invoices.filter((invoice: any) => 
    invoice.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (invoiceId: string) => {
    toast.success(`Downloading ${invoiceId}...`);
  };

  const handleSendEmail = (customer: string) => {
    toast.success(`Invoice sent to ${customer}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: '"Expletus Sans", sans-serif' }}>
            Invoices & Billing
          </h2>
          <p className="text-sm text-slate-500 mt-1">Manage B2C invoices and B2B billing documentation</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Invoice ID, Order ID, or Customer..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Invoice Details</th>
                <th className="px-6 py-4">Order & Customer</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((invoice: any) => (
                <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-xs font-mono">{invoice.id}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{invoice.date}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-indigo-600 hover:underline cursor-pointer text-xs">{invoice.orderId.split('-')[0]}...</div>
                    <div className="text-xs text-slate-600 mt-0.5">{invoice.customer}</div>
                    <div className="mt-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">{invoice.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800">{invoice.amount}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${statusColors[invoice.status] || 'bg-slate-100 text-slate-700'}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View PDF">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDownload(invoice.id)}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleSendEmail(invoice.customer)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Email to Customer"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
