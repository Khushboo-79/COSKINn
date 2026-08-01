import { toast } from 'sonner';
import { useState } from 'react';
import { ArrowLeft, History, Download, Calendar, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { inventoryApi } from '../../core/api/inventory';

export const MovementLogsScreen = () => {
  const [skuFilter, setSkuFilter] = useState('');

  const { data: logs = [], isLoading } = useQuery({
    queryKey: ['movementLogs', skuFilter],
    queryFn: () => inventoryApi.getMovementLogs(skuFilter),
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/inventory" className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Movement Ledger</h1>
            <p className="text-slate-500 text-sm mt-1">Immutable history of all inventory mutations.</p>
          </div>
        </div>
        <button 
          onClick={() => toast("CSV Export triggered! (Mock)")}
          className="px-4 py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-sm flex items-center"
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 text-sm font-medium">
            <History className="h-4 w-4 mr-2" />
            UI Mocked (Pending Backend /logs endpoint)
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Filter by SKU..."
                value={skuFilter}
                onChange={(e) => setSkuFilter(e.target.value)}
                className="pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-primary-500 w-48"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="date"
                className="pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-primary-500 w-40 text-slate-600"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Date / Time</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Movement ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Type & Reason</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Quantity Change</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Location / User</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-4">Loading logs...</td></tr>
              ) : logs.map((log: any) => {
                const isPositive = log.type === 'IN';
                
                return (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-400">
                      {log.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {log.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="block text-sm font-medium text-slate-700">{log.type}</span>
                      <span className="block text-xs text-slate-500 mt-0.5">{log.reference || 'SYSTEM'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold">
                      <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
                        {isPositive ? '+' : '-'}{log.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <span className="block font-medium text-slate-700">WH: {log.warehouse?.name || 'Unknown'}</span>
                      <span className="block text-xs mt-0.5">System User</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
