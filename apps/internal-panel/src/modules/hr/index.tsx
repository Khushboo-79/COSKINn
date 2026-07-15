import { Routes, Route, Navigate } from 'react-router-dom';
import { HRDashboardScreen } from './screens/HRDashboardScreen';
import { EmployeesScreen } from './screens/EmployeesScreen';
import { AttendanceScreen } from './screens/AttendanceScreen';
import { LeavesScreen } from './screens/LeavesScreen';
import { PayrollScreen } from './screens/PayrollScreen';
import { PerformanceScreen } from './screens/PerformanceScreen';
import { RecruitmentScreen } from './screens/RecruitmentScreen';
import { DocumentsScreen } from './screens/DocumentsScreen';
import { ReportsScreen } from './screens/ReportsScreen';
import { SettingsScreen } from './screens/SettingsScreen';

export default function HRModuleRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HRDashboardScreen />} />
      <Route path="/employees" element={<EmployeesScreen />} />
      <Route path="/attendance" element={<AttendanceScreen />} />
      <Route path="/leaves" element={<LeavesScreen />} />
      <Route path="/payroll" element={<PayrollScreen />} />
      <Route path="/performance" element={<PerformanceScreen />} />
      <Route path="/recruitment" element={<RecruitmentScreen />} />
      <Route path="/documents" element={<DocumentsScreen />} />
      <Route path="/reports" element={<ReportsScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="*" element={<Navigate to="/hr" replace />} />
    </Routes>
  );
}
