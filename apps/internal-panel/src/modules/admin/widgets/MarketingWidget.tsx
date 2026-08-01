import { useQuery } from '@tanstack/react-query';
import { marketingApi } from '../../../core/api/marketing';
import { Megaphone, Ticket, Loader2 } from 'lucide-react';

export const MarketingWidget = () => {
  const { data: campaigns, isLoading: campaignsLoading } = useQuery({
    queryKey: ['admin', 'marketing-campaigns'],
    queryFn: () => marketingApi.getCampaigns()
  });

  const { data: coupons, isLoading: couponsLoading } = useQuery({
    queryKey: ['admin', 'marketing-coupons'],
    queryFn: () => marketingApi.getCoupons()
  });

  if (campaignsLoading || couponsLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-slate-300 mb-2" />
        <span className="text-slate-500 text-sm">Loading marketing data...</span>
      </div>
    );
  }

  const activeCampaigns = campaigns?.filter((c: any) => c.status === 'SCHEDULED' || c.status === 'SENT') || [];
  const activeCoupons = coupons?.filter((c: any) => c.isActive) || [];
  const totalCouponUsage = activeCoupons.reduce((sum: number, c: any) => sum + (c.usedCount || 0), 0);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-bold text-slate-900 flex items-center">
            <Megaphone className="h-5 w-5 mr-2 text-fuchsia-600" />
            Marketing & CRM
          </h3>
          <p className="text-xs text-slate-500 mt-1">Campaign performance and coupon usage</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-1">Active Campaigns</p>
          <div className="flex items-end">
            <span className="text-2xl font-black text-slate-900">{activeCampaigns.length}</span>
          </div>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-1">Active Coupons</p>
          <div className="flex items-end">
            <span className="text-2xl font-black text-slate-900">{activeCoupons.length}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center">
          <Ticket className="h-3.5 w-3.5 mr-1.5 text-indigo-500" /> Coupon Performance
        </h4>
        <div className="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
          <div>
            <p className="text-sm font-bold text-slate-900">Total Redemptions</p>
            <p className="text-xs text-indigo-700 mt-0.5">Across all active coupons</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-black text-indigo-600">{totalCouponUsage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
