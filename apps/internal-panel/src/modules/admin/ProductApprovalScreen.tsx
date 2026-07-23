import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { adminApi } from '../../core/api/admin';
import { ApprovalGate } from '../../components/ui/ApprovalGate';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export const ProductApprovalScreen = () => {
  const [rejectReason, setRejectReason] = useState('');
  const [rejectingId, setRejectingId] = useState<string | null>(null);

  const { data: pendingApprovals = [
    { 
      id: 'prod_1', 
      type: 'Product',
      title: 'Vitamin C Face Wash', 
      status: 'pending', 
      requestedBy: 'Jane (Product Manager)',
      cosmeticsRules: {
        manufacturerName: 'SkinCrafters Ltd',
        manufacturerAddress: '123 Beauty Park, Mumbai, India',
        countryOfOrigin: 'India',
        netQuantity: '100ml',
        mfgDate: '10/2025',
        expiryDate: '10/2027',
        batchNumber: 'BT-1002A'
      }
    },
  ], refetch } = useQuery({
    queryKey: ['pendingApprovals'],
    queryFn: adminApi.getPendingApprovals,
    retry: false,
  });

  const [approvingId, setApprovingId] = useState<string | null>(null);

  const approveMutation = useMutation({
    mutationFn: (id: string) => adminApi.approveProduct(id),
    onSuccess: () => {
      toast.success('Product approved successfully.');
      setApprovingId(null);
      refetch();
    },
    onError: (err: any) => {
      toast.error(`Error: ${err.response?.data?.message || err.message}`);
      setApprovingId(null);
    }
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string, reason: string }) => adminApi.rejectProduct(id, { reason }),
    onSuccess: () => {
      toast.success('Product rejected successfully.');
      setRejectingId(null);
      setRejectReason('');
      refetch();
    },
    onError: (err: any) => {
      toast.error(`Error: ${err.response?.data?.message || err.message}`);
    }
  });

  const handleApprove = (id: string) => {
    setApprovingId(id);
  };

  const submitApprove = () => {
    if (approvingId) {
      approveMutation.mutate(approvingId);
    }
  };

  const handleReject = (id: string) => {
    setRejectingId(id);
  };

  const submitReject = () => {
    if (rejectingId && rejectReason.trim()) {
      rejectMutation.mutate({ id: rejectingId, reason: rejectReason });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-primary-500" />
          Approval Queue
        </h1>
        <p className="text-slate-500 mt-1">Review and approve Brands, Categories, and Products before they go live.</p>
      </div>

      <div className="space-y-4">
        {pendingApprovals.map((item: any) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <ApprovalGate 
              status={item.status} 
              title={`${item.type}: ${item.title}`} 
              description={`Requested by ${item.requestedBy}`}
              hasPermissionToApprove={true}
              onApprove={() => handleApprove(item.id)}
              onReject={() => handleReject(item.id)}
            />
            
            {/* Cosmetics Rules 2020 Compliance Summary */}
            {item.cosmeticsRules && (
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <h4 className="text-sm font-semibold text-slate-800">Cosmetics Rules 2020 Compliance Summary</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">Manufacturer</span>
                    <span className="block text-sm text-slate-900">{item.cosmeticsRules.manufacturerName}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">Address</span>
                    <span className="block text-sm text-slate-900">{item.cosmeticsRules.manufacturerAddress}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">Country of Origin</span>
                    <span className="block text-sm text-slate-900">{item.cosmeticsRules.countryOfOrigin}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">Net Quantity</span>
                    <span className="block text-sm text-slate-900">{item.cosmeticsRules.netQuantity}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">Mfg / Expiry Date</span>
                    <span className="block text-sm text-slate-900">{item.cosmeticsRules.mfgDate} / {item.cosmeticsRules.expiryDate}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">Batch Number</span>
                    <span className="block text-sm text-slate-900">{item.cosmeticsRules.batchNumber}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Approval Form Inline */}
            {approvingId === item.id && (
              <div className="p-4 border-t border-slate-200 bg-emerald-50 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-emerald-800">Are you sure you want to approve this product? It will go live immediately.</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setApprovingId(null)}
                    className="px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={submitApprove}
                    disabled={approveMutation.isPending}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-50"
                  >
                    Confirm Approve
                  </button>
                </div>
              </div>
            )}

            {/* Rejection Form Inline */}
            {rejectingId === item.id && (
              <div className="p-4 border-t border-slate-200 bg-red-50 flex gap-3">
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Reason for rejection (mandatory)..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="flex-1 px-3 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm"
                />
                <button 
                  onClick={() => setRejectingId(null)}
                  className="px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg text-sm font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={submitReject}
                  disabled={!rejectReason.trim()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50"
                >
                  Confirm Reject
                </button>
              </div>
            )}
          </div>
        ))}
        {pendingApprovals.length === 0 && (
          <div className="p-8 text-center bg-white rounded-2xl shadow-sm border border-slate-200">
            <CheckCircle className="h-10 w-10 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-900">All caught up!</h3>
            <p className="text-slate-500">There are no pending approvals at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
};
