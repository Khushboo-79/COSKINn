import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import { SecurityScreen } from './SecurityScreen';
import { SettingsScreen } from './SettingsScreen';

export const AdminModuleRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/security" element={<SecurityScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};
