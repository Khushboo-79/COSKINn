import { useState } from 'react';
import { Settings, Save, ShieldAlert, Mail, Bell, AlertTriangle, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsScreen() {
  const [lowStockThreshold, setLowStockThreshold] = useState('20');
  const [outOfStockThreshold, setOutOfStockThreshold] = useState('0');
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Inventory Settings</h2>
          <p className="text-sm text-slate-500 mt-1">Configure alerts, buffers, and system defaults.</p>
        </div>
        <button 
          onClick={() => toast.success('Settings saved successfully!')}
          className="bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2 shadow-sm">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-800">Stock Thresholds</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Global Low Stock Alert Level</label>
                  <p className="text-xs text-slate-500 mb-3">Trigger warning when SKU drops below this count.</p>
                  <input 
                    type="number"
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Out of Stock Level</label>
                  <p className="text-xs text-slate-500 mb-3">Buffer level to consider item OOS for frontend sales.</p>
                  <input 
                    type="number"
                    value={outOfStockThreshold}
                    onChange={(e) => setOutOfStockThreshold(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <Bell className="w-5 h-5 text-blue-500" />
              <h3 className="font-bold text-slate-800">Notifications</h3>
            </div>
            <div className="p-6 space-y-4">
              <label className="flex items-start gap-3 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <input 
                  type="checkbox" 
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="mt-1 w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
                />
                <div>
                  <p className="font-bold text-slate-800 text-sm">Low Stock Email Alerts</p>
                  <p className="text-xs text-slate-500 mt-0.5">Send a daily summary of items falling below the threshold.</p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500" />
                <div>
                  <p className="font-bold text-slate-800 text-sm">Transfer Approvals</p>
                  <p className="text-xs text-slate-500 mt-0.5">Require manager approval for inter-warehouse transfers over 100 units.</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
            <ShieldCheck className="w-8 h-8 text-emerald-600 mb-4" />
            <h3 className="font-bold text-emerald-900 mb-2">System Status</h3>
            <p className="text-sm text-emerald-700 leading-relaxed">
              Your inventory system is fully operational. Last sync with the e-commerce database was <strong>2 minutes ago</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
