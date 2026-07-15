import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { ShieldCheck, UserPlus, Lock } from 'lucide-react';

export const SecurityScreen = () => {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');

  const { data: roles, isLoading: rolesLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const { data } = await api.get('/admin/config/roles');
      return data;
    },
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['internalUsers'],
    queryFn: async () => {
      const { data } = await api.get('/admin/config/users');
      return data;
    },
  });

  const assignRoleMutation = useMutation({
    mutationFn: (body: { userId: string, roleName: string }) => api.post('/admin/config/users/assign-role', body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['internalUsers'] });
      alert('Role assigned successfully!');
      setSelectedUser('');
      setSelectedRole('');
    }
  });

  const handleAssignRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !selectedRole) return alert('Select user and role');
    assignRoleMutation.mutate({ userId: selectedUser, roleName: selectedRole });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
          <ShieldCheck className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Security & Access Control</h2>
          <p className="text-gray-500">Manage internal panel roles, permissions, and user access levels.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Roles Overview */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl shadow-indigo-100/20 overflow-hidden p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-500" />
              System Roles
            </h3>
            {rolesLoading ? (
              <p className="text-gray-400 text-sm">Loading roles...</p>
            ) : (
              <div className="space-y-3">
                {roles?.map((role: any) => (
                  <div key={role.id} className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:border-indigo-200 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-gray-900">{role.name}</h4>
                      <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-2 py-0.5 rounded-full">
                        {role._count?.users || 0} Users
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{role.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: User Mapping */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl shadow-indigo-100/20 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-white/40 to-transparent">
              <h3 className="text-lg font-bold text-gray-900">Assign Role to User</h3>
              <p className="text-sm text-gray-500">Elevate an existing customer account to an internal dashboard user.</p>
              
              <form onSubmit={handleAssignRole} className="mt-4 flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">User ID / Email</label>
                  <input 
                    type="text" 
                    placeholder="Enter user ID..."
                    value={selectedUser}
                    onChange={e => setSelectedUser(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Select Role</label>
                  <select 
                    value={selectedRole}
                    onChange={e => setSelectedRole(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  >
                    <option value="">-- Choose Role --</option>
                    {roles?.map((r: any) => (
                      <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>
                <button 
                  type="submit"
                  disabled={assignRoleMutation.isPending}
                  className="bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <UserPlus className="w-4 h-4" />
                  {assignRoleMutation.isPending ? 'Assigning...' : 'Assign'}
                </button>
              </form>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Internal Users Directory</h3>
              {usersLoading ? (
                <p className="text-gray-400 text-sm">Loading users...</p>
              ) : users?.length === 0 ? (
                <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  No internal users found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                        <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Roles</th>
                        <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Added On</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {users?.map((user: any) => (
                        <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-3 text-sm font-bold text-gray-900">{user.firstName} {user.lastName}</td>
                          <td className="py-3 text-sm text-gray-600">{user.email}</td>
                          <td className="py-3 text-sm">
                            <div className="flex gap-1 flex-wrap">
                              {user.roles.map((ur: any) => (
                                <span key={ur.roleId} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-md text-xs font-medium">
                                  {ur.role.name}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 text-sm text-gray-500 text-right">{new Date(user.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
