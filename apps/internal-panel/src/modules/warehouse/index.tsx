import { Routes, Route, Navigate } from 'react-router-dom';
import WarehouseDashboardScreen from './screens/WarehouseDashboardScreen';
import { InventoryScreen } from './screens/InventoryScreen';
import { InboundScreen } from './screens/InboundScreen';
import { OutboundScreen } from './screens/OutboundScreen';
import { StockTransfersScreen } from './screens/StockTransfersScreen';
import { StockAdjustmentScreen } from './screens/StockAdjustmentScreen';
import { LocationsBinsScreen } from './screens/LocationsBinsScreen';
import { PickPackShipScreen } from './screens/PickPackShipScreen';
import { ReturnsScreen } from './screens/ReturnsScreen';
import { SuppliersScreen } from './screens/SuppliersScreen';
import { ReportsAnalyticsScreen } from './screens/ReportsAnalyticsScreen';
import { SettingsScreen } from './screens/SettingsScreen';

export default function WarehouseModuleRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WarehouseDashboardScreen />} />
      <Route path="/inventory" element={<InventoryScreen />} />
      <Route path="/inbound" element={<InboundScreen />} />
      <Route path="/outbound" element={<OutboundScreen />} />
      <Route path="/transfers" element={<StockTransfersScreen />} />
      <Route path="/adjustments" element={<StockAdjustmentScreen />} />
      <Route path="/locations" element={<LocationsBinsScreen />} />
      <Route path="/fulfillment" element={<PickPackShipScreen />} />
      <Route path="/returns" element={<ReturnsScreen />} />
      <Route path="/suppliers" element={<SuppliersScreen />} />
      <Route path="/reports" element={<ReportsAnalyticsScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="*" element={<Navigate to="/warehouse" replace />} />
    </Routes>
  );
}
