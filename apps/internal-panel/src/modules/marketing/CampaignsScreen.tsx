import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { marketingApi } from '../../core/api/marketing';
import { Plus, Mail, MessageSquare, Bell, Loader2, Save, Send } from 'lucide-react';

export const CampaignsScreen = () => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [type, setType] = useState('EMAIL');
  const [audience, setAudience] = useState('All Customers');

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['marketing', 'campaigns'],
    queryFn: () => marketingApi.getCampaigns()
  });

  const addMutation = useMutation({
    mutationFn: () => marketingApi.createCampaign({
      name,
      type,
      audience
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing', 'campaigns'] });
      setIsAdding(false);
      setName('');
    }
  });

  const getIcon = (type: string) => {
    switch(type) {
      case 'EMAIL': return <Mail className="h-5 w-5" />;
      case 'SMS': return <MessageSquare className="h-5 w-5" />;
      case 'PUSH': return <Bell className="h-5 w-5" />;
      default: return <Mail className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Campaigns</h1>
          <p className="text-slate-500 text-sm mt-1">Schedule and manage Email, SMS, and Push notifications.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-slate-800 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" /> New Campaign
        </button>
      </div>

      {isAdding && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Create Campaign</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Campaign Name <span className="text-rose-500">*</span></label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Diwali Flash Sale"
                className="w-full border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-slate-900 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Channel <span className="text-rose-500">*</span></label>
              <select 
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-slate-900 bg-white"
              >
                <option value="EMAIL">Email Marketing</option>
                <option value="SMS">SMS Alert</option>
                <option value="PUSH">App Push Notification</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
              <select 
                value={audience}
                onChange={e => setAudience(e.target.value)}
                className="w-full border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-slate-900 bg-white"
              >
                <option value="All Customers">All Customers</option>
                <option value="Active Members">Active Members</option>
                <option value="Abandoned Carts">Abandoned Carts (Last 7 Days)</option>
                <option value="Inactive > 90 Days">Inactive &gt; 90 Days</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
            <button 
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
            >
              Cancel
            </button>
            <button 
              onClick={() => addMutation.mutate()}
              disabled={!name || addMutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 disabled:opacity-50 flex items-center"
            >
              {addMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Save Draft
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="p-12 text-center text-slate-500">Loading campaigns...</div>
      ) : !campaigns || campaigns.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <Send className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="font-medium text-slate-900">No campaigns found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Campaign Name</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Channel</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Audience</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campaigns.map((camp: any) => (
                <tr key={camp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900">
                    {camp.name}
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-slate-100 text-slate-700">
                        {getIcon(camp.type)}
                      </div>
                      <span className="font-medium">{camp.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">
                    {camp.audience || 'All Customers'}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-xs font-bold px-2 py-1 rounded tracking-wide ${
                      camp.status === 'SENT' ? 'bg-emerald-100 text-emerald-800' :
                      camp.status === 'DRAFT' ? 'bg-slate-100 text-slate-600' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {camp.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-500">
                    {new Date(camp.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
