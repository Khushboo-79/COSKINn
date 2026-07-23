import { toast } from 'sonner';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../../../core/api/orders';
import { X, Save, Loader2, AlertTriangle } from 'lucide-react';

interface CancelOrderModalProps {
  orderId: string;
  onClose: () => void;
}

export const CancelOrderModal = ({ orderId, onClose }: CancelOrderModalProps) => {
  const queryClient = useQueryClient();
  const [reason, setReason] = useState('');

  const mutation = useMutation({
    mutationFn: (data: { reason: string }) => {
      return orderApi.adminCancelOrder(orderId, data.reason);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'order', orderId] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      onClose();
    },
    onError: (err: any) => {
      toast.error();
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      toast("Cancellation reason is required.");
      return;
    }
    mutation.mutate({ reason: reason.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-red-600 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Cancel Order
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-slate-600">
            Are you sure you want to cancel this order? This action will immediately release the reserved inventory stock.
          </p>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Reason for Cancellation <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              rows={3}
              placeholder="e.g., Customer requested cancellation via support..."
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 font-medium rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={mutation.isPending || !reason.trim()}
              className="px-6 py-2 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors shadow-sm flex items-center disabled:opacity-50"
            >
              {mutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Confirm Cancellation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
