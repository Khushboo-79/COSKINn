import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rbacApi } from '../../core/api/rbac';
import { DataTable } from '../../components/ui/DataTable';
import { ShieldCheck, Plus, Edit2 } from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { toast } from 'sonner';

const PANELS = [
  'admin', 'product', 'inventory', 'orders', 'warehouse', 
  'support', 'finance', 'marketing', 'content', 'hr', 'audit'
];

export const RoleManagementScreen = () => {
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: roles = [], refetch } = useQuery({
    queryKey: ['roles'],
    queryFn: rbacApi.getRoles,
    retry: false, 
  });

  const createMutation = useMutation({
    mutationFn: rbacApi.createRole,
    onSuccess: () => {
      toast.success('Role created successfully!');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      setSelectedRole(null);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => rbacApi.updateRole(id, data),
    onSuccess: () => {
      toast.success('Role updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      setSelectedRole(null);
    }
  });

  const columns = [
    { key: 'name', header: 'Role Name', sortable: true },
    { 
      key: 'panel_access', 
      header: 'Panels Access',
      render: (role: any) => {
        const accessKeys = role.panelAccess || role.panel_access || [];
        return (
          <div className="flex flex-wrap gap-1">
            {accessKeys.includes('admin') || accessKeys.length === PANELS.length ? (
              <StatusBadge status="All Panels (Super Admin)" variant="success" />
            ) : (
              accessKeys.map((panel: string) => (
                <StatusBadge key={panel} status={panel} variant="info" className="capitalize" />
              ))
            )}
          </div>
        );
      }
    },
      key: 'status',
      header: 'Status',
      render: (role: any) => (
        <StatusBadge 
          status={role.isActive !== false ? '● ACTIVE' : '● INACTIVE'} 
          variant={role.isActive !== false ? 'success' : 'default'} 
        />
      )
    },
    {
      key: 'actions',
      header: '',
      render: (role: any) => (
        <button 
          onClick={() => setSelectedRole(role)}
          className="p-1.5 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
        >
          <Edit2 className="h-4 w-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary-500" />
            Role & Permission Management
          </h1>
          <p className="text-slate-500 mt-1">Manage system roles and their access to various panels.</p>
        </div>
        <button 
          onClick={() => setSelectedRole({ name: 'New Role', panelAccess: [], isActive: true })}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-xl shadow-sm text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </button>
      </div>

      <DataTable 
        data={roles} 
        columns={columns} 
        searchPlaceholder="Search roles..."
        onSearch={(term) => console.log('Search:', term)}
      />

      {/* Role Editor Modal/Drawer (Simplified for now) */}
      {selectedRole && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-900">
                Edit Role: {selectedRole.name}
              </h3>
              <button onClick={() => setSelectedRole(null)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Role Name</label>
                    <input 
                      type="text" 
                      value={selectedRole.name} 
                      onChange={(e) => setSelectedRole({...selectedRole, name: e.target.value})}
                      disabled={selectedRole.name === 'Super Admin'} 
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 disabled:bg-slate-50 disabled:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500" 
                    />
                  </div>
                  <div className="w-32">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                    <select
                      value={selectedRole.isActive !== false ? 'true' : 'false'}
                      onChange={(e) => setSelectedRole({...selectedRole, isActive: e.target.value === 'true'})}
                      disabled={selectedRole.name === 'Super Admin'}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 disabled:bg-slate-50 disabled:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-3 border-b pb-2">Panel Access Matrix</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PANELS.map((panel) => {
                      const accessKeys = selectedRole.panelAccess || selectedRole.panel_access || [];
                      const hasAccess = accessKeys.includes(panel) || accessKeys.includes('admin');
                      const isSuperAdmin = selectedRole.name === 'Super Admin';
                      return (
                        <div key={panel} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                          <input 
                            type="checkbox" 
                            checked={hasAccess} 
                            onChange={(e) => {
                              const newAccess = e.target.checked 
                                ? [...accessKeys, panel] 
                                : accessKeys.filter((k: string) => k !== panel);
                              setSelectedRole({...selectedRole, panelAccess: newAccess});
                            }}
                            disabled={isSuperAdmin}
                            className="mt-1 h-4 w-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500 disabled:opacity-50" 
                          />
                          <div>
                            <p className="text-sm font-medium text-slate-800 capitalize">{panel} Panel</p>
                            <p className="text-xs text-slate-500">Access to {panel} dashboard and features.</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end space-x-3">
              <button onClick={() => setSelectedRole(null)} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-slate-100">Cancel</button>
              <button 
                onClick={() => {
                  const payload = {
                    name: selectedRole.name,
                    panelAccess: selectedRole.panelAccess || selectedRole.panel_access || [],
                    isActive: selectedRole.isActive !== false
                  };
                  if (selectedRole.id) {
                    updateMutation.mutate({ id: selectedRole.id, data: payload });
                  } else {
                    createMutation.mutate(payload);
                  }
                }}
                disabled={selectedRole.name === 'Super Admin' || createMutation.isPending || updateMutation.isPending} 
                className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50"
              >
                {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
