import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ALL_MODULES } from '../../config/navigation';
import { hasPermission } from '../../config/roles';
import { Bell, Mail, LogOut, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const Logo = () => (
  <div className="flex items-end relative px-2">
    <img src="/logo.webp" alt="C" className="h-[2.5rem] w-[2.5rem] object-contain -mr-1" />
    <span style={{ fontFamily: '"Expletus Sans", sans-serif' }} className="text-[1.5rem] leading-none font-medium tracking-wide text-black mb-0.5 flex items-baseline">
      OSK
      <span className="relative inline-block px-[1px]">
        <img src="/coskinLogo.webp" alt="Heart" className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-[10px] h-[7px] object-contain" />
        <span className="text-transparent relative z-10" style={{ textShadow: "0 0 0 black" }}>I</span>
      </span>
      N<span className="text-lg ml-0.5">n</span>
    </span>
  </div>
);

export const TopNavbar = () => {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isModuleMenuOpen, setIsModuleMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close module menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsModuleMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine allowed modules for the user
  const allowedModules = ALL_MODULES.filter(module => hasPermission(role, module.basePath));
  
  // Determine currently active module based on URL
  const activeModule = allowedModules.find(module => location.pathname.startsWith(module.basePath)) 
                        || allowedModules[0];

  const handleModuleSwitch = (basePath: string) => {
    setIsModuleMenuOpen(false);
    navigate(basePath);
  };

  return (
    <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-rose-100 flex items-center justify-between px-6 shrink-0 z-30">
      <div className="flex items-center gap-6">
        <Logo />
        
        {/* Module Switcher (Only show if user has access to >1 module) */}
        {allowedModules.length > 1 && activeModule && (
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsModuleMenuOpen(!isModuleMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
            >
              <activeModule.icon className="w-5 h-5 text-brand" />
              <span className="font-semibold text-slate-700">{activeModule.name}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {isModuleMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 pb-2 mb-2 border-b border-slate-50">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Switch Module</p>
                </div>
                {allowedModules.map(module => (
                  <button
                    key={module.id}
                    onClick={() => handleModuleSwitch(module.basePath)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      activeModule.id === module.id 
                        ? 'bg-rose-50 text-brand' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <module.icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{module.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* If only 1 module, just display its name */}
        {allowedModules.length === 1 && activeModule && (
          <div className="flex items-center gap-2 px-3 py-1.5">
            <activeModule.icon className="w-5 h-5 text-brand" />
            <span className="font-semibold text-slate-700">{activeModule.name}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="hidden md:flex relative">
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-64 pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
          />
          <SearchIcon className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-3 border-r border-slate-200 pr-4">
          <button className="p-2 relative text-slate-500 hover:text-brand transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 relative text-slate-500 hover:text-brand transition-colors">
            <Mail className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">5</span>
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 leading-tight">{user?.email?.split('@')[0] || 'User'}</p>
            <p className="text-[11px] font-medium text-slate-500 capitalize">{role.replace('_', ' ')}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand to-rose-300 text-white flex items-center justify-center font-bold text-lg shadow-sm border-2 border-white">
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <button 
            onClick={logout}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors ml-1"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

const SearchIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
