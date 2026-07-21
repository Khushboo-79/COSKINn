import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hrApi } from '../../core/api/hr';
import { Clock, CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';

export const AttendanceScreen = () => {
  const queryClient = useQueryClient();
  const [selectedDate] = useState<Date>(new Date());

  const { data: employees, isLoading } = useQuery({
    queryKey: ['hr', 'employees'],
    queryFn: () => hrApi.getEmployees()
  });

  const markMutation = useMutation({
    mutationFn: ({ employeeId, status }: { employeeId: string; status: 'PRESENT' | 'ABSENT' | 'LEAVE' }) => 
      hrApi.markAttendance(employeeId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hr', 'employees'] });
    }
  });

  // For UI purposes, we'll pretend we're marking attendance for today.
  // In a real app we'd fetch the specific day's attendance records.
  // The backend markAttendance endpoint currently just inserts a record.

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Daily Attendance</h1>
          <p className="text-slate-500 text-sm mt-1">Mark and review attendance for {selectedDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-slate-300 mb-2" />
            Loading roster...
          </div>
        ) : !employees || employees.length === 0 ? (
          <div className="p-12 text-center">
            <Clock className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="font-medium text-slate-900">No employees found to mark attendance.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Mark Status (Today)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.filter((e: any) => e.status !== 'Terminated').map((emp: any) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                        {emp.avatar || emp.name.substring(0,2).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <div className="font-bold text-slate-900 text-sm">{emp.name}</div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">{emp.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-medium text-slate-700">{emp.department}</div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => markMutation.mutate({ employeeId: emp.id, status: 'PRESENT' })}
                        className="p-2 border border-slate-200 rounded-lg text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 transition-colors tooltip-trigger"
                        title="Mark Present"
                      >
                        <CheckCircle2 className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => markMutation.mutate({ employeeId: emp.id, status: 'ABSENT' })}
                        className="p-2 border border-slate-200 rounded-lg text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors tooltip-trigger"
                        title="Mark Absent"
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => markMutation.mutate({ employeeId: emp.id, status: 'LEAVE' })}
                        className="p-2 border border-slate-200 rounded-lg text-amber-600 hover:bg-amber-50 hover:border-amber-200 transition-colors tooltip-trigger"
                        title="Mark on Leave"
                      >
                        <AlertCircle className="h-5 w-5" />
                      </button>
                    </div>
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
