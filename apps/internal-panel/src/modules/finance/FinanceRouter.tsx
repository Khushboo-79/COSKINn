import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Activity, Tag, Percent, FileText, FileMinus, BookOpen, RefreshCw } from 'lucide-react';
import { FinanceDashboardScreen } from './FinanceDashboardScreen';
import { HsnManagementScreen } from './HsnManagementScreen';
import { TaxConfigScreen } from './TaxConfigScreen';
import { InvoiceViewerScreen } from './InvoiceViewerScreen';
import { CreditDebitNotesScreen } from './CreditDebitNotesScreen';
import { LedgerScreen } from './LedgerScreen';
import { SettlementScreen } from './SettlementScreen';

const FinanceNav = () => {
  const location = useLocation();
  const tabs = [
    { name: 'Dashboard', path: '/finance/dashboard', icon: Activity },
    { name: 'Invoices', path: '/finance/invoices', icon: FileText },
    { name: 'Ledger & P&L', path: '/finance/ledger', icon: BookOpen },
    { name: 'Settlements', path: '/finance/settlements', icon: RefreshCw },
    { name: 'HSN Codes', path: '/finance/hsn', icon: Tag },
    { name: 'Tax Rates', path: '/finance/tax-rates', icon: Percent },
    { name: 'Notes', path: '/finance/notes', icon: FileMinus },
  ];

  return (
    <div className="flex border-b border-slate-200 bg-white mb-6 rounded-2xl shadow-sm overflow-x-auto px-2 scrollbar-hide">
      {tabs.map((tab) => {
        const isActive = location.pathname.startsWith(tab.path);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex items-center whitespace-nowrap px-4 py-4 text-sm font-medium border-b-2 transition-colors ${
              isActive
                ? 'border-slate-900 text-slate-900 bg-slate-50'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50/50'
            }`}
          >
            <Icon className="h-4 w-4 mr-2" />
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
};

export const FinanceRouter = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 p-6 overflow-y-auto">
      <FinanceNav />
      <Routes>
        <Route path="/" element={<Navigate to="/finance/dashboard" replace />} />
        <Route path="/dashboard" element={<FinanceDashboardScreen />} />
        <Route path="/hsn" element={<HsnManagementScreen />} />
        <Route path="/tax-rates" element={<TaxConfigScreen />} />
        <Route path="/invoices" element={<InvoiceViewerScreen />} />
        <Route path="/ledger" element={<LedgerScreen />} />
        <Route path="/settlements" element={<SettlementScreen />} />
        <Route path="/notes" element={<CreditDebitNotesScreen />} />
        <Route path="*" element={
          <div className="p-12 text-center text-slate-500">
            <Activity className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-slate-900 mb-2">Finance Module Coming Soon</h2>
            <p>This section is under construction.</p>
          </div>
        } />
      </Routes>
    </div>
  );
};
