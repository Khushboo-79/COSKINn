import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  description,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 transition-all hover:shadow-md ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      
      <div className="flex items-end space-x-3">
        <span className="text-3xl font-bold text-slate-900">{value}</span>
        
        {trend && (
          <div className={`flex items-center text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <span className="mr-1">
              {trend.isPositive ? '↑' : '↓'}
            </span>
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>

      {description && (
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      )}
    </div>
  );
};
