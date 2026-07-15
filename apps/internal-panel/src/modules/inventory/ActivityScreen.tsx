import { ArrowDownToLine, ArrowUpFromLine, ArrowRightLeft, RotateCcw, Search, Filter, DownloadCloud } from 'lucide-react';

import { useState, useEffect } from 'react';
import { api } from '../../lib/axios';

export default function ActivityScreen() {
  const [activity, setActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchActivity() {
      try {
        // optionally filter by entity or just fetch all inventory-related
        // If the endpoint doesn't support entity filter natively, or if the backend logs multiple entities (like StockMovement, Warehouse, etc)
        // For now, let's fetch all logs and filter in frontend if needed, or just display them.
        const resAll = await api.get('/admin/audit/logs');
        
        const logs = resAll.data.map((log: any) => {
          let type = 'out';
          let qty = '';
          
          if (log.action.includes('IN')) {
            type = 'in';
          } else if (log.action.includes('OUT') || log.action.includes('DEDUCT')) {
            type = 'out';
          } else if (log.action.includes('TRANSFER')) {
            type = 'transfer';
          } else if (log.action.includes('RETURN')) {
            type = 'return';
          }

          let name = log.entityId || log.entity;
          // Attempt to extract SKU or details if newData has them
          if (log.newData) {
             try {
                const parsed = JSON.parse(log.newData);
                if (parsed.sku) name = parsed.sku;
                if (parsed.quantity) qty = (type === 'in' ? '+' : '-') + parsed.quantity;
             } catch(e) {}
          }

          return {
            id: log.id,
            type,
            name: name,
            desc: `${log.action} • ${log.entity}`,
            qty: qty,
            time: new Date(log.createdAt).toLocaleString(),
            user: log.adminId ? `Admin ${log.adminId}` : 'System'
          };
        });
        
        setActivity(logs);
      } catch (error) {
        console.error('Failed to fetch activity logs', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchActivity();
  }, []);
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Recent Stock Activity</h2>
          <p className="text-sm text-slate-500 mt-1">Audit log of all inventory movements.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search activity..." 
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm shadow-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="bg-slate-800 text-white px-4 py-2 rounded-xl font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm shadow-sm">
            <DownloadCloud className="w-4 h-4" /> Export Log
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Activity</th>
                <th className="px-6 py-4 font-semibold">Details</th>
                <th className="px-6 py-4 font-semibold">Quantity</th>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Loading activity logs...
                  </td>
                </tr>
              ) : activity.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No recent activity found.
                  </td>
                </tr>
              ) : activity.map((act) => (
                <tr key={act.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        act.type === 'in' ? 'bg-emerald-50 text-emerald-600' :
                        act.type === 'out' ? 'bg-slate-100 text-slate-600' :
                        act.type === 'transfer' ? 'bg-blue-50 text-blue-600' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {act.type === 'in' ? <ArrowDownToLine className="w-4 h-4" /> :
                         act.type === 'out' ? <ArrowUpFromLine className="w-4 h-4" /> :
                         act.type === 'transfer' ? <ArrowRightLeft className="w-4 h-4" /> :
                         <RotateCcw className="w-4 h-4" />}
                      </div>
                      <span className="font-bold text-slate-800">{act.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{act.desc}</td>
                  <td className={`px-6 py-4 font-bold ${act.qty?.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                    {act.qty}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                      {act.user}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-400 font-medium">{act.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 flex justify-between items-center text-sm">
          <span className="text-slate-500">Showing 1 to 7 of 482 activities</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
