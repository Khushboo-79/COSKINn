import { useQuery } from '@tanstack/react-query';
import { auditApi } from '../../core/api/audit';
import { Loader2, Key, ShieldCheck, ShieldAlert } from 'lucide-react';
import { format } from 'date-fns';

export const SessionLogScreen = () => {
  const { data: sessions, isLoading } = useQuery({
    queryKey: ['audit', 'sessions'],
    queryFn: () => auditApi.getSessionActivityLog()
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center">
              <Key className="h-5 w-5 mr-2 text-indigo-600" />
              Active Sessions & Logins
            </h2>
            <p className="text-sm text-slate-500 mt-1">Track login activities and device sessions across the system.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin mb-4 text-indigo-500" />
            <p>Loading session logs...</p>
          </div>
        ) : !sessions || sessions.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl">
            <Key className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No active sessions found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-600">User ID</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">IP Address</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Device Info</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Login Time</th>
                  <th className="px-4 py-3 font-semibold text-slate-600 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sessions.map((session: any) => (
                  <tr key={session.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-mono text-xs text-slate-700">{session.userId}</p>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">
                      {session.ipAddress || 'Unknown'}
                    </td>
                    <td className="px-4 py-3 text-slate-600 truncate max-w-xs" title={session.deviceInfo}>
                      {session.deviceInfo || 'Unknown Device'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-slate-500 text-xs">
                      {format(new Date(session.createdAt), 'dd MMM yyyy, HH:mm')}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {session.isRevoked ? (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-rose-100 text-rose-700">
                          <ShieldAlert className="h-3 w-3 mr-1" />
                          REVOKED
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-700">
                          <ShieldCheck className="h-3 w-3 mr-1" />
                          ACTIVE
                        </span>
                      )}
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
