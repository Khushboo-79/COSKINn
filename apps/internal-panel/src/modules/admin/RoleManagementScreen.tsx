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
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form state
  const [formData, setFormData] = useState({ name: '', panelAccess: [] as string[] });

  const { data: roles = [], isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: rbacApi.getRoles,
  });

  const createMutation = useMutation({
    mutationFn: rbacApi.createRole,
    onSuccess: () => {
      toast.success('Role created successfully');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      setIsCreating(false);
      setFormData({ name: '', panelAccess: [] });
    },
    onError: () => toast.error('Failed to create role')
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string, payload: any }) => rbacApi.updateRole(data.id, data.payload),
    onSuccess: () => {
      toast.success('Role updated successfully');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      setSelectedRole(null);
    },
    onError: () => toast.error('Failed to update role')
  });

  const handleOpenEdit = (role: any) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      panelAccess: role.panelAccess || []
    });
  };

  const handleOpenCreate = () => {
    setIsCreating(true);
    setFormData({ name: '', panelAccess: [] });
  };

  const handleTogglePanel = (panel: string) => {
    setFormData(prev => {
      if (prev.panelAccess.includes(panel)) {
        return { ...prev, panelAccess: prev.panelAccess.filter(p => p !== panel) };
      } else {
        return { ...prev, panelAccess: [...prev.panelAccess, panel] };
      }
    });
  };

  const handleSave = () => {
    if (isCreating) {
      if (!formData.name.trim()) return toast.error('Role name is required');
      createMutation.mutate(formData);
    } else if (selectedRole) {
      updateMutation.mutate({ id: selectedRole.id, payload: formData });
    }
  };

  const columns = [
    { key: 'name', header: 'Role Name', sortable: true },
    { 
      key: 'panel_access', 
      header: 'Panels Access',
      render: (role: any) => {
        const accessKeys = role.panelAccess || [];
        return (
          <div className="flex flex-wrap gap-1">
            {accessKeys.includes('admin') ? (
              <StatusBadge status="All Panels (Super Admin)" variant="success" />
            ) : accessKeys.length === 0 ? (
               <StatusBadge status="No Access" variant="default" />
            ) : (
              accessKeys.map((panel: string) => (
                <StatusBadge key={panel} status={panel} variant="info" className="capitalize" />
              ))
            )}
          </div>
        );
      }
    },
    {
      key: 'users',
      header: 'Users',
      render: (role: any) => <span>{role._count?.users || 0}</span>
    },
    {
      key: 'actions',
      header: '',
      render: (role: any) => (
        <button 
          onClick={() => handleOpenEdit(role)}
          className="p-1.5 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
        >
          <Edit2 className="h-4 w-4" />
        </button>
      )
    }
  ];

  const isModalOpen = selectedRole !== null || isCreating;

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
        <button onClick={handleOpenCreate} className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-xl shadow-sm text-sm font-medium hover:bg-primary-700 transition-colors">
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-900">
                {isCreating ? 'Create New Role' : `Edit Role: ${selectedRole?.name}`}
              </h3>
              <button onClick={() => { setSelectedRole(null); setIsCreating(false); }} className="text-slate-400 hover:text-slate-600 font-bold text-xl">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Role Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    disabled={selectedRole?.name === 'SUPER_ADMIN'} 
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 disabled:bg-slate-50 disabled:text-slate-500" 
                    placeholder="e.g. HR Manager"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-3 border-b pb-2">Panel Access Matrix</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PANELS.map((panel) => {
                      const hasAccess = formData.panelAccess.includes(panel) || formData.panelAccess.includes('admin');
                      const isSuperAdmin = formData.panelAccess.includes('admin') && panel !== 'admin';
                      return (
                        <div key={panel} className={`flex items-start space-x-3 p-3 border rounded-lg transition-colors ${hasAccess ? 'bg-primary-50/50 border-primary-200' : 'hover:bg-slate-50'}`}>
                          <input 
                            type="checkbox" 
                            checked={hasAccess} 
                            onChange={() => handleTogglePanel(panel)}
                            disabled={isSuperAdmin || selectedRole?.name === 'SUPER_ADMIN'}
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
              <button onClick={() => { setSelectedRole(null); setIsCreating(false); }} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-slate-100">Cancel</button>
              <button 
                onClick={handleSave}
                disabled={(selectedRole?.name === 'SUPER_ADMIN' && !isCreating) || createMutation.isPending || updateMutation.isPending} 
                className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50"
              >
                {isCreating ? 'Create Role' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
