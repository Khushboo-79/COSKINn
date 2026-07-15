import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

const useLeaveRequests = () => useQuery({
  queryKey: ['leaveRequests'],
  queryFn: async () => {
    const { data } = await api.get('/admin/hr/leaves');
    return data;
  }
});

export const LeavesScreen = () => {
  const queryClient = useQueryClient();
  const { data: leaveRequests, isLoading } = useLeaveRequests();

  const updateLeaveStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: 'Approved' | 'Rejected' }) => {
      await api.post(`/admin/hr/leaves/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaveRequests'] });
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: '"Expletus Sans", sans-serif' }}>Leave Management</h2>
          <p className="text-sm text-slate-500">Review and approve employee leave requests.</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white rounded-2xl shadow-sm border border-rose-100 p-6">
        {isLoading ? (
          <div className="text-center text-rose-500">Loading Leaves...</div>
        ) : (
          <div className="space-y-4 max-w-4xl">
            {leaveRequests?.map((req: any) => (
              <div key={req.id} className="bg-white rounded-xl p-5 border border-rose-100 shadow-sm flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-slate-800">{req.employee.name}</h3>
                    <span className="px-2 py-0.5 bg-rose-50 text-brand text-xs font-bold rounded-md">
                      {req.type}
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-md ${
                      req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                      req.status === 'Rejected' ? 'bg-red-50 text-red-600' :
                      'bg-orange-50 text-orange-600'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}
                  </p>
                  {req.reason && <p className="text-sm text-slate-600 mt-2 italic">"{req.reason}"</p>}
                </div>
                
                {req.status === 'Pending' && (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateLeaveStatus.mutate({ id: req.id, status: 'Approved' })}
                      disabled={updateLeaveStatus.isPending}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-1 disabled:opacity-50"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Approve
                    </button>
                    <button 
                      onClick={() => updateLeaveStatus.mutate({ id: req.id, status: 'Rejected' })}
                      disabled={updateLeaveStatus.isPending}
                      className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors flex items-center gap-1 disabled:opacity-50"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
            {(!leaveRequests || leaveRequests.length === 0) && (
              <div className="text-center text-slate-500 py-10 border-2 border-dashed border-slate-200 rounded-xl">
                No leave requests found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
