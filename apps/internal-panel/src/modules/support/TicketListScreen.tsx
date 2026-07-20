import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supportApi } from '../../core/api/support';
import { Search, Filter, AlertCircle, Clock, ChevronRight, Inbox } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const TicketListScreen = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: tickets, isLoading } = useQuery({
    queryKey: ['admin', 'tickets', statusFilter],
    queryFn: () => supportApi.getTickets(statusFilter || undefined)
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-50 text-red-700 border-red-200';
      case 'HIGH': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return 'bg-blue-50 text-blue-700';
      case 'ESCALATED': return 'bg-purple-50 text-purple-700';
      case 'CLOSED': return 'bg-green-50 text-green-700';
      default: return 'bg-slate-50 text-slate-700';
    }
  };

  const filteredTickets = tickets?.filter((t: any) => 
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Support Tickets</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and resolve customer support queries.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search tickets, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 w-64"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-3 pr-8 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
          >
            <option value="">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="ESCALATED">Escalated</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500">Loading tickets...</div>
        ) : filteredTickets.length === 0 ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <Inbox className="h-12 w-12 text-slate-300 mb-4" />
            <p className="font-medium">No tickets found.</p>
            <p className="text-sm mt-1">You're all caught up!</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ticket</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status / Priority</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">SLA</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTickets.map((ticket: any) => (
                <tr 
                  key={ticket.id} 
                  onClick={() => navigate(`/support/tickets/${ticket.id}`)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-900 mb-1 line-clamp-1">{ticket.subject}</div>
                    <div className="text-xs font-mono text-slate-500">#{ticket.id.slice(0,8).toUpperCase()}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-900">{ticket.user?.firstName || 'Unknown'} {ticket.user?.lastName || ''}</div>
                    <div className="text-xs text-slate-500">{ticket.user?.email || 'No email'}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide border inline-block mt-1 ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority} Priority
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-slate-700">{ticket.category || 'Uncategorized'}</span>
                  </td>
                  <td className="py-4 px-6">
                    {ticket.status !== 'CLOSED' && (
                      <div className="flex items-center gap-1.5">
                        {ticket.slaBreached ? (
                          <>
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <span className="text-xs font-medium text-red-600">SLA Breached</span>
                          </>
                        ) : (
                          <>
                            <Clock className="h-4 w-4 text-emerald-500" />
                            <span className="text-xs font-medium text-emerald-600">On Track</span>
                          </>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-slate-600 inline-block transition-colors" />
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
