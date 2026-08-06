import { useQuery } from '@tanstack/react-query';
import { marketingApi } from '../../core/api/marketing';
import { Megaphone, TrendingUp, Users, DollarSign, Activity, Loader2 } from 'lucide-react';

export const MarketingDashboardScreen = () => {
  const { data: dashboard, isLoading } = useQuery({
    queryKey: ['marketing', 'dashboard'],
    queryFn: () => marketingApi.getDashboard()
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF7F50] mr-3" />
        Loading Marketing Dashboard...
      </div>
    );
  }

  const metrics = dashboard?.metrics || [];
  const topCampaigns = dashboard?.topCampaigns || [];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Megaphone': return Megaphone;
      case 'Users': return Users;
      case 'TrendingUp': return TrendingUp;
      case 'DollarSign': return DollarSign;
      default: return Activity;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Activity className="h-6 w-6 text-[#FF7F50]" />
            Marketing Dashboard
          </h1>
          <p className="text-slate-500 mt-1">Overview of campaign performance and marketing ROI.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m: any, i: number) => {
          const Icon = getIcon(m.icon);
          return (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center">
              <div className={`h-12 w-12 rounded-xl ${m.bg} ${m.color} flex items-center justify-center mr-4`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{m.label}</p>
                <h3 className="text-2xl font-bold text-slate-900">{m.value}</h3>
                <p className={`text-xs font-medium mt-1 ${m.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {m.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 min-h-[400px]">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Campaign Performance</h3>
          <div className="flex items-center justify-center h-[300px] border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
            <p className="text-slate-400 font-medium">Visualization data placeholder</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 min-h-[400px]">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Top Performing Campaigns</h3>
          <div className="space-y-4">
            {topCampaigns.map((c: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-700">{c.name}</span>
                <span className="text-xs font-bold text-emerald-600">+{c.performance}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
