import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ALL_MODULES } from '../../config/navigation';
import { hasPermission } from '../../config/roles';

export const Sidebar = () => {
  const location = useLocation();
  const { role } = useAuth();
  
  // Find which module we are currently in
  const allowedModules = ALL_MODULES.filter(module => hasPermission(role, module.basePath));
  const activeModule = allowedModules.find(module => location.pathname.startsWith(module.basePath)) 
                        || allowedModules[0];

  if (!activeModule) return null;

  return (
    <aside className="w-64 bg-white/95 backdrop-blur-xl border-r border-rose-100 flex flex-col shrink-0 shadow-xl shadow-rose-100/30 relative z-20 h-full overflow-hidden">
      
      {/* Module Title Header */}
      <div className="h-16 px-6 flex items-center border-b border-rose-50 bg-rose-50/30">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight" style={{ fontFamily: '"Expletus Sans", sans-serif' }}>
          {activeModule.name.replace(' Panel', '').replace(' Dashboard', '')}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 no-scrollbar">
        {activeModule.sidebar.map((section, idx) => (
          <div key={idx} className="space-y-2">
            {section.title && (
              <h3 className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map(item => {
                const isActive = location.pathname === item.path || 
                               (item.path !== activeModule.basePath && location.pathname.startsWith(item.path));
                const Icon = item.icon;
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-rose-50 text-brand font-bold shadow-sm' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                    }`}
                  >
                    <Icon 
                      className={`w-5 h-5 transition-colors ${isActive ? 'text-brand' : 'text-slate-400'}`} 
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    <span className="text-sm">{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
