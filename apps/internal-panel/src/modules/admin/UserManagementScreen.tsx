import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rbacApi } from '../../core/api/rbac';
import { DataTable } from '../../components/ui/DataTable';
import { Users, Plus, Edit2, ShieldAlert } from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { toast } from 'sonner';

export const UserManagementScreen = () => {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', roleId: ''
  });

  const { data: rawUsers = [] } = useQuery({
    queryKey: ['users'],
    queryFn: rbacApi.getUsers,
  });

  const { data: roles = [] } = useQuery({
    queryKey: ['roles'],
    queryFn: rbacApi.getRoles,
  });

  const createMutation = useMutation({
    mutationFn: rbacApi.createUser,
    onSuccess: () => {
      toast.success('User created successfully. Default password is password123');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsCreating(false);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', roleId: '' });
    },
    onError: () => toast.error('Failed to create user')
  });

  const updateRoleMutation = useMutation({
    mutationFn: (data: { userId: string, roleId: string }) => rbacApi.updateUserRole(data.userId, { roleId: data.roleId }),
    onSuccess: () => {
      toast.success('User role updated successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setSelectedUser(null);
    },
    onError: () => toast.error('Failed to update user role')
  });

  const users = Array.isArray(rawUsers) ? rawUsers.map((u: any) => ({
    id: u.id,
    name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Unknown',
    email: u.email,
    role: u.roles?.[0]?.role?.name || 'No Role',
    roleId: u.roles?.[0]?.role?.id,
    status: u.isDeleted ? 'Inactive' : 'Active'
  })) : [];

  const handleOpenEdit = (user: any) => {
    setSelectedUser(user);
    setFormData({ ...formData, roleId: user.roleId || '' });
  };

  const handleOpenCreate = () => {
    setIsCreating(true);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', roleId: '' });
  };

  const handleSave = () => {
    if (isCreating) {
      if (!formData.email || !formData.roleId) return toast.error('Email and Role are required');
      createMutation.mutate(formData);
    } else if (selectedUser) {
      if (!formData.roleId) return toast.error('Role is required');
      updateRoleMutation.mutate({ userId: selectedUser.id, roleId: formData.roleId });
    }
  };

  const columns = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { 
      key: 'role', 
      header: 'Assigned Role',
      render: (user: any) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-sm font-medium">
          {user.role === 'SUPER_ADMIN' && <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />}
          {user.role}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (user: any) => (
        <StatusBadge 
          status={user.status} 
          variant={user.status === 'Active' ? 'success' : 'danger'} 
        />
      )
    },
    {
      key: 'actions',
      header: '',
      render: (user: any) => (
        <button 
          onClick={() => handleOpenEdit(user)}
          className="p-1.5 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
        >
          <Edit2 className="h-4 w-4" />
        </button>
      )
    }
  ];

  const isModalOpen = selectedUser !== null || isCreating;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="h-6 w-6 text-primary-500" />
            Internal Users
          </h1>
          <p className="text-slate-500 mt-1">Manage staff accounts and their role assignments.</p>
        </div>
        <button onClick={handleOpenCreate} className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-xl shadow-sm text-sm font-medium hover:bg-primary-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      <DataTable 
        data={users} 
        columns={columns} 
        searchPlaceholder="Search users by name or email..."
        onSearch={(term) => console.log('Search:', term)}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
              <h3 className="font-bold text-lg text-slate-900">
                {isCreating ? 'Create New Staff User' : `Edit Role: ${selectedUser?.name}`}
              </h3>
              <button onClick={() => { setSelectedUser(null); setIsCreating(false); }} className="text-slate-400 hover:text-slate-600 font-bold text-xl">&times;</button>
            </div>
            
            <div className="p-6 space-y-4">
              {isCreating && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                      <input 
                        type="text" 
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                      <input 
                        type="text" 
                        value={formData.lastName}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <input 
                      type="text" 
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500" 
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Assigned Role</label>
                <select 
                  value={formData.roleId}
                  onChange={e => setFormData({ ...formData, roleId: e.target.value })}
                  disabled={selectedUser?.role === 'SUPER_ADMIN'}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 disabled:bg-slate-50"
                >
                  <option value="" disabled>Select a role...</option>
                  {roles.map((r: any) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
                {selectedUser?.role === 'SUPER_ADMIN' && (
                  <p className="text-xs text-amber-600 mt-1">Super Admin role cannot be changed from this UI.</p>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end space-x-3 rounded-b-2xl">
              <button onClick={() => { setSelectedUser(null); setIsCreating(false); }} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-slate-100">Cancel</button>
              <button 
                onClick={handleSave}
                disabled={(selectedUser?.role === 'SUPER_ADMIN' && !isCreating) || createMutation.isPending || updateRoleMutation.isPending} 
                className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50"
              >
                {isCreating ? 'Create User' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
