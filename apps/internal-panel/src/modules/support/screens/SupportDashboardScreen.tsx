import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import PanelHeader from '../../../components/PanelHeader';
import { Search, MessageSquare, Clock, CheckCircle, AlertCircle, Send, User } from 'lucide-react';

export default function SupportPanel() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Use a hardcoded admin ID for now, usually would come from auth context
  const adminId = 'admin-123'; 

  // Fetch Tickets
  const { data: tickets, isLoading: loadingTickets } = useQuery({
    queryKey: ['tickets', statusFilter],
    queryFn: async () => {
      const url = statusFilter === 'ALL' ? '/support/admin/tickets' : `/support/admin/tickets?status=${statusFilter}`;
      const res = await api.get(url);
      return res.data;
    }
  });

  // Fetch active ticket messages
  const { data: messages, isLoading: loadingMessages } = useQuery({
    queryKey: ['ticketMessages', activeTicketId],
    queryFn: async () => {
      if (!activeTicketId) return [];
      const res = await api.get(`/support/tickets/${activeTicketId}/messages`);
      return res.data;
    },
    enabled: !!activeTicketId,
    refetchInterval: 5000 // Poll every 5s for new messages
  });

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reply Mutation
  const replyMutation = useMutation({
    mutationFn: (message: string) => api.post(`/support/admin/tickets/${activeTicketId}/reply`, { adminId, message }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticketMessages', activeTicketId] });
      setReplyMessage('');
    }
  });

  // Close Ticket Mutation
  const closeMutation = useMutation({
    mutationFn: (id: string) => api.post(`/support/admin/tickets/${id}/close`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      setActiveTicketId(null);
    }
  });

  // Escalate Mutation
  const escalateMutation = useMutation({
    mutationFn: (id: string) => api.post(`/support/admin/tickets/${id}/escalate`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    }
  });

  // Fetch SLA Stats
  const { data: slaStats } = useQuery({
    queryKey: ['slaStats'],
    queryFn: async () => {
      const res = await api.get('/support/admin/tickets/stats/sla');
      return res.data;
    }
  });

  const activeTicket = tickets?.find((t: any) => t.id === activeTicketId);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'text-rose-600 bg-rose-50';
      case 'HIGH': return 'text-orange-600 bg-orange-50';
      case 'NORMAL': return 'text-blue-600 bg-blue-50';
      case 'LOW': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'OPEN': return <AlertCircle className="w-4 h-4 text-rose-500" />;
      case 'PENDING': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'CLOSED': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      default: return null;
    }
  };

  const filteredTickets = tickets?.filter((t: any) => 
    t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <PanelHeader
        title="Customer Support"
        subtitle="Manage tickets and chat with customers"
        icon={MessageSquare}
      />

      {/* SLA Dashboard Mini */}
      {slaStats && (
        <div className="flex gap-4 mt-6">
          <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100 flex-1 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Total Tickets</p>
              <h3 className="text-2xl font-bold text-gray-900">{slaStats.total}</h3>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Resolved</p>
              <h3 className="text-2xl font-bold text-emerald-600">{slaStats.resolved}</h3>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Escalated</p>
              <h3 className="text-2xl font-bold text-orange-600">{slaStats.escalated}</h3>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">SLA Breached</p>
              <h3 className="text-2xl font-bold text-rose-600">{slaStats.breached}</h3>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Compliance Rate</p>
              <h3 className={`text-2xl font-bold ${slaStats.complianceRate >= 90 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {slaStats.complianceRate}%
              </h3>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex gap-4 mt-6 min-h-0">
        {/* Ticket List (Left Sidebar) */}
        <div className="w-1/3 flex flex-col bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#FF0069]/30 focus:border-[#FF0069] outline-none"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {['ALL', 'OPEN', 'PENDING', 'CLOSED'].map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold tracking-wider transition-colors ${
                    statusFilter === s ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {loadingTickets ? (
              <div className="p-8 text-center text-gray-500">Loading tickets...</div>
            ) : filteredTickets?.map((ticket: any) => (
              <button
                key={ticket.id}
                onClick={() => setActiveTicketId(ticket.id)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  activeTicketId === ticket.id 
                    ? 'bg-[#FF0069] text-white shadow-md' 
                    : 'hover:bg-white text-gray-900'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-1.5">
                    {getStatusIcon(ticket.status)}
                    <span className="font-bold text-sm line-clamp-1">{ticket.subject}</span>
                  </div>
                  <span className="text-xs opacity-60 flex-shrink-0">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-[10px] opacity-80 line-clamp-1`}>
                    {ticket.user?.firstName} {ticket.user?.lastName} ({ticket.user?.email})
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    activeTicketId === ticket.id ? 'bg-white/20' : getPriorityColor(ticket.priority)
                  }`}>
                    {ticket.priority}
                  </span>
                </div>
              </button>
            ))}
            {filteredTickets?.length === 0 && (
              <div className="p-8 text-center text-gray-500 text-sm">No tickets found.</div>
            )}
          </div>
        </div>

        {/* Chat Interface (Right Sidebar) */}
        <div className="flex-1 flex flex-col bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          {activeTicket ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    {activeTicket.subject}
                    <span className="text-xs font-mono text-gray-400 font-normal">#{activeTicket.id.split('-')[0]}</span>
                  </h3>
                  <div className="flex gap-4 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {activeTicket.user?.firstName} {activeTicket.user?.lastName}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Opened {new Date(activeTicket.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {activeTicket.slaBreached && (
                    <span className="px-2.5 py-1 text-xs font-bold rounded-lg uppercase tracking-wide bg-rose-100 text-rose-700">
                      SLA BREACHED
                    </span>
                  )}
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-lg uppercase tracking-wide flex items-center gap-1 ${
                    activeTicket.status === 'CLOSED' ? 'bg-emerald-100 text-emerald-700' :
                    activeTicket.status === 'ESCALATED' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {activeTicket.status}
                  </span>
                  
                  {activeTicket.status !== 'CLOSED' && activeTicket.status !== 'ESCALATED' && (
                    <button 
                      onClick={() => { if(confirm('Escalate this ticket to URGENT?')) escalateMutation.mutate(activeTicket.id) }}
                      disabled={escalateMutation.isPending}
                      className="px-3 py-1.5 bg-orange-50 text-orange-600 hover:bg-orange-100 rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                    >
                      Escalate
                    </button>
                  )}
                  {activeTicket.status !== 'CLOSED' && (
                    <button 
                      onClick={() => { if(confirm('Close this ticket?')) closeMutation.mutate(activeTicket.id) }}
                      disabled={closeMutation.isPending}
                      className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                    >
                      Close Ticket
                    </button>
                  )}
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
                {loadingMessages ? (
                  <div className="text-center text-gray-500">Loading messages...</div>
                ) : messages?.map((msg: any) => {
                  const isAdmin = msg.senderRole === 'ADMIN' || msg.senderRole === 'SUPPORT' || msg.senderRole === 'SUPER_ADMIN';
                  return (
                    <div key={msg.id} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm ${
                        isAdmin 
                          ? 'bg-[#FF0069] text-white rounded-tr-sm' 
                          : 'bg-white border border-gray-100 text-gray-900 rounded-tl-sm'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${isAdmin ? 'text-pink-100' : 'text-gray-400'}`}>
                            {isAdmin ? 'Support Team' : activeTicket.user?.firstName}
                          </span>
                          <span className={`text-[10px] ${isAdmin ? 'text-pink-200' : 'text-gray-300'}`}>
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                      </div>
                    </div>
                  );
                })}
                {messages?.length === 0 && (
                  <div className="text-center text-gray-400 py-8">No messages yet. Send a reply to start the conversation.</div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              {activeTicket.status !== 'CLOSED' ? (
                <div className="p-4 bg-white border-t border-gray-100">
                  <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-2 focus-within:border-[#FF0069] focus-within:ring-1 focus-within:ring-[#FF0069] transition-all">
                    <textarea
                      rows={2}
                      placeholder="Type your reply to the customer..."
                      className="flex-1 bg-transparent border-none focus:ring-0 resize-none px-3 py-2 text-sm outline-none"
                      value={replyMessage}
                      onChange={e => setReplyMessage(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          if (replyMessage.trim()) replyMutation.mutate(replyMessage);
                        }
                      }}
                    />
                    <button 
                      onClick={() => { if (replyMessage.trim()) replyMutation.mutate(replyMessage); }}
                      disabled={!replyMessage.trim() || replyMutation.isPending}
                      className="p-3 bg-[#FF0069] hover:bg-rose-600 disabled:bg-gray-300 text-white rounded-xl transition-colors shrink-0"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-center text-gray-400 mt-2 font-medium">Press Enter to send, Shift+Enter for new line</p>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 border-t border-gray-100 text-center text-gray-500 text-sm font-medium">
                  This ticket has been closed. You cannot send further replies.
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                <MessageSquare className="w-10 h-10 text-gray-300" />
              </div>
              <p className="text-lg font-medium text-gray-500">Select a ticket to view conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
