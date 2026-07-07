import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PanelHeader from '../../components/PanelHeader';
import StatCard from '../../components/StatCard';
import { Users, UserPlus, Calendar,  Wallet,
  Search,  Mail,  
  CheckCircle2, XCircle, AlertCircle, Building2,
  Award,   
   Download } from 'lucide-react';

const useHROverview = () => useQuery({
  queryKey: ['hrOverview'],
  queryFn: async () => ({
    totalEmployees: 42,
    activeToday: 38,
    onLeave: 4,
    pendingLeaveRequests: 6,
    newHiresThisMonth: 3,
    totalPayroll: 18_50_000,
    departments: 6,
    avgTenure: '2.4 years',
  })
});

const useEmployees = () => useQuery({
  queryKey: ['employees'],
  queryFn: async () => ([
    { id: 'EMP-001', name: 'Priya Sharma', email: 'priya@coskinn.com', phone: '+91 98765 43210', role: 'Senior Developer', department: 'Engineering', joinDate: '2024-03-15', status: 'Active', leaveBalance: 12, avatar: 'PS' },
    { id: 'EMP-002', name: 'Rahul Verma', email: 'rahul@coskinn.com', phone: '+91 98765 43211', role: 'Product Manager', department: 'Product', joinDate: '2024-01-10', status: 'Active', leaveBalance: 8, avatar: 'RV' },
    { id: 'EMP-003', name: 'Anita Desai', email: 'anita@coskinn.com', phone: '+91 98765 43212', role: 'UI/UX Designer', department: 'Design', joinDate: '2024-06-01', status: 'On Leave', leaveBalance: 15, avatar: 'AD' },
    { id: 'EMP-004', name: 'Vikram Patel', email: 'vikram@coskinn.com', phone: '+91 98765 43213', role: 'Marketing Lead', department: 'Marketing', joinDate: '2023-11-20', status: 'Active', leaveBalance: 6, avatar: 'VP' },
    { id: 'EMP-005', name: 'Meera Joshi', email: 'meera@coskinn.com', phone: '+91 98765 43214', role: 'Supply Chain Manager', department: 'Operations', joinDate: '2023-08-05', status: 'Active', leaveBalance: 10, avatar: 'MJ' },
    { id: 'EMP-006', name: 'Karan Singh', email: 'karan@coskinn.com', phone: '+91 98765 43215', role: 'Customer Support Lead', department: 'Support', joinDate: '2024-02-28', status: 'Active', leaveBalance: 14, avatar: 'KS' },
    { id: 'EMP-007', name: 'Sonal Gupta', email: 'sonal@coskinn.com', phone: '+91 98765 43216', role: 'HR Manager', department: 'HR', joinDate: '2023-06-15', status: 'Active', leaveBalance: 9, avatar: 'SG' },
    { id: 'EMP-008', name: 'Deepak Nair', email: 'deepak@coskinn.com', phone: '+91 98765 43217', role: 'Backend Developer', department: 'Engineering', joinDate: '2025-01-10', status: 'On Leave', leaveBalance: 18, avatar: 'DN' },
  ])
});

const useLeaveRequests = () => useQuery({
  queryKey: ['leaveRequests'],
  queryFn: async () => ([
    { id: 'LV-101', employee: 'Anita Desai', department: 'Design', type: 'Sick Leave', from: '2026-07-06', to: '2026-07-08', days: 3, status: 'Pending', reason: 'Medical appointment and recovery' },
    { id: 'LV-102', employee: 'Deepak Nair', department: 'Engineering', type: 'Casual Leave', from: '2026-07-07', to: '2026-07-07', days: 1, status: 'Approved', reason: 'Personal work' },
    { id: 'LV-103', employee: 'Vikram Patel', department: 'Marketing', type: 'Vacation', from: '2026-07-15', to: '2026-07-22', days: 6, status: 'Pending', reason: 'Family vacation' },
    { id: 'LV-104', employee: 'Priya Sharma', department: 'Engineering', type: 'Work From Home', from: '2026-07-08', to: '2026-07-09', days: 2, status: 'Pending', reason: 'Internet installation at new apartment' },
    { id: 'LV-105', employee: 'Meera Joshi', department: 'Operations', type: 'Sick Leave', from: '2026-07-03', to: '2026-07-04', days: 2, status: 'Approved', reason: 'Fever' },
    { id: 'LV-106', employee: 'Karan Singh', department: 'Support', type: 'Casual Leave', from: '2026-07-10', to: '2026-07-10', days: 1, status: 'Rejected', reason: 'High workload period' },
  ])
});

const usePayrollSummary = () => useQuery({
  queryKey: ['payrollSummary'],
  queryFn: async () => ([
    { department: 'Engineering', headcount: 12, totalCTC: 7_20_000, avgSalary: 60_000 },
    { department: 'Product', headcount: 4, totalCTC: 2_80_000, avgSalary: 70_000 },
    { department: 'Design', headcount: 5, totalCTC: 2_75_000, avgSalary: 55_000 },
    { department: 'Marketing', headcount: 8, totalCTC: 4_00_000, avgSalary: 50_000 },
    { department: 'Operations', headcount: 6, totalCTC: 3_00_000, avgSalary: 50_000 },
    { department: 'Support', headcount: 7, totalCTC: 2_80_000, avgSalary: 40_000 },
  ])
});

