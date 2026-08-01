import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  type: 'line' | 'bar' | 'donut';
  className?: string;
  children?: React.ReactNode; // This will hold the actual recharts/chart.js component later
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, type, className = '', children }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-slate-900 font-semibold">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
        <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      
      {/* Chart container */}
      <div className="h-64 w-full flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100 border-dashed">
        {children || (
          <div className="text-center">
            <div className="text-slate-400 mb-2 font-medium">Chart visualization ({type})</div>
            <p className="text-xs text-slate-400">Install recharts to render this chart</p>
          </div>
        )}
      </div>
    </div>
  );
};
