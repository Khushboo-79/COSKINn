import { Routes, Route, Navigate } from 'react-router-dom';
import FinanceDashboardScreen from './screens/FinanceDashboardScreen';
import { TransactionsScreen } from './screens/TransactionsScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { InvoicesScreen } from './screens/InvoicesScreen';
import { PaymentsScreen } from './screens/PaymentsScreen';
import { PayoutsScreen } from './screens/PayoutsScreen';
import { RefundsScreen } from './screens/RefundsScreen';
import { ExpensesScreen } from './screens/ExpensesScreen';
import { TaxesScreen } from './screens/TaxesScreen';
import { ReportsScreen } from './screens/ReportsScreen';
import { AccountsScreen } from './screens/AccountsScreen';
import { BudgetsScreen } from './screens/BudgetsScreen';
import { SettingsScreen } from './screens/SettingsScreen';

export default function FinanceModuleRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FinanceDashboardScreen />} />
      <Route path="/transactions" element={<TransactionsScreen />} />
      <Route path="/orders" element={<OrdersScreen />} />
      <Route path="/invoices" element={<InvoicesScreen />} />
      <Route path="/payments" element={<PaymentsScreen />} />
      <Route path="/payouts" element={<PayoutsScreen />} />
      <Route path="/refunds" element={<RefundsScreen />} />
      <Route path="/expenses" element={<ExpensesScreen />} />
      <Route path="/taxes" element={<TaxesScreen />} />
      <Route path="/reports" element={<ReportsScreen />} />
      <Route path="/accounts" element={<AccountsScreen />} />
      <Route path="/budgets" element={<BudgetsScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="*" element={<Navigate to="/finance" replace />} />
    </Routes>
  );
}
