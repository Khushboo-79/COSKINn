import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import RolesPermissionsScreen from './modules/admin/RolesPermissionsScreen';
import UserManagementScreen from './modules/admin/UserManagementScreen';

const queryClient = new QueryClient();
import HrDashboardScreen from './modules/hr/HrDashboardScreen';
import FinanceScreen from './modules/finance/FinanceScreen';
import DashboardScreen from './modules/admin/DashboardScreen';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardScreen />} />
            <Route path="admin/roles" element={<RolesPermissionsScreen />} />
            <Route path="admin/users" element={<UserManagementScreen />} />
            <Route path="hr" element={<HrDashboardScreen />} />
            <Route path="finance" element={<FinanceScreen />} />
            {/* Catch-all to redirect back home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
