import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PanelHeader from '../../components/PanelHeader';
import StatCard from '../../components/StatCard';
import { Headphones, MessageSquare, Clock, CheckCircle2, AlertCircle,
  Search,  User, Calendar, ChevronRight, Plus,
   Timer, BarChart3, Inbox } from 'lucide-react';

const useSupportOverview = () => useQuery({
  queryKey: ['supportOverview'],
  queryFn: async () => ({
    totalTickets: 156,
    openTickets: 23,
    inProgress: 12,
    resolved: 121,
    avgResponseTime: '2h 15m',
    slaCompliance: 94.2,
    todayNew: 8,
  })
});

const useTickets = () => useQuery({
  queryKey: ['supportTickets'],
  queryFn: async () => ([
    { id: 'TCK-1001', subject: 'Cannot complete payment on checkout', customer: 'Priya Sharma', email: 'priya@email.com', priority: 'High', status: 'Open', sla: '1h 30m remaining', createdAt: '2026-07-06 14:30', assignee: 'Ravi K.' },
    { id: 'TCK-1002', subject: 'Wrong product delivered - Order #4521', customer: 'Rahul Verma', email: 'rahul@email.com', priority: 'High', status: 'In Progress', sla: '45m remaining', createdAt: '2026-07-06 12:15', assignee: 'Meena S.' },
    { id: 'TCK-1003', subject: 'Request for product ingredient list', customer: 'Anita Desai', email: 'anita@email.com', priority: 'Low', status: 'Open', sla: '4h remaining', createdAt: '2026-07-06 11:00', assignee: 'Unassigned' },
    { id: 'TCK-1004', subject: 'Refund not received for cancelled order', customer: 'Vikram Patel', email: 'vikram@email.com', priority: 'Medium', status: 'In Progress', sla: '2h 10m remaining', createdAt: '2026-07-06 09:45', assignee: 'Ravi K.' },
    { id: 'TCK-1005', subject: 'App crashes on product detail page', customer: 'Meera Joshi', email: 'meera@email.com', priority: 'Critical', status: 'Open', sla: '30m remaining', createdAt: '2026-07-06 15:00', assignee: 'Unassigned' },
    { id: 'TCK-1006', subject: 'Coupon code not working - SUMMER25', customer: 'Karan Singh', email: 'karan@email.com', priority: 'Medium', status: 'Resolved', sla: 'Met', createdAt: '2026-07-05 16:20', assignee: 'Meena S.' },
    { id: 'TCK-1007', subject: 'Account login issues after password reset', customer: 'Sonal Gupta', email: 'sonal@email.com', priority: 'High', status: 'Resolved', sla: 'Met', createdAt: '2026-07-05 10:00', assignee: 'Ravi K.' },
    { id: 'TCK-1008', subject: 'Allergy reaction inquiry about Face Serum', customer: 'Deepak Nair', email: 'deepak@email.com', priority: 'Critical', status: 'In Progress', sla: '15m remaining', createdAt: '2026-07-06 15:45', assignee: 'Meena S.' },
  ])
});

const useChatLogs = () => useQuery({
  queryKey: ['chatLogs'],
  queryFn: async () => ([
    { id: 'CHAT-201', customer: 'Aarti K.', agent: 'Ravi K.', messages: 14, duration: '12m', status: 'Completed', rating: 5 },
    { id: 'CHAT-202', customer: 'Suresh M.', agent: 'Meena S.', messages: 8, duration: '6m', status: 'Completed', rating: 4 },
    { id: 'CHAT-203', customer: 'Neha P.', agent: 'Ravi K.', messages: 22, duration: '18m', status: 'Escalated', rating: 3 },
    { id: 'CHAT-204', customer: 'Arjun R.', agent: 'Bot', messages: 5, duration: '2m', status: 'Bot Resolved', rating: null },
    { id: 'CHAT-205', customer: 'Divya S.', agent: 'Meena S.', messages: 10, duration: '8m', status: 'Completed', rating: 5 },
  ])
});

