import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'default';

interface StatusBadgeProps {
  status: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-green-100 text-green-700 border-green-200',
  warning: 'bg-amber-100 text-amber-700 border-amber-200',
  danger: 'bg-red-100 text-red-700 border-red-200',
  info: 'bg-blue-100 text-blue-700 border-blue-200',
  default: 'bg-slate-100 text-slate-700 border-slate-200',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  variant = 'default',
  className = ''
}) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}>
      {status}
    </span>
  );
};
