import { Megaphone, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

export const MarketingDashboardScreen = () => {
  const metrics = [
    { label: 'Active Campaigns', value: '12', change: '+2 this week', icon: Megaphone, color: 'text-[#FF3E7F]', bg: 'bg-[#FF3E7F]/10' },
    { label: 'Total Reach', value: '1.2M', change: '+15%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'ROI (30 Days)', value: '324%', change: '+12%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Ad Spend', value: '$45,230', change: '-5%', icon: DollarSign, color: 'text-rose-600', bg: 'bg-rose-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Activity className="h-6 w-6 text-indigo-500" />
            Marketing Dashboard
          </h1>
          <p className="text-slate-500 mt-1">Overview of campaign performance and marketing ROI.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center">
            <div className={`h-12 w-12 rounded-xl ${m.bg} ${m.color} flex items-center justify-center mr-4`}>
              <m.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{m.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{m.value}</h3>
              <p className={`text-xs font-medium mt-1 ${m.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                {m.change}
              </p>
            </div>
          </div>
        ))}
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
            {['Summer Sale', 'New Product Launch', 'Retargeting Flow A', 'Welcome Series Emails'].map((c, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-700">{c}</span>
                <span className="text-xs font-bold text-emerald-600">+{Math.floor(Math.random() * 40) + 10}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
