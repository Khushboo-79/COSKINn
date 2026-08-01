import { useQuery } from '@tanstack/react-query';
import { supportApi } from '../../core/api/support';
import { AlertCircle, Clock, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SupportDashboardScreen = () => {
  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ['admin', 'tickets', 'stats', 'sla'],
    queryFn: () => supportApi.getSlaStats()
  });

  const { data: tickets, isLoading: loadingTickets } = useQuery({
    queryKey: ['admin', 'tickets'],
    queryFn: () => supportApi.getTickets()
  });

  const urgentTickets = tickets?.filter((t: any) => t.slaBreached || t.status === 'ESCALATED') || [];

  if (loadingStats || loadingTickets) {
    return <div className="p-12 text-center text-slate-500">Loading dashboard...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">SLA Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Real-time overview of support operations and critical bottlenecks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Clock className="h-6 w-6" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{stats?.open || 0}</div>
          <div className="text-sm font-medium text-slate-500">Active Open Tickets</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <ShieldAlert className="h-6 w-6" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{stats?.escalated || 0}</div>
          <div className="text-sm font-medium text-slate-500">Escalated to Managers</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -z-10"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
              <AlertCircle className="h-6 w-6" />
            </div>
          </div>
          <div className="text-3xl font-bold text-rose-700 mb-1">{stats?.breached || 0}</div>
          <div className="text-sm font-bold text-rose-600">SLA Breaches</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 className="h-6 w-6" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{stats?.closed || 0}</div>
          <div className="text-sm font-medium text-slate-500">Resolved Today</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Attention Required</h2>
          <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full">
            {urgentTickets.length} Urgent Tickets
          </span>
        </div>
        
        {urgentTickets.length === 0 ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <CheckCircle2 className="h-12 w-12 text-emerald-400 mb-4" />
            <p className="font-medium">No urgent tickets right now.</p>
            <p className="text-sm mt-1 text-slate-400">The queue is healthy.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-white">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ticket</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Created</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">SLA Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {urgentTickets.map((ticket: any) => (
                <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-900 mb-1 line-clamp-1">{ticket.subject}</div>
                    <div className="text-xs font-mono text-slate-500">#{ticket.id.slice(0,8).toUpperCase()}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${ticket.status === 'ESCALATED' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    {ticket.slaBreached ? (
                      <div className="flex items-center text-rose-600 text-sm font-medium">
                        <AlertCircle className="h-4 w-4 mr-1.5" /> Breached
                      </div>
                    ) : (
                      <span className="text-slate-500 text-sm">Warning</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link 
                      to={`/support/tickets/${ticket.id}`}
                      className="inline-flex items-center text-sm font-medium text-slate-900 hover:text-blue-600"
                    >
                      Resolve <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
