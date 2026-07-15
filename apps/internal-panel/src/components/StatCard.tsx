import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: string;        // e.g. "+12.5%"
  trendUp?: boolean;
  prefix?: string;       // e.g. "₹" 
  subtitle?: string;
}

export default function StatCard({ label, value, icon: Icon, trend, trendUp, prefix = '', subtitle }: StatCardProps) {
  return (
    <div className="group p-5 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        {Icon && (
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF0069]/10 to-[#FFD498]/10 flex items-center justify-center group-hover:from-[#FF0069]/20 group-hover:to-[#FFD498]/20 transition-colors">
            <Icon className="w-4 h-4 text-[#FF0069]" />
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">
        {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}
      </p>
      {trend && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
          <span>{trendUp ? '↑' : '↓'}</span>
          <span>{trend} from last month</span>
        </div>
      )}
      {subtitle && !trend && (
        <p className="mt-2 text-xs font-semibold text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}
