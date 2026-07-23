import { toast } from 'sonner';

import { useQuery, useMutation } from '@tanstack/react-query';
import { adminApi } from '../../core/api/admin';
import { DataTable } from '../../components/ui/DataTable';
import { ShieldAlert, RefreshCcw } from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';

export const StaffTwoFactorScreen = () => {
  const { data: staff2fa = [
    { id: '1', name: 'John Doe', email: 'john@coskinn.com', is2FAEnabled: true, lastLogin: '2026-07-18 10:30 AM' },
    { id: '2', name: 'Jane Smith', email: 'jane@coskinn.com', is2FAEnabled: false, lastLogin: '2026-07-17 04:15 PM' },
  ], refetch } = useQuery({
    queryKey: ['staff2fa'],
    queryFn: adminApi.getStaff2FAStatus,
    retry: false,
  });

  const resetMutation = useMutation({
    mutationFn: adminApi.resetStaff2FA,
    onSuccess: () => {
      toast.success();
      refetch();
    },
    onError: () => {
      toast.error();
    }
  });

  const handleReset = (userId: string, name: string) => {
    if (window.confirm(`Are you sure you want to force reset 2FA for ${name}? They will need to re-enroll on next login.`)) {
      resetMutation.mutate(userId);
    }
  };

  const columns = [
    { key: 'name', header: 'Staff Name', sortable: true },
    { key: 'email', header: 'Email' },
    { 
      key: 'is2FAEnabled', 
      header: '2FA Status',
      render: (staff: any) => (
        <StatusBadge 
          status={staff.is2FAEnabled ? 'Enabled & Active' : 'Not Enrolled'} 
          variant={staff.is2FAEnabled ? 'success' : 'warning'} 
        />
      )
    },
    { key: 'lastLogin', header: 'Last Login' },
    {
      key: 'actions',
      header: 'Actions',
      render: (staff: any) => (
        <button 
          onClick={() => handleReset(staff.id, staff.name)}
          disabled={!staff.is2FAEnabled || resetMutation.isPending}
          className="flex items-center px-3 py-1.5 text-sm font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCcw className="h-4 w-4 mr-1.5" />
          Force Reset 2FA
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 text-primary-500" />
          Staff 2FA Security
        </h1>
        <p className="text-slate-500 mt-1">Monitor 2FA enrollment and force resets for lost devices.</p>
      </div>

      <div className="bg-blue-50 border border-blue-100 text-blue-800 p-4 rounded-xl flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 mt-0.5 flex-shrink-0 text-blue-600" />
        <div className="text-sm">
          <p className="font-semibold mb-1">Mandatory 2FA Policy is Active</p>
          <p>All staff accounts, including Super Admins, must enroll in 2FA. Users without 2FA will be forced to enroll on their next login attempt.</p>
        </div>
      </div>

      <DataTable 
        data={staff2fa} 
        columns={columns} 
        searchPlaceholder="Search staff..."
        onSearch={(term) => console.log('Search:', term)}
      />
    </div>
  );
};
