import { Routes, Route, Navigate, NavLink, useLocation } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import { SecurityScreen } from './SecurityScreen';
import { SettingsScreen } from './SettingsScreen';
import { ShieldCheck, LayoutDashboard, Settings } from 'lucide-react';

export const AdminModuleRoutes = () => {
  const location = useLocation();

  const tabs = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Security & RBAC', path: '/admin/security', icon: ShieldCheck },
    { name: 'Global Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Sub-navigation Tabs */}
      <div className="bg-white/60 backdrop-blur-md border-b border-rose-100 px-6 py-4 flex gap-4 sticky top-0 z-10 shrink-0 rounded-t-3xl">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.path === '/admin'}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                isActive 
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-200' 
                  : 'text-gray-500 hover:bg-rose-50 hover:text-rose-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.name}
            </NavLink>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/security" element={<SecurityScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </div>
  );
};
