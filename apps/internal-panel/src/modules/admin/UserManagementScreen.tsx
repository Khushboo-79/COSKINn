import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rbacApi } from '../../core/api/rbac';
import { DataTable } from '../../components/ui/DataTable';
import { 
  Users, Plus, Edit2, ShieldAlert, Search, Filter, 
  Eye, Ban, CheckCircle, Star, Trash2, User, 
  Calendar, Clock, Monitor, Smartphone, Activity, 
  MapPin, CreditCard, Lock, X, Phone, Mail, Check
} from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { toast } from 'sonner';

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Not Available';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 'Not Available';
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return 'Not Available';
  }
};

export const UserManagementScreen = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null); // For Edit
  const [viewUser, setViewUser] = useState<any>(null); // For View Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Users');
  const [membershipFilter, setMembershipFilter] = useState('All Memberships');
  const [isNewTodayFilter, setIsNewTodayFilter] = useState(false);

  const queryClient = useQueryClient();

  const { data: rawUsers = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await rbacApi.getUsers();
      console.log('API Response (getUsers):', res);
      return res;
    },
    retry: false,
  });

  const { data: roles = [] } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const res = await rbacApi.getRoles();
      console.log('API Response (getRoles):', res);
      return res;
    },
    retry: false,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: rbacApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsAddModalOpen(false);
      toast.success('User created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create user');
    }
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: { roleId: string } }) => rbacApi.updateUserRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setSelectedUser(null);
      toast.success('User role updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update user role');
    }
  });

  const triggerUpgradeMutation = useMutation({
    mutationFn: rbacApi.triggerUpgrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Automatic Membership Computation Triggered Successfully!');
    },
    onError: () => {
      toast.error('Failed to trigger membership computation');
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: rbacApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User has been successfully deleted (Soft Delete)');
    },
    onError: () => {
      toast.error('Failed to delete user');
    }
  });

  const handleDelete = (userId: string) => {
    if (window.confirm('Are you sure you want to deactivate/delete this user? They will no longer be able to log in or appear in this list.')) {
      deleteUserMutation.mutate(userId);
    }
  };

  const formattedUsers = useMemo(() => {
    if (!Array.isArray(rawUsers)) return [];
    return rawUsers.map((u: any) => ({
      id: u.id,
      firstName: u.firstName || '',
      lastName: u.lastName || '',
      name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Not Available',
      email: u.email || 'Not Available',
      phone: u.phone || 'Not Available',
      role: u.roles?.[0]?.role?.name || 'No Role',
      roleId: u.roles?.[0]?.roleId || '',
      isActive: u.isActive,
      isDeleted: u.isDeleted,
      status: u.isDeleted ? 'Blocked' : (u.isActive === false ? 'Inactive' : 'Active'),
      createdAt: u.createdAt,
      membership: u.membershipTier?.name || 'None',
      lastLogin: u.sessions?.[0]?.createdAt || u.lastLogin || 'Not Available',
      lastActive: 'Not Available',
      
      // Additional fields for View Modal
      gender: u.customerProfile?.gender || 'Not Available',
      dob: u.customerProfile?.dateOfBirth ? new Date(u.customerProfile.dateOfBirth).toLocaleDateString() : 'Not Available',
      membershipStartDate: 'Not Available',
      membershipExpiryDate: 'Not Available',
      rewardPoints: u.rewardPoints ? u.rewardPoints.reduce((acc: number, curr: any) => acc + (curr.points || 0), 0) : '0',
      totalOrders: u.orders?.length || '0',
      totalSpend: u.orders ? `$${u.orders.reduce((acc: number, curr: any) => acc + (Number(curr.totalAmount) || 0), 0).toFixed(2)}` : '$0.00',
      wishlistCount: u.wishlist?.items?.length || '0',
      cartItems: u.cart?.items?.length || '0',
      defaultAddress: u.addresses?.[0] ? `${u.addresses[0].street}, ${u.addresses[0].city}` : 'Not Available',
      loginDevice: u.sessions?.[0]?.device || 'Not Available',
      loginBrowser: u.sessions?.[0]?.browser || 'Not Available',
      loginIp: u.sessions?.[0]?.ipAddress || 'Not Available',
      loginStatus: 'Not Available',
    }));
  }, [rawUsers]);

  // Derived Statistics
  const stats = useMemo(() => {
    const total = formattedUsers.length;
    const active = formattedUsers.filter(u => u.status === 'Active').length;
    const inactive = formattedUsers.filter(u => u.status === 'Inactive').length;
    const blocked = formattedUsers.filter(u => u.status === 'Blocked').length;
    
    const today = new Date().toDateString();
    const newToday = formattedUsers.filter(u => {
      if (!u.createdAt) return false;
      return new Date(u.createdAt).toDateString() === today;
    }).length;

    return {
      total,
      active,
      inactive,
      blocked,
      newToday: newToday > 0 ? newToday : '0',
      premium: 'No Data Available'
    };
  }, [formattedUsers]);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return formattedUsers.filter(u => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch = 
        u.name.toLowerCase().includes(searchStr) ||
        u.email.toLowerCase().includes(searchStr) ||
        u.phone.toLowerCase().includes(searchStr);
      
      const matchesStatus = statusFilter === 'All Users' || u.status === statusFilter;
      const matchesMembership = membershipFilter === 'All Memberships' || u.membership === membershipFilter;
      
      const today = new Date().toDateString();
      const matchesNewToday = isNewTodayFilter ? (u.createdAt && new Date(u.createdAt).toDateString() === today) : true;

      return matchesSearch && matchesStatus && matchesMembership && matchesNewToday;
    });
  }, [formattedUsers, searchTerm, statusFilter, membershipFilter, isNewTodayFilter]);

  const columns = [
    {
      key: 'profile',
      header: 'Profile',
      render: (u: any) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 min-w-[40px] rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold uppercase overflow-hidden">
            <User size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-slate-900 truncate max-w-[150px]" title={u.name}>{u.name}</span>
            <span className="text-xs text-slate-500 truncate max-w-[150px]">{u.role}</span>
          </div>
        </div>
      )
    },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Mobile' },
    { 
      key: 'membership', 
      header: 'Membership',
      render: (u: any) => <span className="text-slate-400 italic text-sm">{u.membership}</span>
    },
    {
      key: 'status',
      header: 'Status',
      render: (u: any) => (
        <StatusBadge 
          status={u.status} 
          variant={u.status === 'Active' ? 'success' : (u.status === 'Blocked' ? 'danger' : 'warning')} 
        />
      )
    },


    {
      key: 'actions',
      header: 'Actions',
      render: (user: any) => (
        <div className="flex items-center gap-1">
          <button onClick={() => setViewUser(user)} className="p-1.5 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors" title="View">
            <Eye className="h-4 w-4" />
          </button>
          <button onClick={() => setSelectedUser(user)} className="p-1.5 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors" title="Edit">
            <Edit2 className="h-4 w-4" />
          </button>

          <button onClick={() => handleDelete(user.id)} disabled={deleteUserMutation.isPending} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-slate-200 rounded"></div>
          <div className="h-10 w-32 bg-slate-200 rounded-xl"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="h-28 bg-slate-200 rounded-2xl"></div>)}
        </div>
        <div className="h-16 bg-slate-200 rounded-2xl"></div>
        <div className="h-96 bg-slate-200 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="h-6 w-6 text-primary-500" />
            User Access
          </h1>
          <p className="text-slate-500 mt-1">Manage users, view activities, and assign access.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-xl shadow-sm text-sm font-medium hover:bg-primary-700 transition-colors w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: stats.total, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active', value: stats.active, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Inactive', value: stats.inactive, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'New Today', value: stats.newToday, icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, idx) => {
          const isActiveCard = 
            (stat.label === 'Total Users' && statusFilter === 'All Users' && !isNewTodayFilter) ||
            (stat.label === 'Active' && statusFilter === 'Active' && !isNewTodayFilter) ||
            (stat.label === 'Inactive' && statusFilter === 'Inactive' && !isNewTodayFilter) ||
            (stat.label === 'New Today' && isNewTodayFilter);

          return (
            <div 
              key={idx} 
              onClick={() => {
                if (stat.label === 'Total Users') {
                  setStatusFilter('All Users');
                  setIsNewTodayFilter(false);
                } else if (stat.label === 'Active') {
                  setStatusFilter('Active');
                  setIsNewTodayFilter(false);
                } else if (stat.label === 'Inactive') {
                  setStatusFilter('Inactive');
                  setIsNewTodayFilter(false);
                } else if (stat.label === 'New Today') {
                  setIsNewTodayFilter(true);
                  setStatusFilter('All Users');
                }
              }}
              className={`bg-white p-4 rounded-2xl shadow-sm flex flex-col justify-center transition-all cursor-pointer hover:shadow-md relative overflow-hidden ${isActiveCard ? 'ring-2 ring-primary-500 shadow-md border-transparent' : 'border border-slate-100'}`}
            >
              <stat.icon className={`absolute -right-2 -bottom-2 h-20 w-20 ${stat.color} opacity-5 pointer-events-none`} />
              <div className="flex items-center justify-between mb-2 relative z-10">
                <span className="text-sm font-medium text-slate-500">{stat.label}</span>
                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                  <stat.icon size={16} />
                </div>
              </div>
              <div className={`font-bold text-slate-900 ${stat.textClass || 'text-2xl'} relative z-10`}>
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-4 transition-all">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
            placeholder="Search by Name, Email, Mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-48">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2.5 text-sm font-medium border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 rounded-xl bg-slate-50 transition-colors appearance-none text-slate-700"
            >
              <option>All Users</option>
              <option>Active</option>
              <option>Inactive</option>

            </select>
            <Filter className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative w-full sm:w-48">
            <select 
              value={membershipFilter}
              onChange={(e) => setMembershipFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2.5 text-sm font-medium border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 rounded-xl bg-slate-50 transition-colors appearance-none text-slate-700"
            >
              <option value="All Memberships">All Memberships</option>
              <option value="None">None</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
            </select>
            <Star className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table Area */}
      {filteredUsers.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-16 flex flex-col items-center justify-center text-center transition-all">
           <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
             <Search className="h-8 w-8 text-slate-300" />
           </div>
           <h3 className="text-lg font-bold text-slate-900">No users found</h3>
           <p className="text-slate-500 mt-1 max-w-sm">We couldn't find any users matching your current search and filter criteria.</p>
           <button 
             onClick={() => { setSearchTerm(''); setStatusFilter('All Users'); setMembershipFilter('All Memberships'); }}
             className="mt-6 px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
           >
             Clear all filters
           </button>
        </div>
      ) : (
        <div className="transition-all">
          <DataTable 
            data={filteredUsers} 
            columns={columns} 
          />
        </div>
      )}

      {/* ----------------- MODALS ----------------- */}

      {/* View User Modal */}
      {viewUser && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
          <div className="bg-slate-50 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 bg-white flex justify-between items-center sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-lg">
                  {viewUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900">{viewUser.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusBadge status={viewUser.status} variant={viewUser.status === 'Active' ? 'success' : (viewUser.status === 'Blocked' ? 'danger' : 'warning')} />
                    <span className="text-sm text-slate-500">{viewUser.role}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setViewUser(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Grid 1: Personal & Account */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Personal Information */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                    <User size={18} className="text-primary-500" />
                    Personal Information
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Full Name</span>
                      <span className="font-medium text-slate-900">{viewUser.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Email</span>
                      <span className="font-medium text-slate-900 flex items-center gap-1"><Mail size={14} className="text-slate-400" /> {viewUser.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Mobile Number</span>
                      <span className="font-medium text-slate-900 flex items-center gap-1"><Phone size={14} className="text-slate-400" /> {viewUser.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Gender</span>
                      <span className="font-medium text-slate-400 italic">{viewUser.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Date of Birth</span>
                      <span className="font-medium text-slate-400 italic">{viewUser.dob}</span>
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                    <ShieldAlert size={18} className="text-primary-500" />
                    Account Information
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">User ID</span>
                      <span className="font-medium text-slate-900 truncate max-w-[150px]" title={viewUser.id}>{viewUser.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Registration Date</span>
                      <span className="font-medium text-slate-900">{formatDate(viewUser.createdAt)}</span>
                    </div>


                  </div>
                </div>
              </div>

              {/* Grid 2: Membership & Shopping */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Membership Details */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                    <Star size={18} className="text-yellow-500" />
                    Membership & Rewards
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Current Membership</span>
                      <span className="font-medium text-slate-400 italic">{viewUser.membership}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Start Date</span>
                      <span className="font-medium text-slate-400 italic">{viewUser.membershipStartDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Expiry Date</span>
                      <span className="font-medium text-slate-400 italic">{viewUser.membershipExpiryDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Reward Points</span>
                      <span className="font-medium text-slate-400 italic">{viewUser.rewardPoints}</span>
                    </div>
                  </div>
                </div>

                {/* Shopping Information */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                    <CreditCard size={18} className="text-green-500" />
                    Shopping Information
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Orders</span>
                      <span className="font-medium text-slate-400 italic">{viewUser.totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Spend</span>
                      <span className="font-medium text-slate-400 italic">{viewUser.totalSpend}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cart Items</span>
                      <span className="font-medium text-slate-400 italic">{viewUser.cartItems}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Wishlist Count</span>
                      <span className="font-medium text-slate-400 italic">{viewUser.wishlistCount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Default Address & Login Activity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Default Address */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                    <MapPin size={18} className="text-rose-500" />
                    Default Shipping Address
                  </h4>
                  <div className="flex flex-col items-center justify-center py-6 text-center text-slate-400">
                    <MapPin size={32} className="mb-2 opacity-30" />
                    <span className="italic text-sm">{viewUser.defaultAddress}</span>
                  </div>
                </div>

                {/* Login Activity */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                    <Activity size={18} className="text-blue-500" />
                    Latest Login Activity
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Login Date</span>
                      <span className="font-medium text-slate-900">{formatDate(viewUser.lastLogin)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Device</span>
                      <span className="font-medium text-slate-400 italic">{viewUser.loginDevice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Browser</span>
                      <span className="font-medium text-slate-400 italic">{viewUser.loginBrowser}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">IP Address</span>
                      <span className="font-medium text-slate-400 italic">{viewUser.loginIp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Status</span>
                      <span className="font-medium text-slate-400 italic">{viewUser.loginStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200 bg-white flex justify-between items-center rounded-b-2xl">
              <button onClick={() => toast.info('API Not Available: Force Logout')} className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2">
                <Lock size={16} /> Force Logout
              </button>
              <button onClick={() => setViewUser(null)} className="px-6 py-2 bg-primary-600 text-white rounded-xl shadow-sm text-sm font-medium hover:bg-primary-700 transition-colors">
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2"><User size={20} className="text-primary-500" /> Add New User</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              createMutation.mutate({
                firstName: formData.get('firstName') as string,
                lastName: formData.get('lastName') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
                roleId: formData.get('roleId') as string,
              });
            }} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input name="firstName" required className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input name="lastName" required className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input name="email" type="email" required className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mobile</label>
                <input name="phone" type="tel" required className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <select name="roleId" required className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 outline-none transition-all bg-white">
                  <option value="">Select a role...</option>
                  {roles.map((r: any) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium">Cancel</button>
                <button type="submit" disabled={createMutation.isPending} className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-sm flex items-center justify-center min-w-[120px]">
                  {createMutation.isPending ? 'Saving...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2"><Edit2 size={20} className="text-amber-500" /> Edit Role: {selectedUser.name}</h3>
              <button onClick={() => setSelectedUser(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              updateRoleMutation.mutate({
                id: selectedUser.id,
                data: { roleId: formData.get('roleId') as string }
              });
            }} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <select name="roleId" defaultValue={selectedUser.roleId} required className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 outline-none transition-all bg-white">
                  {roles.map((r: any) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setSelectedUser(null)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium">Cancel</button>
                <button type="submit" disabled={updateRoleMutation.isPending} className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium shadow-sm flex items-center justify-center min-w-[140px]">
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
