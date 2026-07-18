import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShieldCheck, Users, Box, ShoppingCart, Archive, DollarSign, Activity } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Roles & Permissions', path: '/admin/roles', icon: ShieldCheck },
  { name: 'User Management', path: '/admin/users', icon: Users },
  { name: 'Products', path: '/products', icon: Box },
  { name: 'Inventory', path: '/inventory', icon: Archive },
  { name: 'Orders', path: '/orders', icon: ShoppingCart },
  { name: 'Finance', path: '/finance', icon: DollarSign },
  { name: 'Audit Logs', path: '/audit', icon: Activity },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <div className="flex-shrink-0 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF0069] to-[#FFD498] flex items-center justify-center shadow-[0_0_15px_rgba(255,0,105,0.4)] text-white font-bold text-lg">
            C
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            COSKINn
          </span>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Admin Control
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`flex-shrink-0 -ml-1 mr-3 h-5 w-5 transition-colors ${
                    isActive ? 'text-[#FFD498]' : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                  aria-hidden="true"
                />
                <span className="truncate">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-4 rounded-full bg-gradient-to-b from-[#FF0069] to-[#FFD498]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-600 flex items-center justify-center text-white font-medium">
            AD
          </div>
          <div>
            <p className="text-sm font-medium text-white">Super Admin</p>
            <p className="text-xs text-slate-500">admin@coskinn.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
