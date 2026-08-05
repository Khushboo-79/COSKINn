import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { financeApi } from '../../core/api/finance';

interface NoteIssueModalProps {
  type: 'CREDIT' | 'DEBIT';
  onClose: () => void;
  onSuccess: () => void;
}

export const NoteIssueModal: React.FC<NoteIssueModalProps> = ({ type, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    referenceType: 'ORDER',
    referenceId: '',
    amount: '',
    reason: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.referenceId || !formData.amount || !formData.reason) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await financeApi.createNote(
        type,
        formData.referenceType,
        formData.referenceId,
        parseFloat(formData.amount),
        formData.reason
      );
      toast.success(type + ' Note submitted for approval');
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to create note');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Issue {type} Note</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reference Type</label>
            <select
              value={formData.referenceType}
              onChange={(e) => setFormData({ ...formData, referenceType: e.target.value })}
              className="w-full border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none"
            >
              <option value="ORDER">Customer Order</option>
              <option value="PURCHASE_ORDER">Purchase Order (Supplier)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reference ID</label>
            <input
              type="text"
              placeholder="e.g. ORD-1234 or PO-9876"
              value={formData.referenceId}
              onChange={(e) => setFormData({ ...formData, referenceId: e.target.value })}
              className="w-full border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Amount (₹)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
            <textarea
              placeholder="Explain the reason for this adjustment..."
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none min-h-[80px]"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors flex items-center"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Submit for Approval'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
