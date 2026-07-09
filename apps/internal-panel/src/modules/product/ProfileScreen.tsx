import { User, Mail, Shield, Key } from 'lucide-react';

export default function ProfileScreen() {
  return (
    <div className="h-full flex flex-col max-w-3xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <User className="w-6 h-6 text-rose-500" />
          My Profile
        </h1>
        <p className="text-slate-500 text-sm mt-1">Manage your account details and security preferences.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex items-center gap-6 bg-slate-50/50">
            <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-3xl shadow-sm ring-4 ring-white">
              AD
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Product Manager</h2>
              <p className="text-slate-500 flex items-center gap-2 mt-1">
                <Shield className="w-4 h-4 text-emerald-500" />
                Product Management Team
              </p>
            </div>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <input type="text" defaultValue="Admin User" disabled className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 focus:outline-none cursor-not-allowed" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="email" defaultValue="manager@coskinn.com" disabled className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 focus:outline-none cursor-not-allowed" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-slate-400" />
            Security Settings
          </h3>
          <p className="text-sm text-slate-500 mb-6">If you need to change your password, please contact the Super Admin for a reset link.</p>
          <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
            Request Password Reset
          </button>
        </div>
      </div>
    </div>
  );
}