export default function SupportPanel() {
  const [activeTab, setActiveTab] = useState<'tickets' | 'chats' | 'sla'>('tickets');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { data: overview, isLoading: overviewLoading } = useSupportOverview();
  const { data: tickets } = useTickets();
  const { data: chatLogs } = useChatLogs();

  const tabs = [
    { key: 'tickets' as const, label: 'Tickets', icon: Inbox },
    { key: 'chats' as const, label: 'Chat Logs', icon: MessageSquare },
    { key: 'sla' as const, label: 'SLA Dashboard', icon: Timer },
  ];

  const filteredTickets = tickets?.filter(t => {
    const matchSearch = !searchTerm || t.subject.toLowerCase().includes(searchTerm.toLowerCase()) || t.customer.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const priorityColor = (p: string) => {
    switch (p) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const statusColor = (s: string) => {
    switch (s) {
      case 'Open': return 'bg-blue-100 text-blue-700';
      case 'In Progress': return 'bg-purple-100 text-purple-700';
      case 'Resolved': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6 p-4 overflow-y-auto h-full">
      <PanelHeader
        title="Customer Support"
        subtitle="Manage tickets, live chat, and SLA performance"
        icon={Headphones}
        actionLabel="New Ticket"
        onAction={() => alert('Create ticket (coming soon)')}
        actionIcon={Plus}
      />

      {/* KPI Cards */}
      {overviewLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-28 rounded-2xl bg-white/40 animate-pulse" />)}
        </div>
      ) : overview && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Open Tickets" value={overview.openTickets} icon={AlertCircle} />
          <StatCard label="In Progress" value={overview.inProgress} icon={Clock} />
          <StatCard label="Resolved Today" value={overview.resolved} icon={CheckCircle2} />
          <StatCard label="Avg Response" value={overview.avgResponseTime} icon={Timer} />
        </div>
      )}

      {/* SLA Compliance Banner */}
      {overview && (
        <div className="bg-gradient-to-r from-[#FF0069]/10 to-[#FFD498]/10 border border-[#FF0069]/20 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF0069] to-[#FFD498] flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">SLA Compliance Rate</p>
              <p className="text-xs text-gray-500">{overview.todayNew} new tickets today</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold bg-gradient-to-r from-[#FF0069] to-[#FFD498] text-transparent bg-clip-text">
              {overview.slaCompliance}%
            </p>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-0">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all duration-200 ${
                activeTab === tab.key
                  ? 'border-[#FF0069] text-[#FF0069]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tickets Tab */}
      {activeTab === 'tickets' && (
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#FF0069]/30 focus:border-[#FF0069] outline-none"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              {['All', 'Open', 'In Progress', 'Resolved'].map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    statusFilter === s
                      ? 'bg-[#FF0069] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredTickets?.map(ticket => (
              <div key={ticket.id} className="p-4 hover:bg-white/60 transition-colors cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-400">{ticket.id}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${priorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 truncate">{ticket.subject}</h4>
                    <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {ticket.customer}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {ticket.createdAt}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {ticket.assignee}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <span className={`text-xs font-semibold ${
                      ticket.sla.includes('remaining') && parseInt(ticket.sla) <= 30
                        ? 'text-red-500' : ticket.sla === 'Met' ? 'text-emerald-600' : 'text-orange-600'
                    }`}>
                      <Clock className="w-3 h-3 inline mr-1" />
                      {ticket.sla}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Logs Tab */}
      {activeTab === 'chats' && chatLogs && (
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/60">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Chat ID</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Agent</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Messages</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Duration</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {chatLogs.map(chat => (
                  <tr key={chat.id} className="hover:bg-white/60 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-mono text-gray-700">{chat.id}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-700">{chat.customer}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{chat.agent}</td>
                    <td className="px-5 py-3.5 text-sm text-center font-semibold text-gray-700">{chat.messages}</td>
                    <td className="px-5 py-3.5 text-sm text-center text-gray-600">{chat.duration}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        chat.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                        chat.status === 'Escalated' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {chat.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {chat.rating ? (
                        <span className="text-sm">{'⭐'.repeat(chat.rating)}</span>
                      ) : (
                        <span className="text-xs text-gray-400">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SLA Dashboard Tab */}
      {activeTab === 'sla' && overview && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">SLA Performance</h3>
            <div className="space-y-4">
              {[
                { label: 'Critical (1h)', met: 92, total: 12 },
                { label: 'High (4h)', met: 96, total: 45 },
                { label: 'Medium (8h)', met: 98, total: 67 },
                { label: 'Low (24h)', met: 100, total: 32 },
              ].map(sla => (
                <div key={sla.label} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{sla.label}</span>
                    <span className="font-semibold text-gray-700">{sla.met}% ({sla.total} tickets)</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#FF0069] to-[#FFD498] transition-all duration-700"
                      style={{ width: `${sla.met}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Agent Performance</h3>
            <div className="space-y-3">
              {[
                { name: 'Ravi K.', resolved: 48, avgTime: '1h 45m', rating: 4.6 },
                { name: 'Meena S.', resolved: 52, avgTime: '1h 20m', rating: 4.8 },
                { name: 'Support Bot', resolved: 35, avgTime: '2m', rating: 3.9 },
              ].map(agent => (
                <div key={agent.name} className="flex items-center justify-between p-3 rounded-xl bg-white/40 hover:bg-white/60 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF0069]/20 to-[#FFD498]/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-[#FF0069]" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{agent.name}</p>
                      <p className="text-xs text-gray-500">{agent.resolved} resolved • Avg: {agent.avgTime}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#FF0069]">⭐ {agent.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
