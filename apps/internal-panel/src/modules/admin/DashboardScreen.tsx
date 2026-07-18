import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Users, Briefcase, TrendingUp, DollarSign, Activity, AlertCircle } from 'lucide-react';

export default function DashboardScreen() {
  const { data: hrOverview, isLoading: isHrLoading } = useQuery({
    queryKey: ['hr-overview'],
    queryFn: async () => {
      const res = await api.get('/admin/hr/overview');
      return res.data;
    }
  });

  const { data: financeOverview, isLoading: isFinanceLoading } = useQuery({
    queryKey: ['finance-overview'],
    queryFn: async () => {
      const res = await api.get('/admin/finance/overview');
      return res.data;
    }
  });

  if (isHrLoading || isFinanceLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF0069]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Master Overview</h2>
        <p className="text-slate-500 mt-1">Live metrics across HR and Finance modules.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <DollarSign size={80} className="text-[#FF0069]" />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <TrendingUp className="text-green-600" size={20} />
            </div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Revenue</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">
            ₹{(financeOverview?.revenue || 0).toLocaleString()}
          </p>
          <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
            <span>{financeOverview?.revenueTrend || '+0%'} from last month</span>
          </div>
        </div>

        {/* Profit Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity size={80} className="text-[#FF0069]" />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <DollarSign className="text-blue-600" size={20} />
            </div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Net Profit</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">
            ₹{(financeOverview?.profit || 0).toLocaleString()}
          </p>
          <div className="mt-4 flex items-center text-sm text-blue-600 font-medium">
            <span>{financeOverview?.profitTrend || '+0%'} from last month</span>
          </div>
        </div>

        {/* Employees Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users size={80} className="text-[#FF0069]" />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <Users className="text-purple-600" size={20} />
            </div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Headcount</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">
            {hrOverview?.totalEmployees || 0}
          </p>
          <div className="mt-4 flex items-center text-sm text-slate-500 font-medium">
            <span>{hrOverview?.activeToday || 0} active today</span>
          </div>
        </div>

        {/* Leaves Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Briefcase size={80} className="text-[#FF0069]" />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
              <AlertCircle className="text-orange-600" size={20} />
            </div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Leave Requests</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800">
            {hrOverview?.pendingLeaveRequests || 0}
          </p>
          <div className="mt-4 flex items-center text-sm text-orange-600 font-medium">
            <span>Pending approvals required</span>
          </div>
        </div>
      </div>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Finance Snapshot */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Finance Snapshot</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50">
              <span className="text-slate-600">Pending Payments (COD)</span>
              <span className="font-semibold text-slate-800">₹{(financeOverview?.pendingPayments || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50">
              <span className="text-slate-600">Refunds Processed</span>
              <span className="font-semibold text-slate-800">₹{(financeOverview?.refunds || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50">
              <span className="text-slate-600">Tax Liability (GST)</span>
              <span className="font-semibold text-slate-800">₹{(financeOverview?.taxes || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* HR Snapshot */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">HR Snapshot</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50">
              <span className="text-slate-600">Total Monthly Payroll</span>
              <span className="font-semibold text-slate-800">₹{(hrOverview?.totalPayroll || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50">
              <span className="text-slate-600">Active Departments</span>
              <span className="font-semibold text-slate-800">{hrOverview?.departments || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50">
              <span className="text-slate-600">Employees on Leave</span>
              <span className="font-semibold text-slate-800">{hrOverview?.onLeave || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
