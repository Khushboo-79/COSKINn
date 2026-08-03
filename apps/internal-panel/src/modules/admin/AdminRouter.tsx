import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Shield, Users, LayoutDashboard, Settings, CheckSquare, KeyRound, Search } from 'lucide-react';
import { RoleManagementScreen } from './RoleManagementScreen';
import { UserManagementScreen } from './UserManagementScreen';
import { AdminDashboardScreen } from './AdminDashboardScreen';
import { StaffTwoFactorScreen } from './StaffTwoFactorScreen';
import { ProductApprovalScreen } from './ProductApprovalScreen';
import { GlobalSearchScreen } from './GlobalSearchScreen';
import { SystemSettingsScreen } from './SystemSettingsScreen';
import { UserProfileScreen } from './UserProfileScreen';

const AdminNav = () => {
  const location = useLocation();
  
  const tabs = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Global Search', path: '/admin/search', icon: Search },
    { name: 'Role Management', path: '/admin/roles', icon: Shield },
    { name: 'User Access', path: '/admin/users', icon: Users },
    { name: 'Approvals', path: '/admin/approvals', icon: CheckSquare },
    { name: '2FA Setup', path: '/admin/2fa', icon: KeyRound },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
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
            className={`flex items-center whitespace-nowrap px-5 py-4 text-sm font-bold border-b-2 transition-all duration-300 ease-out active:scale-95 ${
              isActive
                ? 'border-[#FF3E7F] text-[#FF3E7F] bg-[#FF3E7F]/5'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50/50'
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

export const AdminRouter = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 p-6 overflow-y-auto">
      <AdminNav />
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/dashboard" element={<AdminDashboardScreen />} />
        <Route path="/search" element={<GlobalSearchScreen />} />
        <Route path="/roles" element={<RoleManagementScreen />} />
        <Route path="/users" element={<UserManagementScreen />} />
        <Route path="/approvals" element={<ProductApprovalScreen />} />
        <Route path="/2fa" element={<StaffTwoFactorScreen />} />
        <Route path="/settings" element={<SystemSettingsScreen />} />
        <Route path="/profile" element={<UserProfileScreen />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </div>
  );
};
