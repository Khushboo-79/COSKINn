import { useQuery } from '@tanstack/react-query';
import { supportApi } from '../../../core/api/support';
import { HeadphonesIcon, AlertCircle, CheckCircle2, Loader2, Clock } from 'lucide-react';

export const SupportWidget = () => {
  const { data: tickets, isLoading } = useQuery({
    queryKey: ['admin', 'support-tickets'],
    queryFn: () => supportApi.getTickets()
  });

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-slate-300 mb-2" />
        <span className="text-slate-500 text-sm">Loading support data...</span>
      </div>
    );
  }

  const openTickets = tickets?.filter((t: any) => t.status === 'OPEN' || t.status === 'IN_PROGRESS') || [];
  const highPriority = openTickets.filter((t: any) => t.priority === 'HIGH' || t.priority === 'URGENT').length;
  
  // Simulated SLA check based on creation date
  const now = new Date();
  const breachedTickets = openTickets.filter((t: any) => {
    const hoursOpen = (now.getTime() - new Date(t.createdAt).getTime()) / (1000 * 60 * 60);
    return hoursOpen > 24; // 24hr SLA
  }).length;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-bold text-slate-900 flex items-center">
            <HeadphonesIcon className="h-5 w-5 mr-2 text-sky-500" />
            Customer Support
          </h3>
          <p className="text-xs text-slate-500 mt-1">Ticket volume and SLA compliance</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-1">Open Tickets</p>
          <div className="flex items-end">
            <span className="text-2xl font-black text-slate-900">{openTickets.length}</span>
          </div>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-1">High Priority</p>
          <div className="flex items-end">
            <span className={`text-2xl font-black ${highPriority > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
              {highPriority}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center">
          <Clock className="h-3.5 w-3.5 mr-1.5 text-slate-500" /> SLA Compliance (24h)
        </h4>
        
        {breachedTickets > 0 ? (
          <div className="flex items-start p-3 bg-rose-50 border border-rose-100 rounded-lg">
            <AlertCircle className="h-5 w-5 text-rose-500 mr-2 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-rose-900">{breachedTickets} Tickets Breached SLA</p>
              <p className="text-xs text-rose-700 mt-0.5">These tickets have been open for more than 24 hours.</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2 shrink-0" />
            <div>
              <p className="text-sm font-bold text-emerald-900">100% SLA Compliance</p>
              <p className="text-xs text-emerald-700 mt-0.5">No tickets open longer than 24 hours.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
