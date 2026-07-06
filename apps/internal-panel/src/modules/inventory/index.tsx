import { Routes, Route } from 'react-router-dom';
import StockDashboard from './StockDashboard';
import StockIntake from './StockIntake';

export function InventoryModuleRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StockDashboard />} />
      <Route path="/intake" element={<StockIntake />} />
    </Routes>
  );
}
