import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Inbox, Activity, Settings, UserCircle, MessageSquare } from 'lucide-react';
import { TicketListScreen } from './TicketListScreen';
import { TicketDetailScreen } from './TicketDetailScreen';

import { SupportDashboardScreen } from './SupportDashboardScreen';
import { AgentPerformanceScreen } from './AgentPerformanceScreen';
import { SupportSettingsScreen } from './SupportSettingsScreen';

const SupportNav = () => {
  const location = useLocation();
  const tabs = [
    { name: 'Tickets', path: '/support/tickets', icon: Inbox },
    { name: 'SLA Dashboard', path: '/support/dashboard', icon: Activity },
    { name: 'My Performance', path: '/support/performance', icon: UserCircle },
    { name: 'Settings', path: '/support/settings', icon: Settings },
  ];

  return (
    <div className="flex border-b border-slate-200 bg-white mb-6 rounded-2xl shadow-sm overflow-hidden px-2">
      {tabs.map((tab) => {
        const isActive = location.pathname.startsWith(tab.path);
        const Icon = tab.icon;
        return (
          <Link
              key={tab.name || tab.path}
              to={tab.path}
              className={`flex items-center whitespace-nowrap px-5 py-4 text-sm font-bold border-b-2 transition-all duration-300 ease-out active:scale-95 ${
                isActive
                  ? 'border-[#FF7F50] text-[#FF7F50] bg-gradient-to-t from-[#FF7F50]/10 to-transparent shadow-[inset_0_-2px_4px_rgba(255,127,80,0.1)]'
                  : 'border-transparent text-slate-500 hover:text-[#FF7F50] hover:bg-gradient-to-t hover:from-[#FF7F50]/5 hover:to-transparent'
              }`}
            >
              <Icon className={`h-4 w-4 mr-2.5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-6'}`} />
              {tab.name}
            </Link>
        );
      })}
    </div>
  );
};

export const SupportRouter = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 p-6 overflow-y-auto">
      <SupportNav />
      <Routes>
        <Route path="/" element={<Navigate to="/support/tickets" replace />} />
        <Route path="/tickets" element={<TicketListScreen />} />
        <Route path="/tickets/:id" element={<TicketDetailScreen />} />
        <Route path="/dashboard" element={<SupportDashboardScreen />} />
        <Route path="/performance" element={<AgentPerformanceScreen />} />
        <Route path="/settings" element={<SupportSettingsScreen />} />
        <Route path="*" element={
          <div className="p-12 text-center text-slate-500">
            <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-700 mb-2">Page Not Found</h2>
            <p>This section doesn't exist.</p>
          </div>
        } />
      </Routes>
    </div>
  );
};
