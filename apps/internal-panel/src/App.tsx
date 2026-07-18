import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import RolesPermissionsScreen from './modules/admin/RolesPermissionsScreen';
import UserManagementScreen from './modules/admin/UserManagementScreen';

const queryClient = new QueryClient();

// A simple dashboard placeholder for the root route
const DashboardPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF0069] to-[#FFD498] flex items-center justify-center mb-6 shadow-lg shadow-[#FF0069]/20">
      <span className="text-white font-bold text-2xl">C</span>
    </div>
    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">Welcome to COSKINn Admin</h1>
    <p className="text-lg text-slate-500 max-w-md">Navigate to Roles & Permissions or User Management from the sidebar to manage access controls.</p>
  </div>
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPlaceholder />} />
            <Route path="admin/roles" element={<RolesPermissionsScreen />} />
            <Route path="admin/users" element={<UserManagementScreen />} />
            {/* Catch-all to redirect back home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
