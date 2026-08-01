import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hrApi } from '../../core/api/hr';
import { CalendarDays, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export const LeaveManagementScreen = () => {
  const queryClient = useQueryClient();

  const { data: leaves, isLoading } = useQuery({
    queryKey: ['hr', 'leaves'],
    queryFn: () => hrApi.getLeaveRequests()
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'Approved' | 'Rejected' }) => 
      hrApi.updateLeaveStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hr', 'leaves'] });
      queryClient.invalidateQueries({ queryKey: ['hr', 'employees'] });
    }
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leave Management</h1>
          <p className="text-slate-500 text-sm mt-1">Review and manage employee leave requests.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-slate-300 mb-2" />
            Loading leave requests...
          </div>
        ) : !leaves || leaves.length === 0 ? (
          <div className="p-12 text-center">
            <CalendarDays className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="font-medium text-slate-900">No leave requests found.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Leave Details</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Duration</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leaves.map((leave: any) => (
                <tr key={leave.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0">
                        {leave.employee?.avatar || leave.employee?.name.substring(0,2).toUpperCase() || 'NA'}
                      </div>
                      <div className="ml-4">
                        <div className="font-bold text-slate-900">{leave.employee?.name || 'Unknown Employee'}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{leave.employee?.department || 'Unknown'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-medium text-slate-900">{leave.type}</div>
                    {leave.reason && (
                      <div className="text-xs text-slate-500 mt-1 max-w-[200px] truncate" title={leave.reason}>
                        {leave.reason}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-slate-900 font-medium">{leave.days} Day{leave.days > 1 ? 's' : ''}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {format(new Date(leave.fromDate), 'MMM d, yyyy')} - {format(new Date(leave.toDate), 'MMM d, yyyy')}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {leave.status === 'Approved' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Approved
                      </span>
                    ) : leave.status === 'Rejected' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                        Rejected
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        <Clock className="h-3 w-3 mr-1" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {leave.status === 'Pending' && (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => updateMutation.mutate({ id: leave.id, status: 'Approved' })}
                          className="px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors flex items-center"
                        >
                          <CheckCircle className="h-3.5 w-3.5 mr-1" /> Approve
                        </button>
                        <button
                          onClick={() => updateMutation.mutate({ id: leave.id, status: 'Rejected' })}
                          className="px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors flex items-center"
                        >
                          <XCircle className="h-3.5 w-3.5 mr-1" /> Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
