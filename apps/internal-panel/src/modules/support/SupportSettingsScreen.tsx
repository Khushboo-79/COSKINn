import { Settings2, Clock, Zap } from 'lucide-react';

export const SupportSettingsScreen = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Support Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Configure CRM preferences and automation rules.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center flex flex-col items-center">
        <Settings2 className="h-16 w-16 text-slate-300 mb-4" />
        <h3 className="text-lg font-bold text-slate-700 mb-2">Global Settings (Coming Soon)</h3>
        <p className="text-slate-500 max-w-md">
          This area is reserved for a future update where Administrators will be able to configure global rules for the Support Module.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <Clock className="h-6 w-6 text-slate-400 mb-3" />
          <h4 className="font-medium text-slate-900 mb-1">Business Hours & SLAs</h4>
          <p className="text-sm text-slate-500">Configure timezone-aware business hours so SLA breach timers pause during weekends and holidays.</p>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <Zap className="h-6 w-6 text-slate-400 mb-3" />
          <h4 className="font-medium text-slate-900 mb-1">Canned Responses</h4>
          <p className="text-sm text-slate-500">Create, edit, and organize the global templates available to agents in the quick-reply widget.</p>
        </div>
      </div>
    </div>
  );
};
