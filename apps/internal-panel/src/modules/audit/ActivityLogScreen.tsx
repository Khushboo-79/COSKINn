import { toast } from 'sonner';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { auditApi } from '../../core/api/audit';
import { Loader2, Search, Filter, ShieldAlert, Clock } from 'lucide-react';
import { format } from 'date-fns';

export const ActivityLogScreen = () => {
  const [entityFilter, setEntityFilter] = useState('');

  const { data: logsData, isLoading } = useQuery({
    queryKey: ['audit', 'logs', entityFilter],
    queryFn: () => auditApi.getLogs(1, 100, entityFilter || undefined)
  });

  const logs = logsData?.data || [];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center">
              <ShieldAlert className="h-5 w-5 mr-2 text-rose-600" />
              System Activity Logs
            </h2>
            <p className="text-sm text-slate-500 mt-1">Immutable trail of all critical system actions.</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select
                className="w-full pl-9 pr-4 py-2 border-2 border-slate-200 rounded-xl text-sm focus:border-rose-500 focus:ring-0 appearance-none bg-white"
                value={entityFilter}
                onChange={(e) => setEntityFilter(e.target.value)}
              >
                <option value="">All Entities</option>
                <option value="USER">User / RBAC</option>
                <option value="ORDER">Orders</option>
                <option value="PRODUCT">Products</option>
                <option value="STOCK">Inventory</option>
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin mb-4 text-rose-500" />
            <p>Loading secure audit trail...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl">
            <Clock className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No audit logs found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-600">Timestamp</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Action</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Entity</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Admin ID</th>
                  <th className="px-4 py-3 font-semibold text-slate-600 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log: any) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-slate-500 font-mono text-xs">
                      {format(new Date(log.createdAt), 'dd MMM yyyy, HH:mm:ss')}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-slate-100 text-slate-700 uppercase">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-slate-900">{log.entity}</p>
                      <p className="text-xs text-slate-500 font-mono">{log.entityId}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-slate-600">{log.adminId || 'SYSTEM'}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        className="text-rose-600 hover:text-rose-800 text-xs font-bold px-3 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 transition-colors"
                        onClick={() => toast(`Old: ${log.oldData}\nNew: ${log.newData}`)}
                      >
                        View Diff
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
