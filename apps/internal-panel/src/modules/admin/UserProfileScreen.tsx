import { toast } from 'sonner';
import React, { useState } from 'react';
import { useAuth } from '../../core/rbac/AuthContext';
import { User, Mail, Shield, KeyRound, Building, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UserProfileScreen = () => {
  const { user } = useAuth();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <User className="h-6 w-6 text-primary-500" />
          My Profile
        </h1>
        <p className="text-slate-500 mt-1">Manage your account details and security preferences.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Header Cover */}
        <div className="h-32 bg-gradient-to-r from-primary-600 to-indigo-600"></div>
        
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 mb-6 gap-4">
            <div className="flex items-end space-x-5">
              <div className="h-32 w-32 bg-white rounded-full p-2 relative z-10 flex-shrink-0">
                <div className="h-full w-full bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-5xl font-bold shadow-inner">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
              <div className="pb-3">
                <h2 className="text-3xl font-bold text-slate-900">{user?.name || 'Administrator'}</h2>
                <div className="flex items-center text-slate-500 mt-2 gap-4">
                  <span className="flex items-center"><Mail className="h-4 w-4 mr-1.5" /> {user?.email}</span>
                  <span className="flex items-center capitalize"><Shield className="h-4 w-4 mr-1.5" /> {user?.role}</span>
                </div>
              </div>
            </div>
            
            <div className="sm:pb-4">
              <button 
                onClick={() => setIsEditProfileOpen(true)}
                className="inline-block px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors whitespace-nowrap"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="p-8 space-y-6">
            <h3 className="font-bold text-slate-900">Work Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Building className="h-5 w-5 text-slate-400 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Department</p>
                  <p className="text-sm text-slate-500 capitalize">{user?.role} Division</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-slate-400 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Member Since</p>
                  <p className="text-sm text-slate-500">Jan 2024</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8 space-y-6">
            <h3 className="font-bold text-slate-900">Security</h3>
            
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <KeyRound className="h-5 w-5 text-slate-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Password</p>
                    <p className="text-sm text-slate-500">Last changed 3 months ago</p>
                  </div>
                </div>
                <button onClick={() => setIsChangePasswordOpen(true)} className="text-sm font-medium text-primary-600 hover:text-primary-700">Update</button>
              </div>
              
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-slate-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Two-Factor Authentication</p>
                    <p className="text-sm text-emerald-600 font-medium">Enabled</p>
                  </div>
                </div>
                <Link to="/admin/2fa" className="text-sm font-medium text-primary-600 hover:text-primary-700">Manage</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">Edit Profile</h2>
              <button onClick={() => setIsEditProfileOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">&times;</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success(); setIsEditProfileOpen(false); }} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input type="text" defaultValue={user?.name || 'Administrator'} className="w-full border-slate-200 rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input type="email" defaultValue={user?.email || ''} className="w-full border-slate-200 rounded-lg px-3 py-2" required />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsEditProfileOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 shadow-sm">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isChangePasswordOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">Change Password</h2>
              <button onClick={() => setIsChangePasswordOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">&times;</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast.success(); setIsChangePasswordOpen(false); }} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full border-slate-200 rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full border-slate-200 rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                <input type="password" placeholder="••••••••" className="w-full border-slate-200 rounded-lg px-3 py-2" required />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsChangePasswordOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 shadow-sm">Update Password</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
