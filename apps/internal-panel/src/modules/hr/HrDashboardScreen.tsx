import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Users, CheckCircle, XCircle, Search } from 'lucide-react';

export default function HrDashboardScreen() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'employees' | 'leaves'>('employees');

  const { data: employees, isLoading: isEmployeesLoading } = useQuery({
    queryKey: ['hr-employees'],
    queryFn: async () => {
      const res = await api.get('/admin/hr/employees');
      return res.data;
    }
  });

  const { data: leaves, isLoading: isLeavesLoading } = useQuery({
    queryKey: ['hr-leaves'],
    queryFn: async () => {
      const res = await api.get('/admin/hr/leaves');
      return res.data;
    }
  });

  const updateLeaveStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'Approved' | 'Rejected' }) => {
      await api.post(`/admin/hr/leaves/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hr-leaves'] });
      queryClient.invalidateQueries({ queryKey: ['hr-employees'] });
    }
  });

  const seedMutation = useMutation({
    mutationFn: async () => {
      await api.post('/admin/hr/seed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hr-employees'] });
      queryClient.invalidateQueries({ queryKey: ['hr-leaves'] });
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">HR Management</h2>
          <p className="text-slate-500 mt-1">Manage employees and leave requests.</p>
        </div>
        <button 
          onClick={() => seedMutation.mutate()}
          disabled={seedMutation.isPending}
          className="bg-[#FF0069] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#D90059] transition-colors disabled:opacity-50"
        >
          {seedMutation.isPending ? 'Seeding...' : 'Seed Sample Data'}
        </button>
      </div>

      <div className="flex gap-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('employees')}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'employees' 
              ? 'border-[#FF0069] text-[#FF0069]' 
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Employee Directory
        </button>
        <button
          onClick={() => setActiveTab('leaves')}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'leaves' 
              ? 'border-[#FF0069] text-[#FF0069]' 
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Leave Requests
        </button>
      </div>

      {activeTab === 'employees' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search employees..." 
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF0069]/20"
              />
            </div>
          </div>
          {isEmployeesLoading ? (
            <div className="p-8 text-center text-slate-500">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-medium">
                  <tr>
                    <th className="px-6 py-4">Employee</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Salary</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {employees?.map((emp: any) => (
                    <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                            {emp.avatar || emp.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">{emp.name}</p>
                            <p className="text-xs text-slate-500">{emp.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{emp.role}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">₹{emp.salary.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                          emp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {emp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {employees?.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                        No employees found. Try seeding some data.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'leaves' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {isLeavesLoading ? (
            <div className="p-8 text-center text-slate-500">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-medium">
                  <tr>
                    <th className="px-6 py-4">Employee</th>
                    <th className="px-6 py-4">Leave Type</th>
                    <th className="px-6 py-4">Duration</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leaves?.map((leave: any) => (
                    <tr key={leave.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-800">{leave.employee?.name || 'Unknown'}</p>
                        <p className="text-xs text-slate-500">{leave.reason}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{leave.type}</td>
                      <td className="px-6 py-4 text-slate-600">
                        {new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}
                        <span className="ml-2 text-xs text-slate-400">({leave.days} days)</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                          leave.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                          leave.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {leave.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {leave.status === 'Pending' && (
                          <>
                            <button 
                              onClick={() => updateLeaveStatus.mutate({ id: leave.id, status: 'Approved' })}
                              className="text-green-600 hover:bg-green-50 p-1.5 rounded-md transition-colors"
                              title="Approve"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button 
                              onClick={() => updateLeaveStatus.mutate({ id: leave.id, status: 'Rejected' })}
                              className="text-red-600 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                              title="Reject"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                  {leaves?.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                        No leave requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
