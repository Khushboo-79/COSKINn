import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supportApi } from '../../core/api/support';
import { X, ShieldAlert, Loader2 } from 'lucide-react';

interface EscalationModalProps {
  ticketId: string;
  adminId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const EscalationModal = ({ ticketId, adminId, isOpen, onClose }: EscalationModalProps) => {
  const queryClient = useQueryClient();
  const [reason, setReason] = useState('Requires Manager Approval');
  const [handoffNote, setHandoffNote] = useState('');

  const escalateMutation = useMutation({
    mutationFn: async () => {
      // 1. Post the internal note about the handoff
      const internalNote = `[INTERNAL NOTE - ESCALATION] Reason: ${reason}. \n\nAgent Handoff Notes: ${handoffNote}`;
      await supportApi.replyToTicket(ticketId, { adminId, message: internalNote });
      
      // 2. Trigger the escalation state change
      await supportApi.escalateTicket(ticketId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'tickets'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'tickets', ticketId, 'messages'] });
      onClose();
      setHandoffNote('');
    },
    onError: (err: any) => {
      alert(`Error escalating ticket: ${err.message}`);
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-purple-50">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-bold text-purple-900">Escalate Ticket</h2>
          </div>
          <button onClick={onClose} className="text-purple-400 hover:text-purple-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="text-sm text-slate-500">
            Escalating this ticket will alert senior staff and reset the SLA resolution timer. Please provide a handoff note for the next agent.
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Escalation Reason</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="Requires Manager Approval">Requires Manager Approval (Refund/Replacement limit exceeded)</option>
              <option value="Complex Technical Issue">Complex Technical Issue</option>
              <option value="Customer Requested Manager">Customer Requested Manager</option>
              <option value="Legal / PR Risk">Legal / PR Risk</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Handoff Notes (Internal Only)</label>
            <textarea
              required
              value={handoffNote}
              onChange={(e) => setHandoffNote(e.target.value)}
              placeholder="E.g., I've verified their order and offered a 10% discount, but they are demanding a full refund which requires manager approval."
              rows={4}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none resize-none"
            />
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => escalateMutation.mutate()}
            disabled={!handoffNote.trim() || escalateMutation.isPending}
            className="px-5 py-2.5 bg-purple-600 text-white font-medium hover:bg-purple-700 rounded-xl transition-colors shadow-sm disabled:opacity-50 flex items-center"
          >
            {escalateMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Confirm Escalation'}
          </button>
        </div>
      </div>
    </div>
  );
};
