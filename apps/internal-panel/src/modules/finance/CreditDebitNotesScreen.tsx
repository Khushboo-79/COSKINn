import React, { useState } from 'react';
import { FileMinus, FilePlus, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { financeApi } from '../../core/api/finance';
import { NoteIssueModal } from './NoteIssueModal';

export const CreditDebitNotesScreen = () => {
  const queryClient = useQueryClient();
  const [modalType, setModalType] = useState<'CREDIT' | 'DEBIT' | null>(null);

  const { data: notes, isLoading } = useQuery({
    queryKey: ['finance', 'notes'],
    queryFn: () => financeApi.getNotes()
  });

  const handleApprove = async (id: string) => {
    try {
      await financeApi.updateNoteStatus(id, 'ISSUED');
      toast.success('Note approved and issued');
      queryClient.invalidateQueries({ queryKey: ['finance', 'notes'] });
    } catch (e) {
      toast.error('Failed to approve note');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await financeApi.updateNoteStatus(id, 'VOID');
      toast.success('Note rejected');
      queryClient.invalidateQueries({ queryKey: ['finance', 'notes'] });
    } catch (e) {
      toast.error('Failed to reject note');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Credit & Debit Notes</h1>
          <p className="text-slate-500 text-sm mt-1">Manage adjustments against invoices and supplier accounts.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setModalType('DEBIT')}
            className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-slate-200 transition-colors"
          >
            <FileMinus className="h-4 w-4 mr-2" /> Issue Debit Note
          </button>
          <button 
            onClick={() => setModalType('CREDIT')}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-slate-800 transition-colors"
          >
            <FilePlus className="h-4 w-4 mr-2" /> Issue Credit Note
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2 className="h-8 w-8 text-slate-400 animate-spin" />
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-sm text-slate-500 bg-slate-50/50">
                <th className="p-4 font-medium">Note ID</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Reference</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {notes?.map((note: any) => (
                <tr key={note.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-slate-900 font-medium">{note.id.substring(0,8)}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      note.type === 'CREDIT' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {note.type}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">
                    {note.referenceType}: {note.referenceId}
                    <div className="text-xs text-slate-400 mt-0.5 truncate max-w-[200px]">{note.reason}</div>
                  </td>
                  <td className="p-4 font-medium text-slate-900">₹{note.amount.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      note.status === 'ISSUED' ? 'bg-blue-100 text-blue-700' :
                      note.status === 'VOID' ? 'bg-slate-100 text-slate-600' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {note.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {note.status === 'DRAFT' || note.status === 'PENDING_APPROVAL' ? (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleApprove(note.id)} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg" title="Approve & Issue">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleReject(note.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg" title="Reject">
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
              {(!notes || notes.length === 0) && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500">
                    No credit or debit notes issued yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalType && (
        <NoteIssueModal 
          type={modalType} 
          onClose={() => setModalType(null)}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['finance', 'notes'] });
          }}
        />
      )}
    </div>
  );
};
