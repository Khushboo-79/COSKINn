// Force HMR reload
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rbacApi } from '../../core/api/rbac';
import { DataTable } from '../../components/ui/DataTable';
import { Users, Plus, Edit2, ShieldAlert } from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { toast } from 'sonner';

export const UserManagementScreen = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: rawUsers = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: rbacApi.getUsers,
    retry: false,
  });


  const users = Array.isArray(rawUsers) ? rawUsers.map((u: any) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Unknown',
    email: u.email,
    role: u.roles?.[0]?.role?.name || 'No Role',
    roleId: u.roles?.[0]?.roleId || '',
    status: u.isDeleted ? 'Inactive' : 'Active'
  })) : [];

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
          onClick={() => setSelectedUser(user)}
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
            <Users className="h-6 w-6 text-primary-500" />
            Internal Users
          </h1>
          <p className="text-slate-500 mt-1">Manage staff accounts and their role assignments.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-xl shadow-sm text-sm font-medium hover:bg-primary-700 transition-colors"
        >
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

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-900">Add New User</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">&times;</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              createMutation.mutate({
                firstName: formData.get('firstName') as string,
                lastName: formData.get('lastName') as string,
                email: formData.get('email') as string,
                roleId: formData.get('roleId') as string,
              });
            }} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input name="firstName" required className="w-full border border-slate-200 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input name="lastName" required className="w-full border border-slate-200 rounded-lg px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input name="email" type="email" required className="w-full border border-slate-200 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <select name="roleId" required className="w-full border border-slate-200 rounded-lg px-3 py-2">
                  <option value="">Select a role...</option>
                  {roles.map((r: any) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" disabled={createMutation.isPending} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  {createMutation.isPending ? 'Saving...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-900">Edit User Role: {selectedUser.name}</h3>
              <button onClick={() => setSelectedUser(null)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">&times;</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              updateRoleMutation.mutate({
                id: selectedUser.id,
                data: { roleId: formData.get('roleId') }
              });
            }} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <select name="roleId" defaultValue={selectedUser.roleId} required className="w-full border border-slate-200 rounded-lg px-3 py-2">
                  {roles.map((r: any) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setSelectedUser(null)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" disabled={updateRoleMutation.isPending} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  {updateRoleMutation.isPending ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
