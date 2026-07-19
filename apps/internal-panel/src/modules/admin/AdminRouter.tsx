import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RoleManagementScreen } from './RoleManagementScreen';
import { UserManagementScreen } from './UserManagementScreen';
import { StaffTwoFactorScreen } from './StaffTwoFactorScreen';
import { ProductApprovalScreen } from './ProductApprovalScreen';

export const AdminRouter = () => {
  return (
    <Routes>
      <Route path="roles" element={<RoleManagementScreen />} />
      <Route path="users" element={<UserManagementScreen />} />
      <Route path="2fa" element={<StaffTwoFactorScreen />} />
      <Route path="approvals" element={<ProductApprovalScreen />} />
      
      {/* Default redirect to roles if someone goes to /admin */}
      <Route index element={<Navigate to="roles" replace />} />
    </Routes>
  );
};
