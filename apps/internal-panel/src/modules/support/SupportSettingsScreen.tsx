import { Settings2, Clock, Zap, Save, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supportApi } from '../../core/api/support';

export const SupportSettingsScreen = () => {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['admin', 'support', 'settings'],
    queryFn: () => supportApi.getSettings()
  });

  const [timezone, setTimezone] = useState('Asia/Kolkata (IST)');
  const [firstResponseSlaHours, setFirstResponseSlaHours] = useState(24);
  const [pauseSlaOnWeekends, setPauseSlaOnWeekends] = useState(true);
  const [autoAssign, setAutoAssign] = useState(true);
  const [sendCsat, setSendCsat] = useState(true);

  useEffect(() => {
    if (settings) {
      setTimezone(settings.timezone);
      setFirstResponseSlaHours(settings.firstResponseSlaHours);
      setPauseSlaOnWeekends(settings.pauseSlaOnWeekends);
      setAutoAssign(settings.autoAssign);
      setSendCsat(settings.sendCsat);
    }
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: (data: any) => supportApi.updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'support', 'settings'] });
      toast.success('Support settings saved successfully.');
    },
    onError: () => {
      toast.error('Failed to save settings.');
    }
  });

  const handleSave = () => {
    updateMutation.mutate({
      timezone,
      firstResponseSlaHours: Number(firstResponseSlaHours),
      pauseSlaOnWeekends,
      autoAssign,
      sendCsat
    });
  };

  if (isLoading) {
    return <div className="p-12 text-center text-slate-500">Loading settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Support Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Configure CRM preferences and automation rules.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={updateMutation.isPending}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-xl shadow-sm text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {updateMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          {updateMutation.isPending ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center">
          <Clock className="h-5 w-5 text-slate-400 mr-3" />
          <div>
            <h3 className="font-bold text-slate-900">Business Hours & SLAs</h3>
            <p className="text-sm text-slate-500">Configure timezone-aware business hours.</p>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Timezone</label>
              <select 
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 bg-white"
              >
                <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST)</option>
                <option value="America/New_York (EST)">America/New_York (EST)</option>
                <option value="Europe/London (GMT)">Europe/London (GMT)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">First Response SLA (Hours)</label>
              <input 
                type="number" 
                value={firstResponseSlaHours}
                onChange={(e) => setFirstResponseSlaHours(Number(e.target.value))}
                className="w-full border border-slate-200 rounded-lg px-3 py-2" 
              />
            </div>
          </div>
          <div className="flex items-center space-x-3 pt-2">
            <input 
              type="checkbox" 
              checked={pauseSlaOnWeekends}
              onChange={(e) => setPauseSlaOnWeekends(e.target.checked)}
              className="h-4 w-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500" 
            />
            <span className="text-sm font-medium text-slate-700">Pause SLAs on Weekends</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center">
          <Zap className="h-5 w-5 text-slate-400 mr-3" />
          <div>
            <h3 className="font-bold text-slate-900">Automation Rules</h3>
            <p className="text-sm text-slate-500">Set up automatic ticket assignments and notifications.</p>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h4 className="font-medium text-slate-900">Auto-Assign to Agents</h4>
              <p className="text-sm text-slate-500">Automatically round-robin new tickets to online agents.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={autoAssign}
                onChange={(e) => setAutoAssign(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div>
              <h4 className="font-medium text-slate-900">Send Customer Satisfaction Survey</h4>
              <p className="text-sm text-slate-500">Send a CSAT survey email 24 hours after ticket resolution.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={sendCsat}
                onChange={(e) => setSendCsat(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
