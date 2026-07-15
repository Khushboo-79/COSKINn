import { Routes, Route, Navigate } from 'react-router-dom';
import { RequireRole } from '../../components/RequireRole';
import { AuditDashboard } from './AuditDashboard';

// Existing Reports/Logs
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

// New Screens (Placeholders)
import { AuditTransactionsScreen } from './screens/AuditTransactionsScreen';
import { AuditOrdersScreen } from './screens/AuditOrdersScreen';
import { InventoryAuditScreen } from './screens/InventoryAuditScreen';
import { ComplianceScreen } from './screens/ComplianceScreen';
import { DocumentsScreen } from './screens/DocumentsScreen';
import { RiskFlagsScreen } from './screens/RiskFlagsScreen';
import { ActivityLogsScreen } from './screens/ActivityLogsScreen';
import { AuditReportsScreen } from './screens/AuditReportsScreen';
import { AuditSettingsScreen } from './screens/AuditSettingsScreen';

export const AuditModuleRoutes = () => {
  return (
    <Routes>
      <Route element={<RequireRole allowedRoles={['auditor']} />}>
        {/* New Navigation Routes */}
        <Route path="/" element={<AuditDashboard />} />
        <Route path="/transactions" element={<AuditTransactionsScreen />} />
        <Route path="/orders" element={<AuditOrdersScreen />} />
        <Route path="/inventory" element={<InventoryAuditScreen />} />
        <Route path="/compliance" element={<ComplianceScreen />} />
        <Route path="/documents" element={<DocumentsScreen />} />
        <Route path="/risk" element={<RiskFlagsScreen />} />
        <Route path="/activity" element={<ActivityLogsScreen />} />
        <Route path="/reports" element={<AuditReportsScreen />} />
        <Route path="/settings" element={<AuditSettingsScreen />} />

        {/* Legacy / Hidden Routes inside Reports & Activity Logs */}
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

        <Route path="*" element={<Navigate to="/audit" replace />} />
      </Route>
    </Routes>
  );
};
