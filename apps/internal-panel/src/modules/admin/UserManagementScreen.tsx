import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Users, UserPlus, MoreVertical, ShieldAlert } from 'lucide-react';

export default function UserManagementScreen() {
  const { data: users, isLoading } = useQuery({
    queryKey: ['internalUsers'],
    queryFn: async () => {
      const { data } = await api.get('/admin/config/users');
      return data;
    },
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Internal Users</h1>
            <p className="text-sm text-slate-500 mt-1">Manage staff access and assigned roles</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-medium shadow-md hover:bg-slate-800 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <UserPlus className="w-4 h-4" />
          Invite User
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search users..." 
              className="pl-4 pr-10 py-2 w-64 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow text-sm"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 appearance-none bg-white font-medium text-slate-700 cursor-pointer hover:border-slate-300">
              <option>All Roles</option>
              <option>super-admin</option>
              <option>product-manager</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">User</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Assigned Role</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                [1, 2, 3].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-6"><div className="h-4 bg-slate-100 rounded w-32" /></td>
                    <td className="py-4 px-6"><div className="h-6 bg-slate-100 rounded-full w-24" /></td>
                    <td className="py-4 px-6"><div className="h-6 bg-slate-100 rounded-full w-16" /></td>
                    <td className="py-4 px-6 text-right"><div className="h-8 w-8 bg-slate-100 rounded-lg ml-auto" /></td>
                  </tr>
                ))
              ) : (
                users?.map((user: any) => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-500 text-sm">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100/50">
                        <ShieldAlert className="w-3 h-3" />
                        {user.roleName}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        user.status === 'ACTIVE' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200/50' 
                          : 'bg-slate-50 text-slate-600 border-slate-200/50'
                      }`}>
                        {user.status === 'ACTIVE' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />}
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white hover:shadow-sm rounded-lg border border-transparent hover:border-slate-200 transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
