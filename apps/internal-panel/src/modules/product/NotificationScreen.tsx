import { Bell, PackageCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/axios';

const iconMap: Record<string, any> = {
  Bell,
  PackageCheck,
  AlertCircle,
  CheckCircle2
};

export default function NotificationScreen() {
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['adminNotifications'],
    queryFn: async () => {
      const res = await api.get('/admin/config/notifications');
      return res.data;
    }
  });

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto w-full">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Bell className="w-6 h-6 text-rose-500" />
            Notifications
          </h1>
          <p className="text-slate-500 text-sm mt-1">Stay updated on product approvals and system alerts.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
          <CheckCircle2 className="w-4 h-4" />
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {isLoading ? (
            <div className="p-8 text-center text-slate-500">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No new notifications.</div>
          ) : notifications.map((notif: any) => {
            const Icon = iconMap[notif.iconType] || Bell;
            return (
              <div key={notif.id} className={`p-6 flex gap-4 transition-colors hover:bg-slate-50/50 ${notif.read ? 'opacity-60' : ''}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notif.bg} ${notif.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>
                      {notif.title}
                    </h3>
                    <span className="text-xs font-medium text-slate-400">{notif.time}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
                {!notif.read && (
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mt-2 shrink-0"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
