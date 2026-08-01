import { useQuery } from '@tanstack/react-query';
import { marketingApi } from '../../core/api/marketing';
import { ShoppingCart, Mail, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AbandonedCartScreen = () => {
  const { data: carts, isLoading } = useQuery({
    queryKey: ['marketing', 'abandoned-carts'],
    queryFn: () => marketingApi.getAbandonedCarts()
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Abandoned Carts</h1>
          <p className="text-slate-500 text-sm mt-1">Monitor and recover dropped checkout sessions.</p>
        </div>
        <Link 
          to="/marketing/campaigns"
          className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-slate-800 transition-colors"
        >
          <Mail className="h-4 w-4 mr-2" /> Create Recovery Campaign
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500">Loading abandoned carts...</div>
        ) : !carts || carts.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingCart className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="font-medium text-slate-900">No abandoned carts right now.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Logged</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cart ID</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Email Sent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {carts.map((log: any) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6 text-sm text-slate-500">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="py-4 px-6 text-sm font-medium text-slate-900">
                    {log.user?.firstName} {log.user?.lastName}
                    <div className="text-xs text-slate-500 font-normal">{log.user?.email}</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-500 font-mono">{log.cartId}</td>
                  <td className="py-4 px-6">
                    {log.recovered ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="h-3 w-3" /> RECOVERED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-rose-100 text-rose-800">
                        <AlertTriangle className="h-3 w-3" /> ABANDONED
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">
                    {log.emailSentAt ? new Date(log.emailSentAt).toLocaleString() : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
