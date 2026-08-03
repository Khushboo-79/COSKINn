import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rbacApi } from '../../core/api/rbac';
import { DataTable } from '../../components/ui/DataTable';
import { ShieldCheck, Plus, Edit2, Trash2, AlertTriangle, Eye, X, Calendar, Clock, User, Users, Shield } from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { toast } from 'sonner';
import { format } from 'date-fns';

const PANELS = [
  'admin', 'product', 'inventory', 'orders', 'warehouse',
  'support', 'finance', 'marketing', 'content', 'hr', 'audit'
];

const NA = <span className="text-slate-400 italic text-sm">Not Available</span>;

const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-slate-100 last:border-0 gap-1">
    <span className="text-sm font-medium text-slate-500 shrink-0">{label}</span>
    <span className="text-sm font-semibold text-slate-800 sm:text-right">{value}</span>
  </div>
);

export const RoleManagementScreen = () => {
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [roleToDelete, setRoleToDelete] = useState<any>(null);
  const [statusToChange, setStatusToChange] = useState<{ role: any, newStatus: string } | null>(null);
  const [viewRole, setViewRole] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Inactive'>('all');
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: roles = [] } = useQuery({
    queryKey: ['roles'],
    queryFn: rbacApi.getRoles,
    retry: false,
  });

  // Counts
  const activeCount = useMemo(() => roles.filter((r: any) => (r.status || 'Active') === 'Active').length, [roles]);
  const inactiveCount = useMemo(() => roles.filter((r: any) => r.status === 'Inactive').length, [roles]);

  // Filtered data
  const filteredRoles = useMemo(() => {
    if (statusFilter === 'all') return roles;
    return roles.filter((r: any) => (r.status || 'Active') === statusFilter);
  }, [roles, statusFilter]);

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

  const handleDeleteConfirm = () => {
    if (!roleToDelete) return;
    toast.success('Role deleted successfully (UI only)');
    queryClient.setQueryData(['roles'], (old: any) =>
      old ? old.filter((r: any) => r.id !== roleToDelete.id) : []
    );
    setRoleToDelete(null);
  };

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => rbacApi.updateRole(id, { status }),
    onSuccess: () => {
      toast.success('Role status updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      setStatusToChange(null);
    },
    onError: () => {
      toast.error('Failed to update role status.');
      setStatusToChange(null);
    }
  });

  const handleStatusConfirm = () => {
    if (statusToChange) {
      updateStatusMutation.mutate({ id: statusToChange.role.id, status: statusToChange.newStatus });
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Role Name',
      sortable: true,
      render: (role: any) => <span className="uppercase font-semibold">{role.name}</span>
    },
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
                <StatusBadge key={panel} status={panel} variant="primary" className="capitalize" />
              ))
            )}
          </div>
        );
      }
    },
    {
      key: 'status',
      header: 'Status',
      render: (role: any) => {
        const isSuperAdmin = role.name === 'SUPER_ADMIN';
        const currentStatus = role.status || 'Active';
        const isCurrentlyActive = currentStatus === 'Active';

        return (
          <button
            onClick={() => !isSuperAdmin && setStatusToChange({ role, newStatus: isCurrentlyActive ? 'Inactive' : 'Active' })}
            disabled={isSuperAdmin}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 ${isSuperAdmin ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:shadow-sm hover:-translate-y-0.5'
              } ${isCurrentlyActive
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            title={isSuperAdmin ? "Super Admin role cannot be disabled." : `Click to change status to ${isCurrentlyActive ? 'Inactive' : 'Active'}`}
          >
            <div className={`w-2 h-2 rounded-full shadow-sm ${isCurrentlyActive ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-rose-500 shadow-rose-500/50'}`} />
            <span className="text-xs font-bold uppercase tracking-wider">{isCurrentlyActive ? 'Active' : 'Inactive'}</span>
          </button>
        );
      }
    },
    {
      key: 'actions',
      header: '',
      render: (role: any) => {
        const isSuperAdmin = role.name === 'SUPER_ADMIN';
        return (
          <div className="flex items-center gap-1">
            <button
              onClick={() => !isSuperAdmin && setSelectedRole(role)}
              disabled={isSuperAdmin}
              className={`p-1.5 rounded-lg transition-all duration-200 ${
                isSuperAdmin
                  ? 'text-slate-300 cursor-not-allowed opacity-50'
                  : 'text-[#FF7F50] hover:text-[#ff6b3d] hover:bg-[#FF7F50]/10'
              }`}
              title={isSuperAdmin ? 'Super Admin role cannot be edited.' : 'Edit Role'}
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => !isSuperAdmin && setRoleToDelete(role)}
              disabled={isSuperAdmin}
              className={`p-1.5 rounded-lg transition-all duration-200 ${isSuperAdmin
                  ? 'text-slate-300 cursor-not-allowed opacity-50'
                  : 'text-[#FF7F50] hover:text-[#ff6b3d] hover:bg-[#FF7F50]/10'
                }`}
              title={isSuperAdmin ? "Super Admin role cannot be deleted." : "Delete Role"}
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewRole(role)}
              className="p-1.5 rounded-lg transition-all duration-200 text-[#FF7F50] hover:text-[#ff6b3d] hover:bg-[#FF7F50]/10"
              title="View Role Details"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        );
      }
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
          onClick={() => setSelectedRole({ name: 'New Role', panelAccess: [] })}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-xl shadow-sm text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </button>
      </div>

      {/* Status Filter Dropdown - Right Aligned */}
      <div className="flex justify-end">
      <div className="relative w-full sm:w-64">
        <button
          onClick={() => setFilterDropdownOpen(prev => !prev)}
          className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-[#FF7F50]/50 focus:outline-none focus:ring-2 focus:ring-[#FF7F50]/20 transition-all shadow-sm"
        >
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            <span className="text-slate-600">
              {statusFilter === 'all' ? 'All Roles' : statusFilter}
            </span>
            <span className="ml-1 text-xs font-bold px-1.5 py-0.5 rounded-full bg-[#FF7F50]/10 text-[#FF7F50]">
              {statusFilter === 'all' ? roles.length : statusFilter === 'Active' ? activeCount : inactiveCount}
            </span>
          </div>
          <svg
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${filterDropdownOpen ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {filterDropdownOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-10" onClick={() => setFilterDropdownOpen(false)} />
            {/* Dropdown Menu */}
            <div className="absolute left-0 top-full mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden">
              {([
                { key: 'all', label: 'All Roles', count: roles.length },
                { key: 'Active', label: 'Active', count: activeCount },
                { key: 'Inactive', label: 'Inactive', count: inactiveCount },
              ] as const).map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => { setStatusFilter(key); setFilterDropdownOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    statusFilter === key
                      ? 'bg-[#FF7F50]/10 text-[#FF7F50] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      key === 'all' ? 'bg-slate-400' : key === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'
                    }`} />
                    {label}
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    statusFilter === key ? 'bg-[#FF7F50]/20 text-[#FF7F50]' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      </div>


      <div className="hidden md:block">
        <DataTable
          data={filteredRoles}
          columns={columns}
          searchPlaceholder="Search roles..."
          searchableKeys={['name', 'description']}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredRoles.map((role: any) => {
          const isSuperAdmin = role.name === 'SUPER_ADMIN';
          const accessKeys = role.panelAccess || role.panel_access || [];
          return (
            <div key={role.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className="font-bold text-slate-900 uppercase">{role.name}</div>
                <button
                  onClick={() => !isSuperAdmin && setStatusToChange({ role, newStatus: (role.status || 'Active') === 'Active' ? 'Inactive' : 'Active' })}
                  disabled={isSuperAdmin}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all ${isSuperAdmin ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
                    } ${(role.status || 'Active') === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  title={isSuperAdmin ? "Super Admin role cannot be disabled." : "Click to change status"}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${((role.status || 'Active') === 'Active') ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{role.status || 'Active'}</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-1">
                {accessKeys.includes('admin') || accessKeys.length === PANELS.length ? (
                  <StatusBadge status="All Panels (Super Admin)" variant="success" />
                ) : (
                  accessKeys.map((panel: string) => (
                    <StatusBadge key={panel} status={panel} variant="primary" className="capitalize" />
                  ))
                )}
              </div>
              <div className="flex justify-end gap-1 mt-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => !isSuperAdmin && setSelectedRole(role)}
                  disabled={isSuperAdmin}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-colors font-medium ${
                    isSuperAdmin
                      ? 'text-slate-300 cursor-not-allowed opacity-50'
                      : 'text-[#FF7F50] hover:text-[#ff6b3d] hover:bg-[#FF7F50]/10'
                  }`}
                  title={isSuperAdmin ? 'Super Admin role cannot be edited.' : 'Edit Role'}
                >
                  <Edit2 className="h-4 w-4" /> Edit
                </button>
                <button
                  onClick={() => !isSuperAdmin && setRoleToDelete(role)}
                  disabled={isSuperAdmin}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-colors font-medium ${isSuperAdmin
                      ? 'text-slate-300 cursor-not-allowed opacity-50'
                      : 'text-[#FF7F50] hover:text-[#ff6b3d] hover:bg-[#FF7F50]/10'
                    }`}
                  title={isSuperAdmin ? "Super Admin role cannot be deleted." : "Delete Role"}
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
                <button
                  onClick={() => setViewRole(role)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-colors font-medium text-[#FF7F50] hover:text-[#ff6b3d] hover:bg-[#FF7F50]/10"
                  title="View Role Details"
                >
                  <Eye className="h-4 w-4" /> View
                </button>
              </div>
            </div>
          );
        })}
        {filteredRoles.length === 0 && (
          <div className="text-center py-10 bg-white rounded-xl border border-slate-100 text-slate-500">
            No roles found.
          </div>
        )}
      </div>

      {/* Role Editor Modal */}
      {selectedRole && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-900 uppercase">
                Edit Role: {selectedRole.name}
              </h3>
              <button onClick={() => setSelectedRole(null)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">&times;</button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Role Name</label>
                  <input
                    type="text"
                    value={selectedRole.name}
                    onChange={(e) => setSelectedRole({ ...selectedRole, name: e.target.value })}
                    disabled={selectedRole.name === 'SUPER_ADMIN'}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 disabled:bg-slate-50 disabled:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-3 border-b pb-2">Panel Access Matrix</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PANELS.map((panel) => {
                      const accessKeys = selectedRole.panelAccess || selectedRole.panel_access || [];
                      const hasAccess = accessKeys.includes(panel) || accessKeys.includes('admin');
                      const isSuperAdmin = selectedRole.name === 'SUPER_ADMIN';
                      return (
                        <div key={panel} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                          <input
                            type="checkbox"
                            checked={hasAccess}
                            onChange={(e) => {
                              const newAccess = e.target.checked
                                ? [...accessKeys, panel]
                                : accessKeys.filter((k: string) => k !== panel);
                              setSelectedRole({ ...selectedRole, panelAccess: newAccess });
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
                    panelAccess: selectedRole.panelAccess || selectedRole.panel_access || []
                  };
                  if (selectedRole.id) {
                    updateMutation.mutate({ id: selectedRole.id, data: { name: selectedRole.name, panelAccess: selectedRole.panelAccess || selectedRole.panel_access } });
                  } else {
                    createMutation.mutate(payload);
                  }
                }}
                disabled={selectedRole.name === 'SUPER_ADMIN' || createMutation.isPending || updateMutation.isPending}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50"
              >
                {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {roleToDelete && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Delete Role</h2>
              <p className="text-slate-500 mb-6">
                Are you sure you want to delete the <strong className="text-slate-900 uppercase">{roleToDelete.name}</strong> role? This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setRoleToDelete(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 font-medium rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors shadow-sm shadow-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Change Modal */}
      {statusToChange && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Change Role Status</h2>
              <p className="text-slate-500 mb-6">
                Are you sure you want to change this role status?
              </p>

              <div className="bg-slate-50 p-4 rounded-xl mb-6 space-y-3 border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500">Role:</span>
                  <span className="text-sm font-bold text-slate-900 uppercase">{statusToChange.role.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500">Current Status:</span>
                  <span className={`text-sm font-bold ${statusToChange.role.status === 'Inactive' ? 'text-red-600' : 'text-emerald-600'}`}>
                    {statusToChange.role.status || 'Active'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-500">New Status:</span>
                  <span className={`text-sm font-bold ${statusToChange.newStatus === 'Inactive' ? 'text-red-600' : 'text-emerald-600'}`}>
                    {statusToChange.newStatus}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setStatusToChange(null)}
                  disabled={updateStatusMutation.isPending}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 font-medium rounded-xl transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusConfirm}
                  disabled={updateStatusMutation.isPending}
                  className="px-4 py-2 bg-[#FF7F50] hover:bg-[#ff6b3d] text-white font-medium rounded-xl transition-colors shadow-sm shadow-[#FF7F50]/30 flex items-center gap-2 disabled:opacity-50"
                >
                  {updateStatusMutation.isPending ? 'Updating...' : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Role Details Modal */}
      {viewRole && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-gradient-to-r from-[#FF7F50]/5 to-orange-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF7F50]/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-[#FF7F50]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 uppercase">{viewRole.name}</h2>
                  <p className="text-xs text-slate-500">Role Details</p>
                </div>
              </div>
              <button
                onClick={() => setViewRole(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">

              {/* Status + Users Summary */}
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${(viewRole.status || 'Active') === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    <span className="text-xs font-medium text-slate-500">Status</span>
                  </div>
                  <span className={`text-sm font-bold ${(viewRole.status || 'Active') === 'Active' ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {viewRole.status || 'Active'}
                  </span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-xs font-medium text-slate-500">Assigned Users</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">
                    {viewRole._count?.users ?? viewRole._count?.users === 0 ? viewRole._count.users : 'Not Available'}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="bg-white rounded-xl border border-slate-100 px-4 divide-y divide-slate-50">
                <DetailRow
                  label="Role Name"
                  value={<span className="uppercase">{viewRole.name}</span>}
                />
                <DetailRow
                  label="Description"
                  value={viewRole.description || NA}
                />
                <DetailRow
                  label="Panels Access"
                  value={
                    <div className="flex flex-wrap gap-1 justify-end">
                      {(() => {
                        const accessKeys = viewRole.panelAccess || viewRole.panel_access || [];
                        if (accessKeys.length === 0) return NA;
                        if (accessKeys.includes('admin') || accessKeys.length === PANELS.length) {
                          return <StatusBadge status="All Panels" variant="success" />;
                        }
                        return accessKeys.map((p: string) => (
                          <StatusBadge key={p} status={p} variant="primary" className="capitalize" />
                        ));
                      })()}
                    </div>
                  }
                />
                <DetailRow
                  label="Total Assigned Users"
                  value={
                    viewRole._count?.users !== undefined
                      ? <span className="flex items-center gap-1"><User className="h-3.5 w-3.5 text-slate-400" />{viewRole._count.users} user{viewRole._count.users !== 1 ? 's' : ''}</span>
                      : NA
                  }
                />
                <DetailRow
                  label="Created Date"
                  value={
                    viewRole.createdAt
                      ? <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-slate-400" />{format(new Date(viewRole.createdAt), 'dd MMM yyyy, hh:mm a')}</span>
                      : NA
                  }
                />
                <DetailRow
                  label="Last Updated"
                  value={
                    viewRole.updatedAt
                      ? <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-slate-400" />{format(new Date(viewRole.updatedAt), 'dd MMM yyyy, hh:mm a')}</span>
                      : NA
                  }
                />
                <DetailRow label="Last Active Date & Time" value={NA} />
                <DetailRow label="Last Login Date & Time" value={NA} />
                <DetailRow label="Created By" value={NA} />
                <DetailRow label="Updated By" value={NA} />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setViewRole(null)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-xl transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
