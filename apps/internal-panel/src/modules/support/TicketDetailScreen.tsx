import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supportApi } from '../../core/api/support';
import { useAuth } from '../../core/rbac/AuthContext';
import { Send, AlertCircle, ArrowLeft, CheckCircle2, AlertTriangle, ShieldAlert, Lock, UserPlus, Loader2, Phone, Mail, MessageCircle, MessageSquare } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import { orderApi } from '../../core/api/orders';
import { EscalationModal } from './EscalationModal';
import { CannedResponseWidget } from './CannedResponseWidget';

export const TicketDetailScreen = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  const [replyText, setReplyText] = useState('');
  const [activeTab, setActiveTab] = useState<'internal' | 'chat' | 'email' | 'whatsapp' | 'call'>('internal');
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  const { data: tickets } = useQuery({
    queryKey: ['admin', 'tickets'],
    queryFn: () => supportApi.getTickets()
  });

  const ticket = tickets?.find((t: any) => t.id === id);

  const { data: initialMessages, isLoading: loadingMessages } = useQuery({
    queryKey: ['admin', 'tickets', id, 'messages'],
    queryFn: () => supportApi.getTicketMessages(id!),
    enabled: !!id
  });

  const [liveMessages, setLiveMessages] = useState<any[]>([]);

  useEffect(() => {
    if (initialMessages) {
      setLiveMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    if (!id) return;
    
    // Connect to WebSocket gateway
    const socket = io('http://localhost:3000/chat');
    socketRef.current = socket;

    socket.emit('joinTicket', { ticketId: id });

    socket.on('newMessage', (newMsg: any) => {
      setLiveMessages((prev) => {
        // Prevent duplicates if React Query already fetched it
        if (prev.find((m) => m.id === newMsg.id)) return prev;
        return [...prev, newMsg];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [liveMessages]);
  const { data: userOrders } = useQuery({
    queryKey: ['admin', 'orders', 'user', ticket?.userId],
    queryFn: async () => {
      // In a real scenario, we'd have a specific endpoint for user's orders,
      // here we just fetch admin orders and filter locally for MVP
      const allOrders = await orderApi.getAdminOrders({});
      return allOrders.filter((o: any) => o.userId === ticket?.userId);
    },
    enabled: !!ticket?.userId
  });

  // Fetch recent returns for this user
  const { data: userReturns } = useQuery({
    queryKey: ['admin', 'returns', 'user', ticket?.userId],
    queryFn: async () => {
      const allReturns = await orderApi.getAllReturns();
      // Assuming return objects have an order obj attached in our mock, or we can cross ref
      // For now, we'll just filter if possible, or show all if backend doesn't support
      // Let's assume we can filter by matching order IDs in userOrders
      const userOrderIds = userOrders?.map((o: any) => o.id) || [];
      return allReturns.filter((r: any) => userOrderIds.includes(r.orderId));
    },
    enabled: !!userOrders
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [liveMessages]);

  const replyMutation = useMutation({
    mutationFn: () => {
      let prefix = '';
      if (activeTab === 'internal') prefix = '[INTERNAL NOTE] ';
      if (activeTab === 'email') prefix = '[EMAIL] ';
      if (activeTab === 'whatsapp') prefix = '[WHATSAPP] ';
      if (activeTab === 'call') prefix = '[CALL LOG] ';

      const payloadMessage = prefix + replyText;
      
      // Instead of relying purely on REST for chat, we could emit via socket,
      // but emitting via REST is fine, the backend broadcast to the socket.
      return supportApi.replyToTicket(id!, { adminId: user!.id, message: payloadMessage });
    },
    onSuccess: () => {
      setReplyText('');
      // Invalidate just in case, though WebSockets will handle the real-time update
      queryClient.invalidateQueries({ queryKey: ['admin', 'tickets', id, 'messages'] });
    }
  });

  const escalateMutation = useMutation({
    mutationFn: () => supportApi.escalateTicket(id!),
    onSuccess: () => {
      alert('Ticket escalated.');
      queryClient.invalidateQueries({ queryKey: ['admin', 'tickets'] });
    }
  });

  const assignMutation = useMutation({
    mutationFn: (adminId: string) => supportApi.assignTicket(id!, { adminId }),
    onSuccess: () => {
      alert('Ticket assigned successfully.');
      queryClient.invalidateQueries({ queryKey: ['admin', 'tickets'] });
    },
    onError: (err: any) => {
      alert(`Assignment failed: ${err.message}`);
    }
  });

  const closeMutation = useMutation({
    mutationFn: () => supportApi.closeTicket(id!),
    onSuccess: () => {
      alert('Ticket closed.');
      queryClient.invalidateQueries({ queryKey: ['admin', 'tickets'] });
    }
  });

  if (!ticket) return <div className="p-12 text-center text-slate-500">Loading ticket...</div>;

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6">
      {/* Left Column: Conversation Thread */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-4">
            <Link to="/support/tickets" className="text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-slate-900 line-clamp-1">{ticket.subject}</h1>
              <div className="text-sm text-slate-500 mt-1">Ticket #{ticket.id.slice(0,8).toUpperCase()}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {ticket.status !== 'CLOSED' && (
              <>
                <button 
                  onClick={() => setShowEscalationModal(true)}
                  className="px-4 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 text-sm font-medium rounded-xl transition-colors flex items-center"
                >
                  <ShieldAlert className="h-4 w-4 mr-2" />
                  Escalate
                </button>
                <button 
                  onClick={() => {
                    if(window.confirm('Mark this ticket as resolved and closed?')) closeMutation.mutate();
                  }}
                  className="px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 text-sm font-medium rounded-xl transition-colors flex items-center"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Close Ticket
                </button>
              </>
            )}
            {ticket.status === 'CLOSED' && (
              <span className="px-4 py-2 bg-slate-100 text-slate-500 text-sm font-medium rounded-xl flex items-center border border-slate-200">
                Ticket Closed
              </span>
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {loadingMessages ? (
            <div className="text-center text-slate-500 mt-10">Loading messages...</div>
          ) : (
            liveMessages.map((msg: any) => {
              const isInternal = msg.message.startsWith('[INTERNAL NOTE]');
              const isEmail = msg.message.startsWith('[EMAIL]');
              const isWhatsApp = msg.message.startsWith('[WHATSAPP]');
              const isCallLog = msg.message.startsWith('[CALL LOG]');
              
              let cleanMessage = msg.message;
              if (isInternal) cleanMessage = cleanMessage.replace('[INTERNAL NOTE]', '').trim();
              if (isEmail) cleanMessage = cleanMessage.replace('[EMAIL]', '').trim();
              if (isWhatsApp) cleanMessage = cleanMessage.replace('[WHATSAPP]', '').trim();
              if (isCallLog) cleanMessage = cleanMessage.replace('[CALL LOG]', '').trim();

              const isSpecial = isInternal || isEmail || isWhatsApp || isCallLog;
              
              return (
                <div key={msg.id} className={`flex ${msg.senderRole === 'ADMIN' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${
                    msg.senderRole === 'ADMIN' && !isSpecial
                      ? 'bg-slate-900 text-white rounded-tr-sm' 
                      : isInternal 
                      ? 'bg-amber-50 text-amber-900 border border-amber-200 rounded-tr-sm'
                      : isEmail
                      ? 'bg-blue-50 text-blue-900 border border-blue-200 rounded-tr-sm'
                      : isWhatsApp
                      ? 'bg-green-50 text-green-900 border border-green-200 rounded-tr-sm'
                      : isCallLog
                      ? 'bg-purple-50 text-purple-900 border border-purple-200 rounded-tr-sm'
                      : 'bg-white border border-slate-100 rounded-tl-sm text-slate-800'
                  }`}>
                    {isInternal && (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-2 border-b border-amber-200 pb-1">
                        <Lock className="h-3 w-3" />
                        Internal Note
                      </div>
                    )}
                    {isEmail && (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-2 border-b border-blue-200 pb-1">
                        <Mail className="h-3 w-3" />
                        Email Blast
                      </div>
                    )}
                    {isWhatsApp && (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-green-600 mb-2 border-b border-green-200 pb-1">
                        <MessageCircle className="h-3 w-3" />
                        WhatsApp Message
                      </div>
                    )}
                    {isCallLog && (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-purple-600 mb-2 border-b border-purple-200 pb-1">
                        <Phone className="h-3 w-3" />
                        Call Log
                      </div>
                    )}
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">{cleanMessage}</div>
                    <div className={`text-[10px] mt-2 text-right ${
                      msg.senderRole === 'ADMIN' && !isSpecial 
                        ? 'text-slate-400' 
                        : isInternal ? 'text-amber-600/70' 
                        : isEmail ? 'text-blue-600/70'
                        : isWhatsApp ? 'text-green-600/70'
                        : isCallLog ? 'text-purple-600/70'
                        : 'text-slate-400'
                    }`}>
                      {new Date(msg.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Omnichannel Reply Hub */}
        {ticket.status !== 'CLOSED' && (
          <div className="bg-white border-t border-slate-100">
            {/* Tabs */}
            <div className="flex items-center border-b border-slate-100 px-2">
              <button onClick={() => setActiveTab('internal')} className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'internal' ? 'border-amber-500 text-amber-700 bg-amber-50/30' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
                <Lock className="h-4 w-4" /> Internal Note
              </button>
              <button onClick={() => setActiveTab('chat')} className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'chat' ? 'border-slate-900 text-slate-900 bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
                <MessageSquare className="h-4 w-4" /> Live Chat
              </button>
              <button onClick={() => setActiveTab('email')} className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'email' ? 'border-blue-500 text-blue-700 bg-blue-50/30' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
                <Mail className="h-4 w-4" /> Email
              </button>
              <button onClick={() => setActiveTab('whatsapp')} className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'whatsapp' ? 'border-green-500 text-green-700 bg-green-50/30' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </button>
              <button onClick={() => setActiveTab('call')} className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors ${activeTab === 'call' ? 'border-purple-500 text-purple-700 bg-purple-50/30' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
                <Phone className="h-4 w-4" /> Log Call
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-end gap-3 relative">
                <textarea 
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={
                    activeTab === 'internal' ? "Type an internal note for the team..." : 
                    activeTab === 'call' ? "Log details about the phone call..." :
                    "Type your reply to the customer..."
                  }
                  className={`flex-1 resize-none border rounded-xl p-3 pb-10 focus:outline-none focus:ring-2 transition-colors ${
                    activeTab === 'internal' ? 'bg-amber-50/50 border-amber-200 focus:ring-amber-500 placeholder-amber-400/70' : 
                    activeTab === 'email' ? 'border-blue-200 focus:ring-blue-500 bg-blue-50/10' :
                    activeTab === 'whatsapp' ? 'border-green-200 focus:ring-green-500 bg-green-50/10' :
                    activeTab === 'call' ? 'border-purple-200 focus:ring-purple-500 bg-purple-50/10' :
                    'border-slate-200 focus:ring-slate-900 bg-white'
                  }`}
                  rows={3}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if(replyText.trim()) replyMutation.mutate();
                    }
                  }}
                />
                
                {/* Canned Response embedded inside textarea visually */}
                <div className="absolute left-2 bottom-2">
                  <CannedResponseWidget onSelect={(text) => setReplyText(prev => prev ? prev + ' ' + text : text)} />
                </div>

                <button 
                  onClick={() => replyMutation.mutate()}
                  disabled={!replyText.trim() || replyMutation.isPending}
                  className={`h-[92px] w-[76px] text-white rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 ${
                    activeTab === 'internal' ? 'bg-amber-500 hover:bg-amber-600' : 
                    activeTab === 'email' ? 'bg-blue-600 hover:bg-blue-700' :
                    activeTab === 'whatsapp' ? 'bg-green-500 hover:bg-green-600' :
                    activeTab === 'call' ? 'bg-purple-600 hover:bg-purple-700' :
                    'bg-slate-900 hover:bg-slate-800'
                  }`}
                >
                  {activeTab === 'internal' ? <Lock className="h-6 w-6" /> : 
                   activeTab === 'call' ? <CheckCircle2 className="h-6 w-6" /> :
                   <Send className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Context & Metadata */}
      <div className="w-full md:w-80 flex flex-col gap-6 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">Customer Profile</h3>
          <div className="space-y-3 text-sm">
            <div>
              <div className="text-slate-500 text-xs uppercase tracking-wide font-medium">Name</div>
              <div className="font-medium text-slate-900">{ticket.user?.firstName || 'Unknown'} {ticket.user?.lastName || ''}</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs uppercase tracking-wide font-medium">Email</div>
              <div className="text-slate-900">{ticket.user?.email || 'N/A'}</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs uppercase tracking-wide font-medium">Phone</div>
              <div className="text-slate-900">{ticket.user?.phone || 'N/A'}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">Ticket Metadata</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-slate-500 text-xs uppercase tracking-wide font-medium mb-1">Category Tag</label>
              <select 
                className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-slate-400 bg-slate-50"
                value={ticket.category || ''}
                onChange={(e) => {
                  // In a real app, this would hit a PUT /tickets/:id endpoint
                  alert(`Category changed to ${e.target.value}. (Mocked for Phase 1)`);
                }}
              >
                <option value="">-- Select Category --</option>
                <option value="ORDER_ISSUE">Order / Delivery Issue</option>
                <option value="PAYMENT_ISSUE">Payment / Refund Issue</option>
                <option value="DAMAGED_ITEM">Damaged / Defective Item</option>
                <option value="WRONG_ITEM">Received Wrong Item</option>
                <option value="ALLERGIC_REACTION">Allergic Reaction</option>
                <option value="GENERAL_INQUIRY">General Inquiry</option>
              </select>
            </div>
            
            <div className="pt-2">
              <label className="block text-slate-500 text-xs uppercase tracking-wide font-medium mb-1">Assign To</label>
              <div className="flex gap-2">
                <select 
                  className="flex-1 p-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-slate-400 bg-slate-50"
                  value={ticket.assignedToId || ''}
                  onChange={(e) => {
                    const newAdminId = e.target.value;
                    if (newAdminId) {
                      assignMutation.mutate(newAdminId);
                    }
                  }}
                >
                  <option value="">Unassigned</option>
                  <option value={user!.id}>Me ({user!.email})</option>
                  <option value="user-2">Sarah (Tier 2)</option>
                  <option value="user-3">John (Manager)</option>
                </select>
                {assignMutation.isPending && <Loader2 className="h-5 w-5 animate-spin text-slate-400" />}
              </div>
            </div>

            <div className="pt-2">
              <div className="text-slate-500 text-xs uppercase tracking-wide font-medium mb-1">Status</div>
              <div className="font-medium text-slate-900">{ticket.status}</div>
            </div>
            <div>
              <div className="text-slate-500 text-xs uppercase tracking-wide font-medium mb-1">Priority</div>
              <div className="font-medium text-slate-900">{ticket.priority}</div>
            </div>
          </div>
        </div>

        {/* Dynamic Order Context Widget */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">Recent Orders</h3>
          <div className="space-y-3">
            {!userOrders ? (
              <div className="text-sm text-slate-500">Loading...</div>
            ) : userOrders.length === 0 ? (
              <div className="text-sm text-slate-500 italic">No recent orders found.</div>
            ) : (
              userOrders.slice(0, 3).map((order: any) => (
                <div key={order.id} className="p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-xs font-bold text-slate-700">#{order.id.slice(0,8).toUpperCase()}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded uppercase">{order.status}</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-2">
                    {new Date(order.createdAt).toLocaleDateString()} • ₹{order.finalAmount}
                  </div>
                  <Link 
                    to={`/orders/${order.id}`}
                    target="_blank"
                    className="text-xs font-medium text-blue-600 hover:text-blue-800"
                  >
                    View in Order Panel &rarr;
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Dynamic Returns Context Widget */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">Recent Returns</h3>
          <div className="space-y-3">
            {!userReturns ? (
              <div className="text-sm text-slate-500">Loading...</div>
            ) : userReturns.length === 0 ? (
              <div className="text-sm text-slate-500 italic">No recent returns found.</div>
            ) : (
              userReturns.slice(0, 3).map((ret: any) => (
                <div key={ret.id} className="p-3 border border-slate-100 rounded-xl bg-slate-50/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-xs font-bold text-slate-700">RET-{ret.id.slice(0,8).toUpperCase()}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-rose-100 text-rose-700 rounded uppercase">{ret.status}</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-2">
                    {new Date(ret.createdAt).toLocaleDateString()} • {ret.reason}
                  </div>
                  <Link 
                    to={`/returns/qc`}
                    target="_blank"
                    className="text-xs font-medium text-rose-600 hover:text-rose-800"
                  >
                    View in Returns &rarr;
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      <EscalationModal 
        isOpen={showEscalationModal} 
        onClose={() => setShowEscalationModal(false)}
        ticketId={id!}
        adminId={user!.id}
      />
    </div>
  );
};