export default function HRPanel() {
  const [activeTab, setActiveTab] = useState<'directory' | 'leave' | 'payroll'>('directory');
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const { data: overview, isLoading: overviewLoading } = useHROverview();
  const { data: employees } = useEmployees();
  const { data: leaveRequests } = useLeaveRequests();
  const { data: payroll } = usePayrollSummary();

  const tabs = [
    { key: 'directory' as const, label: 'Employee Directory', icon: Users },
    { key: 'leave' as const, label: 'Leave Management', icon: Calendar },
    { key: 'payroll' as const, label: 'Payroll Overview', icon: Wallet },
  ];

  const departments = ['All', ...new Set(employees?.map(e => e.department) || [])];

  const filteredEmployees = employees?.filter(e => {
    const matchSearch = !searchTerm || e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.email.toLowerCase().includes(searchTerm.toLowerCase()) || e.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = deptFilter === 'All' || e.department === deptFilter;
    return matchSearch && matchDept;
  });

  return (
    <div className="space-y-6 p-4 overflow-y-auto h-full">
      <PanelHeader
        title="Human Resources"
        subtitle="Employee directory, leave tracking, and payroll"
        icon={Users}
        actionLabel="Add Employee"
        onAction={() => alert('Add employee (coming soon)')}
        actionIcon={UserPlus}
      />

      {/* KPI Cards */}
      {overviewLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-28 rounded-2xl bg-white/40 animate-pulse" />)}
        </div>
      ) : overview && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Employees" value={overview.totalEmployees} icon={Users} />
          <StatCard label="Active Today" value={overview.activeToday} icon={CheckCircle2} />
          <StatCard label="On Leave" value={overview.onLeave} icon={Calendar} />
          <StatCard label="Pending Requests" value={overview.pendingLeaveRequests} icon={AlertCircle} />
        </div>
      )}

      {/* Department quick stats */}
      {overview && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard label="New Hires This Month" value={overview.newHiresThisMonth} icon={UserPlus} />
          <StatCard label="Monthly Payroll" value={overview.totalPayroll} icon={Wallet} prefix="₹" />
          <StatCard label="Avg Tenure" value={overview.avgTenure} icon={Award} />
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-0">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all duration-200 ${
                activeTab === tab.key
                  ? 'border-[#FF0069] text-[#FF0069]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Employee Directory Tab */}
      {activeTab === 'directory' && (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or role..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#FF0069]/30 focus:border-[#FF0069] outline-none"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#FF0069]/30 focus:border-[#FF0069] outline-none bg-white"
            >
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredEmployees?.map(emp => (
              <div key={emp.id} className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF0069] to-[#FFD498] flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">
                    {emp.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-gray-900 group-hover:text-[#FF0069] transition-colors">{emp.name}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        emp.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {emp.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{emp.role}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {emp.department}</span>
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {emp.email}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Joined {emp.joinDate}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-[#FF0069]">{emp.leaveBalance}</p>
                    <p className="text-xs text-gray-400">leave days</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Leave Management Tab */}
      {activeTab === 'leave' && leaveRequests && (
        <div className="space-y-3">
          {leaveRequests.map(req => (
            <div key={req.id} className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900">{req.employee}</h4>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{req.department}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      req.type === 'Sick Leave' ? 'bg-red-100 text-red-700' :
                      req.type === 'Vacation' ? 'bg-blue-100 text-blue-700' :
                      req.type === 'Work From Home' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {req.type}
                    </span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {req.from} → {req.to}</span>
                    <span className="font-semibold">{req.days} day{req.days > 1 ? 's' : ''}</span>
                  </div>
                  <p className="text-xs text-gray-500">Reason: {req.reason}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {req.status === 'Pending' ? (
                    <>
                      <button className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Reject
                      </button>
                    </>
                  ) : (
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                      req.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {req.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payroll Tab */}
      {activeTab === 'payroll' && payroll && (
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Department-wise Payroll</h3>
            <button className="flex items-center gap-2 text-sm text-[#FF0069] hover:underline font-semibold">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/60">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Department</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Headcount</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Total CTC (Monthly)</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Avg Salary</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Distribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payroll.map(dept => {
                  const maxCTC = Math.max(...payroll.map(d => d.totalCTC));
                  const pct = Math.round((dept.totalCTC / maxCTC) * 100);
                  return (
                    <tr key={dept.department} className="hover:bg-white/60 transition-colors">
                      <td className="px-5 py-3.5 text-sm font-semibold text-gray-900 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#FF0069]" />
                        {dept.department}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-center font-semibold text-gray-700">{dept.headcount}</td>
                      <td className="px-5 py-3.5 text-sm text-right font-bold text-gray-900">₹{dept.totalCTC.toLocaleString('en-IN')}</td>
                      <td className="px-5 py-3.5 text-sm text-right text-gray-600">₹{dept.avgSalary.toLocaleString('en-IN')}</td>
                      <td className="px-5 py-3.5">
                        <div className="w-full max-w-[120px] h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#FF0069] to-[#FFD498] transition-all duration-700"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50/60 border-t-2 border-gray-200">
                  <td className="px-5 py-3 text-sm font-bold text-gray-900">Total</td>
                  <td className="px-5 py-3 text-sm text-center font-bold text-gray-900">{payroll.reduce((a, b) => a + b.headcount, 0)}</td>
                  <td className="px-5 py-3 text-sm text-right font-bold text-[#FF0069]">₹{payroll.reduce((a, b) => a + b.totalCTC, 0).toLocaleString('en-IN')}</td>
                  <td className="px-5 py-3 text-sm text-right text-gray-600">—</td>
                  <td className="px-5 py-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
