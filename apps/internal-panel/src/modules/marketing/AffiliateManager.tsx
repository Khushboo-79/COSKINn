import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Users, Gift, CheckCircle, Clock } from 'lucide-react';

export default function AffiliateManager() {
  const queryClient = useQueryClient();

  const { data: referrals, isLoading } = useQuery({
    queryKey: ['referrals'],
    queryFn: async () => {
      const res = await api.get('/referral/admin/all');
      return res.data;
    }
  });

  const awardMutation = useMutation({
    mutationFn: (id: string) => api.post(`/referral/admin/${id}/award`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
      alert('Bonus awarded successfully to the wallet!');
    },
    onError: () => {
      alert('Failed to award bonus.');
    }
  });

  const totalReferrals = referrals?.length || 0;
  const convertedCount = referrals?.filter((r: any) => r.status === 'CONVERTED').length || 0;
  const bonusesAwarded = referrals?.filter((r: any) => r.bonusAwarded).length || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Influencer & Affiliates</h2>
          <p className="text-sm text-gray-500">Track promo codes, signups, and commission payouts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-full text-blue-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Total Codes Shared</div>
            <div className="text-2xl font-bold text-gray-900">{totalReferrals}</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-full text-green-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Converted Signups</div>
            <div className="text-2xl font-bold text-gray-900">{convertedCount}</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 rounded-full text-purple-600">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Commissions Paid</div>
            <div className="text-2xl font-bold text-gray-900">{bonusesAwarded}</div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-gray-500">Loading affiliate data...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Promo Code</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Referrer (Influencer)</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Referee (Customer)</th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="p-4 text-right text-xs font-semibold text-gray-500 uppercase">Commission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {referrals?.map((ref: any) => (
                <tr key={ref.id} className="hover:bg-gray-50/50">
                  <td className="p-4">
                    <span className="font-mono font-bold bg-gray-100 px-2 py-1 rounded text-gray-800">
                      {ref.referralCode}
                    </span>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(ref.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{ref.referrer?.firstName} {ref.referrer?.lastName}</div>
                    <div className="text-xs text-gray-500">{ref.referrer?.email}</div>
                  </td>
                  <td className="p-4">
                    {ref.referee ? (
                      <>
                        <div className="font-medium text-gray-900">{ref.referee.firstName} {ref.referee.lastName}</div>
                        <div className="text-xs text-gray-500">{ref.referee.email}</div>
                      </>
                    ) : (
                      <span className="text-gray-400 text-sm italic">Waiting for signup...</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1 w-max ${
                      ref.status === 'CONVERTED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {ref.status === 'CONVERTED' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {ref.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {ref.bonusAwarded ? (
                      <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                        Paid Out
                      </span>
                    ) : ref.status === 'CONVERTED' ? (
                      <button 
                        onClick={() => {
                          if(confirm('Award ₹100 to both users wallets?')) {
                            awardMutation.mutate(ref.id);
                          }
                        }}
                        disabled={awardMutation.isPending}
                        className="text-sm font-medium bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                      >
                        {awardMutation.isPending && awardMutation.variables === ref.id ? 'Processing...' : 'Award Bonus'}
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400">Not Eligible</span>
                    )}
                  </td>
                </tr>
              ))}
              {(!referrals || referrals.length === 0) && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No promo codes or referrals generated yet.
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
