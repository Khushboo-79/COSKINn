import { Navigate, Outlet } from 'react-router-dom';

interface RequireRoleProps {
  allowedRoles: string[];
}

export const RequireRole = ({ allowedRoles }: RequireRoleProps) => {
  // TODO: Replace this stub with actual auth hook context (e.g., const { user } = useAuth())
  const user = { role: 'auditor' }; // Mocked for Day 1 scaffold

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If the user has the required role, render the child routes
  return <Outlet />;
};
