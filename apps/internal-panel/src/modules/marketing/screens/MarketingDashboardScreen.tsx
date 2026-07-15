import { Megaphone } from 'lucide-react';

export default function MarketingDashboardScreen() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: '"Expletus Sans", sans-serif' }}>
            Marketing Dashboard
          </h2>
          <p className="text-sm text-slate-500">Overview of marketing campaigns and performance.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
        <div className="text-center">
          <Megaphone className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-400 mb-2">Coming Soon</h3>
          <p className="text-slate-500 max-w-md mx-auto">This dashboard is currently under development. Please check back later for updates.</p>
        </div>
      </div>
    </div>
  );
}
