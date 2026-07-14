import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { ShoppingCart, CheckCircle, MailWarning } from 'lucide-react';

export default function AbandonedCarts() {
  const { data: carts, isLoading } = useQuery({
    queryKey: ['abandoned-carts'],
    queryFn: async () => {
      const res = await api.get('/marketing/abandoned-carts');
      return res.data;
    }
  });

  const totalCarts = carts?.length || 0;
  const recoveredCarts = carts?.filter((c: any) => c.recovered)?.length || 0;
  const recoveryRate = totalCarts > 0 ? Math.round((recoveredCarts / totalCarts) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Abandoned Carts</h2>
          <p className="text-sm text-gray-500">Track and recover carts left behind by customers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 rounded-full text-red-600">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Total Abandoned</div>
            <div className="text-2xl font-bold text-gray-900">{totalCarts}</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-full text-green-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Successfully Recovered</div>
            <div className="text-2xl font-bold text-gray-900">{recoveredCarts}</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-full text-blue-600">
            <MailWarning className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Recovery Rate</div>
            <div className="text-2xl font-bold text-gray-900">{recoveryRate}%</div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-gray-500">Loading data...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Cart ID</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Email Sent</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Abandoned Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {carts?.map((cart: any) => (
                <tr key={cart.id} className="hover:bg-gray-50/50">
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{cart.user?.firstName || ''} {cart.user?.lastName || ''}</div>
                    <div className="text-xs text-gray-500">{cart.user?.email || 'No email'}</div>
                  </td>
                  <td className="p-4 text-sm font-mono text-gray-600">
                    {cart.cartId.split('-')[0]}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${cart.recovered ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {cart.recovered ? 'Recovered' : 'Lost'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {cart.emailSentAt ? new Date(cart.emailSentAt).toLocaleString() : 'Pending'}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(cart.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {(!carts || carts.length === 0) && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No abandoned carts logged yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
