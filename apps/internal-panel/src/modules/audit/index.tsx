import { Routes, Route } from 'react-router-dom';
import { RequireRole } from '../../components/RequireRole';
import { AuditDashboard } from './AuditDashboard';
import { AdminActivityLog } from './AdminActivityLog';
import { PriceChangeLog } from './PriceChangeLog';
import { StockAdjustmentLog } from './StockAdjustmentLog';
import { OrderModificationLog } from './OrderModificationLog';
import { SessionActivityLog } from './SessionActivityLog';
import { RewardUsageLog } from './RewardUsageLog';
import { SalesReport } from './SalesReport';
import { TaxReport } from './TaxReport';
import { RefundReport } from './RefundReport';
import { InventoryReport } from './InventoryReport';
import { PaymentReport } from './PaymentReport';
import { CrossLogCorrelation } from './CrossLogCorrelation';

export const AuditModuleRoutes = () => {
  return (
    <Routes>
      {/* Protect all routes in this module with the 'auditor' role */}
      <Route element={<RequireRole allowedRoles={['auditor']} />}>
        <Route index element={<AuditDashboard />} />
        <Route path="admin-activity" element={<AdminActivityLog />} />
        <Route path="price-changes" element={<PriceChangeLog />} />
        <Route path="stock-adjustments" element={<StockAdjustmentLog />} />
        <Route path="order-modifications" element={<OrderModificationLog />} />
        <Route path="session-activity" element={<SessionActivityLog />} />
        <Route path="rewards-usage" element={<RewardUsageLog />} />
        <Route path="sales-reports" element={<SalesReport />} />
        <Route path="tax-reports" element={<TaxReport />} />
        <Route path="refund-reports" element={<RefundReport />} />
        <Route path="inventory-reports" element={<InventoryReport />} />
        <Route path="payment-reports" element={<PaymentReport />} />
        <Route path="correlation" element={<CrossLogCorrelation />} />
        {/* Additional audit routes (logs, reports) will be added here in future days */}
      </Route>
    </Routes>
  );
};
