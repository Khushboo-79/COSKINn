import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { InventoryDashboardScreen } from './InventoryDashboardScreen';
import { StockAdjustmentScreen } from './StockAdjustmentScreen';
import { DetailedStockScreen } from './DetailedStockScreen';
import { StockTransferScreen } from './StockTransferScreen';
import { InventoryAlertsScreen } from './InventoryAlertsScreen';
import { ReportDamageScreen } from './ReportDamageScreen';
import { ReturnHandlingScreen } from './ReturnHandlingScreen';
import { BarcodeScannerScreen } from './BarcodeScannerScreen';
import { AuditScreen } from './AuditScreen';
import { ReservationVisibilityScreen } from './ReservationVisibilityScreen';
import { MovementLogsScreen } from './MovementLogsScreen';
import { Boxes, ArrowLeft } from 'lucide-react';

export const InventoryRouter = () => {
  const location = useLocation();

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
      {/* Inventory Module Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
            <Boxes className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Inventory Management</h1>
            <p className="text-sm text-slate-500">Track stock, handle GRN, and adjust ledger</p>
          </div>
        </div>
        
        {location.pathname !== '/inventory' && (
          <Link
            to="/inventory"
            className="flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-6">
        <Routes>
          <Route path="/" element={<InventoryDashboardScreen />} />
          <Route path="/adjust" element={<StockAdjustmentScreen />} />
          <Route path="/detailed" element={<DetailedStockScreen />} />
          <Route path="/transfer" element={<StockTransferScreen />} />
          <Route path="/alerts" element={<InventoryAlertsScreen />} />
          <Route path="/report-damage" element={<ReportDamageScreen />} />
          <Route path="/returns" element={<ReturnHandlingScreen />} />
          <Route path="/scanner" element={<BarcodeScannerScreen />} />
          <Route path="/audit" element={<AuditScreen />} />
          <Route path="/reservations" element={<ReservationVisibilityScreen />} />
          <Route path="/reports" element={<MovementLogsScreen />} />
          <Route path="*" element={<Navigate to="/inventory" replace />} />
        </Routes>
      </main>
    </div>
  );
};
