import { Link } from 'react-router-dom';

export const AuditDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="bg-rose-50 border-l-4 border-rose-400 p-4 mb-6 mt-2">
        <p className="text-sm text-rose-800">
          <strong>Read-Only Mode:</strong> This panel is strictly for auditing and export. You do not have write access to any underlying data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder cards for future logs/reports */}
        <Link to="/audit/admin-activity" className="bg-white p-6 rounded-lg shadow-sm border border-rose-100 hover:shadow-md transition-shadow cursor-pointer block">
          <h3 className="font-semibold text-rose-900 text-lg mb-2">Admin Activity Logs</h3>
          <p className="text-gray-600 text-sm">View changes to RBAC, roles, and settings.</p>
        </Link>
        
        <Link to="/audit/price-changes" className="bg-white p-6 rounded-lg shadow-sm border border-rose-100 hover:shadow-md transition-shadow cursor-pointer block">
          <h3 className="font-semibold text-rose-900 text-lg mb-2">Price Change Logs</h3>
          <p className="text-gray-600 text-sm">Monitor product price and discount history.</p>
        </Link>
        
        <Link to="/audit/stock-adjustments" className="bg-white p-6 rounded-lg shadow-sm border border-rose-100 hover:shadow-md transition-shadow cursor-pointer block">
          <h3 className="font-semibold text-rose-900 text-lg mb-2">Stock Adjustments</h3>
          <p className="text-gray-600 text-sm">Audit manual stock changes and write-offs.</p>
        </Link>
        
        <Link to="/audit/order-modifications" className="bg-white p-6 rounded-lg shadow-sm border border-rose-100 hover:shadow-md transition-shadow cursor-pointer block">
          <h3 className="font-semibold text-rose-900 text-lg mb-2">Order Modifications</h3>
          <p className="text-gray-600 text-sm">Monitor manual overrides and order cancellations.</p>
        </Link>
        
        <Link to="/audit/session-activity" className="bg-white p-6 rounded-lg shadow-sm border border-rose-100 hover:shadow-md transition-shadow cursor-pointer block">
          <h3 className="font-semibold text-rose-900 text-lg mb-2">Session Activity</h3>
          <p className="text-gray-600 text-sm">Audit logins, OTP failures, and device changes.</p>
        </Link>
        
        <Link to="/audit/rewards-usage" className="bg-white p-6 rounded-lg shadow-sm border border-rose-100 hover:shadow-md transition-shadow cursor-pointer block">
          <h3 className="font-semibold text-rose-900 text-lg mb-2">Coupon & Rewards Usage</h3>
          <p className="text-gray-600 text-sm">Monitor ledger anomalies and reward events.</p>
        </Link>
        
        <Link to="/audit/sales-reports" className="bg-white p-6 rounded-lg shadow-sm border border-rose-100 hover:shadow-md transition-shadow cursor-pointer block">
          <h3 className="font-semibold text-rose-900 text-lg mb-2">Sales Reports</h3>
          <p className="text-gray-600 text-sm">Read-only mirror of financial sales data.</p>
        </Link>
        
        <Link to="/audit/tax-reports" className="bg-white p-6 rounded-lg shadow-sm border border-rose-100 hover:shadow-md transition-shadow cursor-pointer block">
          <h3 className="font-semibold text-rose-900 text-lg mb-2">Tax Reports</h3>
          <p className="text-gray-600 text-sm">Read-only mirror of GST and tax data.</p>
        </Link>
        
        <Link to="/audit/refund-reports" className="bg-white p-6 rounded-lg shadow-sm border border-rose-100 hover:shadow-md transition-shadow cursor-pointer block">
          <h3 className="font-semibold text-rose-900 text-lg mb-2">Refund Reports</h3>
          <p className="text-gray-600 text-sm">Audit trail for Razorpay and Wallet refunds.</p>
        </Link>
        
        <Link to="/audit/inventory-reports" className="bg-white p-6 rounded-lg shadow-sm border border-rose-100 hover:shadow-md transition-shadow cursor-pointer block">
          <h3 className="font-semibold text-rose-900 text-lg mb-2">Inventory Reports</h3>
          <p className="text-gray-600 text-sm">Read-only mirror of stock movement history.</p>
        </Link>
        
        <Link to="/audit/payment-reports" className="bg-white p-6 rounded-lg shadow-sm border border-rose-100 hover:shadow-md transition-shadow cursor-pointer block">
          <h3 className="font-semibold text-rose-900 text-lg mb-2">Payment Reports</h3>
          <p className="text-gray-600 text-sm">Audit webhooks, transactions, and signatures.</p>
        </Link>
        
        <Link to="/audit/correlation" className="bg-gradient-to-br from-rose-50 to-white p-6 rounded-lg shadow-sm border border-rose-200 hover:shadow-md hover:border-rose-300 transition-all cursor-pointer block group">
          <h3 className="font-semibold text-rose-900 text-lg mb-2 group-hover:text-rose-700 transition-colors">Cross-Log Correlation</h3>
          <p className="text-gray-600 text-sm">Search an ID to view its complete universal timeline.</p>
        </Link>
      </div>
    </div>
  );
};
