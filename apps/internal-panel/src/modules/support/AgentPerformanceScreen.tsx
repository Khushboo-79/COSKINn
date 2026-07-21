import { useQuery } from '@tanstack/react-query';
import { supportApi } from '../../core/api/support';
import { useAuth } from '../../core/rbac/AuthContext';
import { CheckCircle2, Inbox, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AgentPerformanceScreen = () => {
  const { user } = useAuth();
  
  const { data: tickets, isLoading } = useQuery({
    queryKey: ['admin', 'tickets'],
    queryFn: () => supportApi.getTickets()
  });

  const myTickets = tickets?.filter((t: any) => t.assignedToId === user?.id) || [];
  const myOpenTickets = myTickets.filter((t: any) => t.status !== 'CLOSED');
  const myResolvedTickets = myTickets.filter((t: any) => t.status === 'CLOSED');

  if (isLoading) return <div className="p-12 text-center text-slate-500">Loading performance data...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Performance</h1>
        <p className="text-slate-500 text-sm mt-1">Track your assigned queue and resolution metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-slate-900 flex items-center justify-center text-white text-xl font-bold">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900">{user?.email}</div>
            <div className="text-sm text-slate-500">Support Agent</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-sm font-medium text-slate-500 mb-1">Open Assigned Tickets</div>
          <div className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            {myOpenTickets.length}
            {myOpenTickets.length > 5 && <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">High Volume</span>}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-sm font-medium text-slate-500 mb-1">Total Resolved</div>
          <div className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            {myResolvedTickets.length}
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-8">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900">My Queue</h2>
        </div>
        
        {myOpenTickets.length === 0 ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <Inbox className="h-12 w-12 text-slate-300 mb-4" />
            <p className="font-medium">Your queue is empty!</p>
            <p className="text-sm mt-1">Check the main ticket list to pick up new issues.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {myOpenTickets.map((ticket: any) => (
              <div key={ticket.id} className="p-4 hover:bg-slate-50 flex items-center justify-between transition-colors">
                <div>
                  <Link to={`/support/tickets/${ticket.id}`} className="font-medium text-slate-900 hover:text-blue-600 mb-1 block">
                    {ticket.subject}
                  </Link>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="font-mono">#{ticket.id.slice(0,8).toUpperCase()}</span>
                    <span>•</span>
                    <span className={ticket.priority === 'URGENT' ? 'text-rose-600 font-bold' : ''}>
                      {ticket.priority} Priority
                    </span>
                    <span>•</span>
                    <span>Created {new Date(ticket.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div>
                  {ticket.slaBreached && (
                    <span className="px-2.5 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-lg border border-rose-100">
                      SLA Breached
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
