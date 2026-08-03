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
              key={tab.name || tab.path}
              to={tab.path}
              className={`flex items-center whitespace-nowrap px-5 py-4 text-sm font-bold border-b-2 transition-all duration-300 ease-out active:scale-95 ${
                isActive
                  ? 'border-[#FF7F50] text-[#FF7F50] bg-gradient-to-t from-[#FF7F50]/10 to-transparent shadow-[inset_0_-2px_4px_rgba(255,127,80,0.1)]'
                  : 'border-transparent text-slate-500 hover:text-[#FF7F50] hover:bg-gradient-to-t hover:from-[#FF7F50]/5 hover:to-transparent'
              }`}
            >
              <Icon className={`h-4 w-4 mr-2.5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-6'}`} />
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
            <h2 className="text-xl font-medium text-slate-900 mb-2">Page Not Found</h2>
            <p>This section doesn't exist.</p>
          </div>
        } />
      </Routes>
    </div>
  );
};
