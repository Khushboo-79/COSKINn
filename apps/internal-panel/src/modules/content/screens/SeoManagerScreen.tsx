import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import { Globe, Search, Save, AlertCircle } from 'lucide-react';

export default function SeoManager() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ title: '', description: '', keywords: '' });
  const [successMsg, setSuccessMsg] = useState('');

  const { data: globalSeo, isLoading } = useQuery({
    queryKey: ['globalSeo'],
    queryFn: async () => {
      const res = await api.get('/admin/seo/global');
      return res.data;
    }
  });

  useEffect(() => {
    if (globalSeo) {
      setForm({
        title: globalSeo.title || '',
        description: globalSeo.description || '',
        keywords: globalSeo.keywords || ''
      });
    }
  }, [globalSeo]);

  const updateMutation = useMutation({
    mutationFn: (data: any) => api.put('/admin/seo/global', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['globalSeo'] });
      setSuccessMsg('Global SEO settings saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  });

  const handleSave = () => {
    updateMutation.mutate(form);
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading SEO settings...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">SEO Manager</h2>
          <p className="text-sm text-gray-500">Manage Meta Tags and OpenGraph data</p>
        </div>
      </div>

      <div className="bg-white border border-blue-100 p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-4 border-b pb-4 mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Global SEO Settings</h3>
            <p className="text-sm text-gray-500">Configure default metadata for the entire store</p>
          </div>
        </div>

        <div className="space-y-4 max-w-2xl">
          {successMsg && (
            <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {successMsg}
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Store Meta Title</label>
            <input 
              type="text" 
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Store Meta Keywords</label>
            <input 
              type="text" 
              placeholder="e.g. cosmetics, skin care, beauty"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.keywords}
              onChange={e => setForm({...form, keywords: e.target.value})}
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Store Meta Description</label>
            <textarea 
              rows={3}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
            />
          </div>

          <button 
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> Save Global Settings
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden mt-6">
        <div className="p-4 border-b border-gray-100 bg-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-700 flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" /> Page-Specific SEO
          </h3>
        </div>
        <div className="p-8 text-center text-gray-500">
          <p>Product and Category SEO can be managed directly on their respective configuration pages.</p>
          <p className="text-sm mt-2">Blog article SEO is managed inside the Blog Manager.</p>
        </div>
      </div>
    </div>
  );
}
