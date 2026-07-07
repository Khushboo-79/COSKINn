import { Routes, Route, Navigate } from 'react-router-dom';
import CustomerList from './CustomerList';
import CustomerDetail from './CustomerDetail';

export function CrmModuleRoutes() {
  return (
    <Routes>
      <Route path="customers" element={<CustomerList />} />
      <Route path="customers/:id" element={<CustomerDetail />} />
      <Route path="/" element={<Navigate to="customers" replace />} />
    </Routes>
  );
}
