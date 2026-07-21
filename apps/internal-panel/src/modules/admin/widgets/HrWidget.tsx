import { useQuery } from '@tanstack/react-query';
import { hrApi } from '../../../core/api/hr';
import { Users, UserCheck, CalendarClock, IndianRupee, Loader2 } from 'lucide-react';

export const HrWidget = () => {
  const { data: hrOverview, isLoading } = useQuery({
    queryKey: ['admin', 'hr-overview-widget'],
    queryFn: () => hrApi.getOverview()
  });

  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-slate-300 mb-2" />
        <span className="text-slate-500 text-sm">Loading HR data...</span>
      </div>
    );
  }

  const activeEmployees = (hrOverview?.totalEmployees || 0) - (hrOverview?.onLeave || 0);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-bold text-slate-900 flex items-center">
            <Users className="h-5 w-5 mr-2 text-cyan-600" />
            Human Resources
          </h3>
          <p className="text-xs text-slate-500 mt-1">Headcount and payroll summary</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-1">Total Headcount</p>
          <div className="flex items-end">
            <span className="text-2xl font-black text-slate-900">{hrOverview?.totalEmployees || 0}</span>
          </div>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-1">On Leave Today</p>
          <div className="flex items-end">
            <span className="text-2xl font-black text-rose-600">{hrOverview?.onLeave || 0}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center">
            <UserCheck className="h-3.5 w-3.5 mr-1.5 text-emerald-500" /> Workforce Status
          </h4>
          <div className="flex items-center justify-between text-sm p-2 bg-slate-50 rounded border border-slate-100">
            <span className="text-slate-600">Active & Present</span>
            <span className="font-medium text-slate-900">{activeEmployees} employees</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center">
            <IndianRupee className="h-3.5 w-3.5 mr-1.5 text-slate-500" /> Est. Monthly Payroll
          </h4>
          <div className="flex items-center justify-between text-sm p-2 bg-emerald-50 rounded border border-emerald-100">
            <span className="text-emerald-700 font-medium">Total CTC</span>
            <span className="font-black text-emerald-700">₹{hrOverview?.totalPayroll?.toLocaleString() || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
