import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export type ApprovalStatus = 'draft' | 'pending' | 'approved' | 'rejected';

interface ApprovalGateProps {
  status: ApprovalStatus;
  title: string;
  description: string;
  onApprove?: () => void;
  onReject?: () => void;
  onAction?: () => void; // for submit for approval
  actionLabel?: string;
  hasPermissionToApprove?: boolean;
}

export const ApprovalGate: React.FC<ApprovalGateProps> = ({
  status,
  title,
  description,
  onApprove,
  onReject,
  onAction,
  actionLabel,
  hasPermissionToApprove = false,
}) => {
  const config = {
    draft: {
      color: 'bg-slate-50 border-slate-200 text-slate-800',
      icon: <Clock className="h-5 w-5 text-slate-400" />,
      tag: 'bg-slate-200 text-slate-700',
    },
    pending: {
      color: 'bg-amber-50 border-amber-200 text-amber-800',
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      tag: 'bg-amber-200 text-amber-800',
    },
    approved: {
      color: 'bg-green-50 border-green-200 text-green-800',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      tag: 'bg-green-200 text-green-800',
    },
    rejected: {
      color: 'bg-red-50 border-red-200 text-red-800',
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      tag: 'bg-red-200 text-red-800',
    },
  }[status];

  return (
    <div className={`p-4 border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${config.color}`}>
      <div className="flex items-start sm:items-center gap-3">
        {config.icon}
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{title}</h4>
            <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${config.tag}`}>
              {status}
            </span>
          </div>
          <p className="text-sm opacity-90 mt-0.5">{description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {status === 'draft' && onAction && (
          <button 
            onClick={onAction}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm"
          >
            {actionLabel || 'Submit for Approval'}
          </button>
        )}
        
        {status === 'pending' && hasPermissionToApprove && (
          <>
            {onReject && (
              <button 
                onClick={onReject}
                className="px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-50 shadow-sm"
              >
                Reject
              </button>
            )}
            {onApprove && (
              <button 
                onClick={onApprove}
                className="px-4 py-2 bg-green-600 text-white border border-transparent rounded-lg text-sm font-medium hover:bg-green-700 shadow-sm"
              >
                Approve
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
