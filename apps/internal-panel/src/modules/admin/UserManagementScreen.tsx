import { useQuery } from '@tanstack/react-query';
import { rbacApi } from '../../core/api/rbac';
import { DataTable } from '../../components/ui/DataTable';
import { Users, Plus, Edit2, ShieldAlert } from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';

export const UserManagementScreen = () => {
  // Use mock data until API is wired
  const { data: rawUsers = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: rbacApi.getUsers,
    retry: false,
  });

  const users = Array.isArray(rawUsers) ? rawUsers.map((u: any) => ({
    id: u.id,
    name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Unknown',
    email: u.email,
    role: u.roles?.[0]?.role?.name || 'No Role',
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
          {user.role === 'Super Admin' && <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />}
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
      render: () => (
        <button className="p-1.5 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
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
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-xl shadow-sm text-sm font-medium hover:bg-primary-700 transition-colors">
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
    </div>
  );
};
