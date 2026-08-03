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
              key={tab.name || tab.path}
              to={tab.path}
              className={`flex items-center whitespace-nowrap px-5 py-4 text-sm font-bold border-b-2 transition-all duration-300 ease-out active:scale-95 ${
                isActive
                  ? 'border-[#FF7F50] text-[#FF7F50] bg-gradient-to-t from-[#FF7F50]/10 to-transparent shadow-[inset_0_-2px_4px_rgba(255,127,80,0.1)]'
                  : 'border-transparent text-slate-500 hover:text-[#FF7F50] hover:bg-gradient-to-t hover:from-[#FF7F50]/5 hover:to-transparent'
              }`}
            >
              <Icon className={`h-4 w-4 mr-2.5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-6'}`} />
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
