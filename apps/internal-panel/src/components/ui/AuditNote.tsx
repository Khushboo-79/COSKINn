import React from 'react';
import { History } from 'lucide-react';

interface AuditNoteProps {
  user: string;
  action: string;
  timestamp: string | Date;
  details?: string;
  className?: string;
}

export const AuditNote: React.FC<AuditNoteProps> = ({ user, action, timestamp, details, className = '' }) => {
  const formattedTime = typeof timestamp === 'string' ? timestamp : timestamp.toLocaleString();

  return (
    <div className={`flex gap-3 p-3 bg-slate-50 border border-slate-100 rounded-lg text-sm ${className}`}>
      <div className="flex-shrink-0 mt-0.5">
        <History className="h-4 w-4 text-slate-400" />
      </div>
      <div>
        <div className="text-slate-700">
          <span className="font-semibold">{user}</span> {action}
        </div>
        <div className="text-slate-500 text-xs mt-0.5">{formattedTime}</div>
        {details && (
          <div className="mt-1.5 p-2 bg-white border border-slate-200 rounded text-slate-600 font-mono text-xs">
            {details}
          </div>
        )}
      </div>
    </div>
  );
};
