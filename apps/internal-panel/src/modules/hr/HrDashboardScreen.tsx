import { useQuery } from '@tanstack/react-query';
import { hrApi } from '../../core/api/hr';
import { Users, Building2, UserMinus, CalendarClock, Loader2, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HrDashboardScreen = () => {
  const { data: overview, isLoading } = useQuery({
    queryKey: ['hr', 'overview'],
    queryFn: () => hrApi.getOverview()
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-slate-300 mr-3" />
        Loading HR Overview...
      </div>
    );
  }

  if (!overview) return null;

  const statCards = [
    { label: 'Total Employees', value: overview.totalEmployees, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', link: '/hr/employees' },
    { label: 'Total Departments', value: overview.departments, icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-50', link: '/hr/departments' },
    { label: 'On Leave Today', value: overview.onLeave, icon: UserMinus, color: 'text-amber-600', bg: 'bg-amber-50', link: '/hr/attendance' },
    { label: 'Pending Leaves', value: overview.pendingLeaveRequests, icon: CalendarClock, color: 'text-rose-600', bg: 'bg-rose-50', link: '/hr/leaves' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">HR Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">High-level overview of headcount, payroll, and daily attendance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <Link key={idx} to={stat.link} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer block">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Payroll Summary Widget */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Monthly Payroll Estimate</h3>
            <Link to="/hr/payroll" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Details</Link>
          </div>
          <div className="flex items-center justify-center p-8 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-center">
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">Total Monthly CTC</p>
              <div className="text-4xl font-black text-slate-900 flex items-center justify-center">
                <IndianRupee className="h-8 w-8 mr-1 text-slate-400" />
                {overview.totalPayroll.toLocaleString()}
              </div>
              <p className="text-sm text-slate-500 mt-2">Across all {overview.departments} departments</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/hr/employees" className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-colors text-center group">
              <Users className="h-8 w-8 text-slate-400 group-hover:text-indigo-600 mb-3" />
              <span className="font-medium text-slate-900 text-sm">Add Employee</span>
            </Link>
            <Link to="/hr/leaves" className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-colors text-center group">
              <CalendarClock className="h-8 w-8 text-slate-400 group-hover:text-indigo-600 mb-3" />
              <span className="font-medium text-slate-900 text-sm">Approve Leaves</span>
              {overview.pendingLeaveRequests > 0 && (
                <span className="mt-2 text-xs font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">{overview.pendingLeaveRequests} Pending</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
