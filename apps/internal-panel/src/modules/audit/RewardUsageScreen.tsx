import { useQuery } from '@tanstack/react-query';
import { auditApi } from '../../core/api/audit';
import { Loader2, Gift, Ticket, Coins, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

export const RewardUsageScreen = () => {
  const { data: usageLog, isLoading } = useQuery({
    queryKey: ['audit', 'reward-usage'],
    queryFn: () => auditApi.getRewardUsageLog()
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-fuchsia-400" />
        <p>Loading reward and coupon ledgers...</p>
      </div>
    );
  }

  // Calculate some basic stats
  const coupons = usageLog?.filter((l: any) => l.type === 'COUPON_REDEMPTION') || [];
  const pointsEarned = usageLog?.filter((l: any) => l.type === 'POINTS_EARNED') || [];
  const pointsRedeemed = usageLog?.filter((l: any) => l.type === 'POINTS_REDEEMED') || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center">
            <Gift className="h-6 w-6 mr-3 text-fuchsia-600" />
            Reward & Coupon Usage Log
          </h2>
          <p className="text-sm text-slate-500 mt-1">Audit trail for all loyalty points and promotional coupon redemptions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center text-indigo-600 mb-2">
            <Ticket className="h-5 w-5 mr-1" />
            <h3 className="font-semibold text-sm">Coupon Redemptions</h3>
          </div>
          <p className="text-3xl font-black text-indigo-700">{coupons.length}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center text-emerald-600 mb-2">
            <TrendingUp className="h-5 w-5 mr-1" />
            <h3 className="font-semibold text-sm">Reward Points Earned</h3>
          </div>
          <p className="text-3xl font-black text-emerald-700">
            {pointsEarned.reduce((sum: number, p: any) => sum + (p.points || 0), 0)}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center text-rose-600 mb-2">
            <Coins className="h-5 w-5 mr-1" />
            <h3 className="font-semibold text-sm">Reward Points Redeemed</h3>
          </div>
          <p className="text-3xl font-black text-rose-700">
            {pointsRedeemed.reduce((sum: number, p: any) => sum + (p.points || 0), 0)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {!usageLog || usageLog.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No reward usage recorded.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-600">Event ID</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">User ID</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">Event Type</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">Value</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">Reference</th>
                  <th className="px-6 py-4 font-semibold text-slate-600">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usageLog.map((log: any) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{log.id}</td>
                    <td className="px-6 py-4 font-mono text-xs font-bold text-slate-700">{log.userId}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                        log.type === 'COUPON_REDEMPTION' ? 'bg-indigo-100 text-indigo-700' :
                        log.type === 'POINTS_EARNED' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {log.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {log.type === 'COUPON_REDEMPTION' ? log.couponCode : `${log.points} pts`}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-600">{log.orderId || log.referenceId || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs font-mono">
                      {format(new Date(log.createdAt), 'dd MMM yyyy, HH:mm')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
