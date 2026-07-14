import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Plus, Save, Mail, Smartphone, Bell, Calendar } from 'lucide-react';

export default function CampaignManager() {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState<any>({ type: 'EMAIL' });

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const res = await api.get('/marketing/campaigns');
      return res.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.post('/marketing/campaigns', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      setIsCreating(false);
      setForm({ type: 'EMAIL' });
    },
    onError: () => alert('Failed to create campaign.')
  });

  const handleSave = () => {
    const data = {
      ...form,
      scheduledAt: form.scheduledAt ? new Date(form.scheduledAt).toISOString() : undefined
    };
    createMutation.mutate(data);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'EMAIL': return <Mail className="w-5 h-5 text-blue-500" />;
      case 'SMS': return <Smartphone className="w-5 h-5 text-green-500" />;
      case 'PUSH': return <Bell className="w-5 h-5 text-purple-500" />;
      default: return <Mail className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Campaigns</h2>
          <p className="text-sm text-gray-500">Manage email, SMS, and push notification blasts</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
        >
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </div>

      {isCreating && (
        <div className="border rounded-xl p-5 bg-white shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 border-b pb-2">Draft New Campaign</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Campaign Name</label>
              <input 
                type="text" 
                placeholder="e.g. Summer Sale 2026" 
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                value={form.name || ''}
                onChange={e => setForm({...form, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Type</label>
              <select 
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                value={form.type || 'EMAIL'}
                onChange={e => setForm({...form, type: e.target.value})}
              >
                <option value="EMAIL">Email Marketing</option>
                <option value="SMS">SMS Message</option>
                <option value="PUSH">App Push Notification</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Target Audience</label>
              <select 
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                value={form.audience || 'ALL'}
                onChange={e => setForm({...form, audience: e.target.value})}
              >
                <option value="ALL">All Customers</option>
                <option value="VIP">VIP Members Only</option>
                <option value="INACTIVE">Inactive Customers (&gt;30 days)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Schedule Date (Optional)</label>
              <input 
                type="datetime-local" 
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                value={form.scheduledAt || ''}
                onChange={e => setForm({...form, scheduledAt: e.target.value})}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setIsCreating(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 text-sm bg-rose-600 text-white rounded-lg hover:bg-rose-700 flex items-center gap-2 font-medium">
              <Save className="w-4 h-4" /> Save Campaign
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="p-8 text-center text-gray-500">Loading campaigns...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {campaigns?.map((campaign: any) => (
            <div key={campaign.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                    {getIcon(campaign.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{campaign.name}</h3>
                    <p className="text-xs text-gray-500 font-medium">Audience: {campaign.audience || 'ALL'}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                  campaign.status === 'SENT' ? 'bg-green-100 text-green-800' :
                  campaign.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.status}
                </span>
              </div>
              
              <div className="border-t border-gray-100 pt-3 mt-2 flex items-center text-xs text-gray-500 gap-2">
                <Calendar className="w-4 h-4" />
                {campaign.scheduledAt 
                  ? `Scheduled: ${new Date(campaign.scheduledAt).toLocaleString()}` 
                  : `Created: ${new Date(campaign.createdAt).toLocaleDateString()}`
                }
              </div>
            </div>
          ))}
          {(!campaigns || campaigns.length === 0) && !isCreating && (
             <div className="col-span-full p-12 text-center border-2 border-dashed border-gray-200 rounded-xl">
               <p className="text-gray-500 mb-2">No campaigns found.</p>
               <button onClick={() => setIsCreating(true)} className="text-sm font-medium text-rose-600 hover:underline">Create your first campaign</button>
             </div>
          )}
        </div>
      )}
    </div>
  );
}
