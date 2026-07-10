import { AlertTriangle, Package, Bell, Search, Filter } from 'lucide-react';

import { useState, useEffect } from 'react';
import { api } from '../../lib/axios';

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const [lowStockRes, nearExpiryRes] = await Promise.all([
          api.get('/inventory/alerts/low-stock'),
          api.get('/inventory/alerts/near-expiry')
        ]);
        
        const merged: any[] = [];
        
        lowStockRes.data.forEach((item: any) => {
          merged.push({
            id: item.id || Math.random(),
            type: 'low_stock',
            name: `Low Stock: ${item.sku}`,
            details: `Available: ${item.quantity} in ${item.warehouse?.name || 'Warehouse'}`,
            time: new Date().toLocaleDateString(),
            status: 'Unread',
            color: 'text-amber-500 bg-amber-50'
          });
        });

        nearExpiryRes.data.forEach((item: any) => {
          merged.push({
            id: item.id || Math.random(),
            type: 'system',
            name: `Expiring Soon: ${item.sku}`,
            details: `Batch ${item.batchNumber} expires on ${new Date(item.expiryDate).toLocaleDateString()}`,
            time: new Date().toLocaleDateString(),
            status: 'Unread',
            color: 'text-rose-500 bg-rose-50'
          });
        });

        if (merged.length === 0) {
           // If no real alerts, push a generic system alert so the UI isn't empty
           merged.push({
             id: 'sys-1', type: 'system', name: 'System Normal', details: 'No critical alerts at this time.',
             time: 'Just now', status: 'Read', color: 'text-emerald-500 bg-emerald-50'
           });
        }

        setAlerts(merged);
      } catch (error) {
        console.error('Failed to fetch alerts', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAlerts();
  }, []);
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">System Alerts</h2>
          <p className="text-sm text-slate-500 mt-1">Review low stock warnings and system notifications.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search alerts..." 
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm shadow-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="bg-rose-50 text-rose-600 px-4 py-2 rounded-xl font-semibold hover:bg-rose-100 transition-colors text-sm shadow-sm">
            Mark All as Read
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex gap-6">
          <button className="text-sm font-bold text-rose-600 border-b-2 border-rose-600 pb-2">All Alerts (5)</button>
          <button className="text-sm font-semibold text-slate-500 hover:text-slate-800 pb-2">Unread (2)</button>
          <button className="text-sm font-semibold text-slate-500 hover:text-slate-800 pb-2">Low Stock</button>
          <button className="text-sm font-semibold text-slate-500 hover:text-slate-800 pb-2">System</button>
        </div>
        
        <div className="divide-y divide-slate-50">
          {isLoading ? (
             <div className="p-8 text-center text-slate-500">Loading alerts...</div>
          ) : alerts.map(alert => (
            <div key={alert.id} className={`p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer ${alert.status === 'Unread' ? 'bg-rose-50/20' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${alert.color}`}>
                {alert.type === 'low_stock' ? <Package className="w-5 h-5" /> : 
                 alert.type === 'system' ? <AlertTriangle className="w-5 h-5" /> : 
                 <Bell className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className={`font-bold text-sm ${alert.status === 'Unread' ? 'text-slate-900' : 'text-slate-700'}`}>
                    {alert.name}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">{alert.time}</span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{alert.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
