import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../../core/api/orders';
import { RefreshCcw, Search, CheckCircle, XCircle, AlertCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ReturnListScreen = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const { data: returns, isLoading } = useQuery({
    queryKey: ['admin', 'returns', filter],
    queryFn: () => orderApi.getAllReturns(filter || undefined),
  });

  const processMutation = useMutation({
    mutationFn: (data: { id: string, status: 'APPROVED' | 'REJECTED', notes: string }) => 
      orderApi.processReturn(data.id, { status: data.status, adminNotes: data.notes }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'returns'] });
      setProcessingId(null);
    },
    onError: (err: any) => {
      alert(`Error processing return: ${err.response?.data?.message || err.message}`);
      setProcessingId(null);
    }
  });

  const handleProcess = (id: string, status: 'APPROVED' | 'REJECTED') => {
    const notes = prompt(`Please enter a reason/note for marking this return as ${status}:`);
    if (notes === null) return; // User cancelled prompt
    
    setProcessingId(id);
    processMutation.mutate({ id, status, notes });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Returns & QC Queue</h1>
          <p className="text-slate-500 text-sm mt-1">Review and process customer return requests.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <RefreshCcw className="h-4 w-4 text-slate-400" />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none bg-white appearance-none"
          >
            <option value="">All Statuses</option>
            <option value="REQUESTED">Pending Review (REQUESTED)</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="RECEIVED">Warehouse Received</option>
            <option value="QC_PASSED">QC Passed</option>
            <option value="QC_FAILED">QC Failed</option>
          </select>
        </div>
      </div>

      {/* Data List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Order & Item</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p>Loading return requests...</p>
                    </div>
                  </td>
                </tr>
              ) : !returns || returns.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-slate-500 bg-slate-50">
                    <RefreshCcw className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <p className="text-lg font-medium text-slate-700">No return requests found</p>
                  </td>
                </tr>
              ) : (
                returns.map((req: any) => (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900 mb-1">
                        <Link to={`/orders/${req.orderId}`} className="hover:text-primary-600">
                          Order #{req.orderId.slice(-8).toUpperCase()}
                        </Link>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center">
                        <FileText className="h-3 w-3 mr-1" />
                        Item ID: {req.orderItemId.slice(-8)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900 font-medium">{req.reason.replace(/_/g, ' ')}</div>
                      {req.customerComments && (
                        <div className="text-xs text-slate-500 mt-1 max-w-xs truncate" title={req.customerComments}>
                          "{req.customerComments}"
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        req.status === 'REQUESTED' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        req.status === 'APPROVED' ? 'bg-amber-100 text-amber-800 border-amber-200' : // Approved means waiting for warehouse
                        req.status === 'QC_PASSED' ? 'bg-green-100 text-green-800 border-green-200' :
                        req.status === 'QC_FAILED' || req.status === 'REJECTED' ? 'bg-red-100 text-red-800 border-red-200' :
                        'bg-slate-100 text-slate-800 border-slate-200'
                      }`}>
                        {req.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {req.status === 'REQUESTED' && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleProcess(req.id, 'APPROVED')}
                            disabled={processingId === req.id}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-200 disabled:opacity-50"
                            title="Approve Return (Send to Warehouse QC)"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleProcess(req.id, 'REJECTED')}
                            disabled={processingId === req.id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200 disabled:opacity-50"
                            title="Reject Request"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                      
                      {/* Readonly states for post-approval */}
                      {req.status !== 'REQUESTED' && (
                        <span className="text-xs text-slate-400">Processed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
