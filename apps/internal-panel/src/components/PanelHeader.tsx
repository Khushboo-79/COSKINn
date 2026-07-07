import type { LucideIcon } from 'lucide-react';

interface PanelHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: LucideIcon;
}

export default function PanelHeader({ title, subtitle, icon: Icon, actionLabel, onAction, actionIcon: ActionIcon }: PanelHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF0069] to-[#FFD498] flex items-center justify-center shadow-lg shadow-[#FF0069]/20">
            <Icon className="w-5 h-5 text-white" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF0069] to-[#FFD498] text-white font-semibold text-sm shadow-lg shadow-[#FF0069]/25 hover:shadow-[#FF0069]/40 hover:-translate-y-0.5 transition-all duration-300"
        >
          {ActionIcon && <ActionIcon className="w-4 h-4" />}
          {actionLabel}
        </button>
      )}
    </div>
  );
}
