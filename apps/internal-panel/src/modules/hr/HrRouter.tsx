import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Users, Building2, Clock, CalendarDays, Receipt, UploadCloud, LayoutDashboard } from 'lucide-react';
import { HrDashboardScreen } from './HrDashboardScreen';
import { DepartmentManagementScreen } from './DepartmentManagementScreen';
import { EmployeeManagementScreen } from './EmployeeManagementScreen';
import { AttendanceScreen } from './AttendanceScreen';
import { LeaveManagementScreen } from './LeaveManagementScreen';
import { PayrollScreen } from './PayrollScreen';
import { EmployeeDocumentsScreen } from './EmployeeDocumentsScreen';

const HrNav = () => {
  const location = useLocation();
  
  const tabs = [
    { name: 'Dashboard', path: '/hr/dashboard', icon: LayoutDashboard },
    { name: 'Directory', path: '/hr/employees', icon: Users },
    { name: 'Departments', path: '/hr/departments', icon: Building2 },
    { name: 'Attendance', path: '/hr/attendance', icon: Clock },
    { name: 'Leaves', path: '/hr/leaves', icon: CalendarDays },
    { name: 'Payroll', path: '/hr/payroll', icon: Receipt },
    { name: 'Documents', path: '/hr/documents', icon: UploadCloud },
  ];

  return (
    <div className="flex border-b border-slate-200 bg-white mb-6 rounded-2xl shadow-sm overflow-x-auto px-2 scrollbar-hide">
      {tabs.map((tab) => {
        const isActive = location.pathname.startsWith(tab.path);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex items-center whitespace-nowrap px-4 py-4 text-sm font-medium border-b-2 transition-colors ${
              isActive
                ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50/50'
            }`}
          >
            <Icon className="h-4 w-4 mr-2" />
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
};

export const HrRouter = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 p-6 overflow-y-auto">
      <HrNav />
      <Routes>
        <Route path="/" element={<Navigate to="/hr/dashboard" replace />} />
        <Route path="/dashboard" element={<HrDashboardScreen />} />
        <Route path="/employees" element={<EmployeeManagementScreen />} />
        <Route path="/departments" element={<DepartmentManagementScreen />} />
        <Route path="/attendance" element={<AttendanceScreen />} />
        <Route path="/leaves" element={<LeaveManagementScreen />} />
        <Route path="/payroll" element={<PayrollScreen />} />
        <Route path="/documents" element={<EmployeeDocumentsScreen />} />
        <Route path="*" element={<Navigate to="/hr/dashboard" replace />} />
      </Routes>
    </div>
  );
};
