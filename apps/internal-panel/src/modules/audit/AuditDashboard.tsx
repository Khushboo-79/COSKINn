import { Link } from 'react-router-dom';
import PanelHeader from '../../components/PanelHeader';
import { 
  ShieldAlert, Tag, Package, ShoppingCart, Users, Gift, 
  TrendingUp, FileText, RefreshCcw, Archive, CreditCard, Activity,
  Search, FileCheck
} from 'lucide-react';

export const AuditDashboard = () => {
  const reports = [
    { name: 'Admin Activity Logs', path: '/audit/admin-activity', desc: 'View changes to RBAC, roles, and settings.', icon: ShieldAlert },
    { name: 'Price Change Logs', path: '/audit/price-changes', desc: 'Monitor product price and discount history.', icon: Tag },
    { name: 'Stock Adjustments', path: '/audit/stock-adjustments', desc: 'Audit manual stock changes and write-offs.', icon: Package },
    { name: 'Order Modifications', path: '/audit/order-modifications', desc: 'Monitor manual overrides and order cancellations.', icon: ShoppingCart },
    { name: 'Session Activity', path: '/audit/session-activity', desc: 'Audit logins, OTP failures, and device changes.', icon: Users },
    { name: 'Coupon & Rewards Usage', path: '/audit/rewards-usage', desc: 'Monitor ledger anomalies and reward events.', icon: Gift },
    { name: 'Sales Reports', path: '/audit/sales-reports', desc: 'Read-only mirror of financial sales data.', icon: TrendingUp },
    { name: 'Tax Reports', path: '/audit/tax-reports', desc: 'Read-only mirror of GST and tax data.', icon: FileText },
    { name: 'Refund Reports', path: '/audit/refund-reports', desc: 'Audit trail for Razorpay and Wallet refunds.', icon: RefreshCcw },
    { name: 'Inventory Reports', path: '/audit/inventory-reports', desc: 'Read-only mirror of stock movement history.', icon: Archive },
    { name: 'Payment Reports', path: '/audit/payment-reports', desc: 'Audit webhooks, transactions, and signatures.', icon: CreditCard },
  ];

  return (
    <div className="space-y-6 p-4 overflow-y-auto h-full">
      <PanelHeader
        title="Auditor Dashboard"
        subtitle="Universal logs, audit trails, and read-only financial reports"
        icon={FileCheck}
      />

      <div className="bg-rose-50/80 backdrop-blur-md border border-rose-200/60 p-4 rounded-2xl flex items-start gap-3 shadow-sm">
        <ShieldAlert className="w-5 h-5 text-rose-600 mt-0.5" />
        <p className="text-sm text-rose-800 font-medium">
          <strong>Read-Only Mode:</strong> This panel is strictly for auditing and export. You do not have write access to any underlying data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <Link 
              key={report.path} 
              to={report.path} 
              className="group p-5 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF0069]/10 to-[#FFD498]/10 flex items-center justify-center group-hover:from-[#FF0069]/20 group-hover:to-[#FFD498]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[#FF0069]" />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-[#FF0069] transition-colors mb-1.5">{report.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{report.desc}</p>
            </Link>
          );
        })}

        <Link 
          to="/audit/correlation" 
          className="group p-5 rounded-2xl bg-gradient-to-br from-[#FF0069]/5 to-[#FFD498]/10 backdrop-blur-xl border border-[#FF0069]/20 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block relative overflow-hidden"
        >
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-[#FF0069] to-[#FFD498] opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity"></div>
          
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF0069] to-[#FFD498] flex items-center justify-center shadow-md">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <Search className="w-4 h-4 text-[#FF0069]/40 group-hover:text-[#FF0069] transition-colors" />
          </div>
          <h3 className="font-bold text-[#FF0069] mb-1.5 relative z-10">Cross-Log Correlation</h3>
          <p className="text-xs text-gray-600 leading-relaxed relative z-10">Search an ID to view its complete universal timeline across all modules.</p>
        </Link>
      </div>
    </div>
  );
};
