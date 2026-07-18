import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { ShieldCheck, Plus, Edit2, Key, Check } from 'lucide-react';

export default function RolesPermissionsScreen() {
  const [selectedRole, setSelectedRole] = useState<any>(null);

  const { data: roles, isLoading: rolesLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const { data } = await api.get('/admin/config/roles');
      return data;
    },
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Role Management</h1>
            <p className="text-sm text-slate-500 mt-1">Configure access levels and module permissions</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-medium shadow-md hover:bg-slate-800 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <Plus className="w-4 h-4" />
          Create Role
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Roles List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 px-1">Active Roles</h2>
          {rolesLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-white rounded-xl border border-slate-100 shadow-sm animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {roles?.map((role: any) => (
                <div 
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    selectedRole?.id === role.id 
                      ? 'bg-white border-violet-500 shadow-md shadow-violet-500/10' 
                      : 'bg-white border-slate-200/60 shadow-sm hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <Key className={`w-4 h-4 ${selectedRole?.id === role.id ? 'text-violet-500' : 'text-slate-400'}`} />
                      {role.name}
                    </h3>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                      {role.userCount}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{role.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Permissions Matrix */}
        <div className="lg:col-span-2">
          {selectedRole ? (
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Permissions: {selectedRole.name}</h2>
                  <p className="text-sm text-slate-500 mt-1">Select the exact capabilities for this role.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                  <Edit2 className="w-4 h-4" />
                  Edit Role Info
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Mocking the matrix for UI demo */}
                {['Product Management', 'Inventory & Warehouse', 'Order Management', 'Finance', 'Admin Settings'].map((module) => (
                  <div key={module} className="space-y-4">
                    <h3 className="font-semibold text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-violet-500" />
                      {module}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['Read Access', 'Create Records', 'Update Records', 'Delete Records'].map((perm) => {
                        const isChecked = selectedRole.name === 'super-admin' || Math.random() > 0.5;
                        return (
                          <label key={perm} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${isChecked ? 'bg-violet-50/50 border-violet-200' : 'bg-slate-50 border-slate-200'}`}>
                            <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${isChecked ? 'bg-violet-500 border-violet-500' : 'bg-white border-slate-300'}`}>
                              {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <div>
                              <p className={`text-sm font-medium ${isChecked ? 'text-violet-900' : 'text-slate-700'}`}>{perm}</p>
                              <p className="text-xs text-slate-500 mt-0.5">Allows role to {perm.toLowerCase()} in {module}.</p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <button className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors">
                  Discard Changes
                </button>
                <button className="px-5 py-2.5 rounded-xl text-sm font-medium bg-violet-500 hover:bg-violet-600 text-white shadow-sm shadow-violet-500/20 transition-all hover:-translate-y-0.5">
                  Save Permissions
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              <ShieldCheck className="w-12 h-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-600">No Role Selected</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-sm text-center">Select a role from the sidebar to view and manage its permissions matrix.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
