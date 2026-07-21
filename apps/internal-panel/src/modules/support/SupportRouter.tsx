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
            key={tab.path}
            to={tab.path}
            className={`flex items-center px-4 py-4 text-sm font-medium border-b-2 transition-colors ${
              isActive
                ? 'border-slate-900 text-slate-900 bg-slate-50'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50/50'
            }`}
          >
            <Icon className="h-4 w-4 mr-2" />
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
            <h2 className="text-xl font-bold text-slate-700 mb-2">Coming Soon</h2>
            <p>This section of the CRM is scheduled for a future phase.</p>
          </div>
        } />
      </Routes>
    </div>
  );
};
