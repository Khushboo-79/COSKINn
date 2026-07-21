import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { marketingApi } from '../../core/api/marketing';
import { Search, Loader2, Save } from 'lucide-react';

export const SeoSettingsScreen = () => {
  const queryClient = useQueryClient();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');

  const { data: seo, isLoading } = useQuery({
    queryKey: ['marketing', 'globalSeo'],
    queryFn: () => marketingApi.getGlobalSeo()
  });

  useEffect(() => {
    if (seo) {
      setTitle(seo.title || '');
      setDescription(seo.description || '');
      setKeywords(seo.keywords || '');
    }
  }, [seo]);

  const updateMutation = useMutation({
    mutationFn: () => marketingApi.updateGlobalSeo({ title, description, keywords }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketing', 'globalSeo'] });
      alert('SEO Settings saved successfully!');
    }
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Global SEO</h1>
        <p className="text-slate-500 text-sm mt-1">Configure default metadata for search engines.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        {isLoading ? (
          <div className="py-12 text-center text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-indigo-500 mb-2" />
            Loading SEO settings...
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
              <h4 className="flex items-center text-sm font-bold text-slate-700 mb-2">
                <Search className="h-4 w-4 mr-2" /> Google Search Preview
              </h4>
              <div className="bg-white p-4 rounded border border-slate-200">
                <div className="text-sm text-[#1a0dab] font-medium truncate max-w-lg hover:underline cursor-pointer">
                  {title || 'Site Title'}
                </div>
                <div className="text-xs text-[#006621] mt-0.5 truncate max-w-lg">
                  https://www.coskinn.com
                </div>
                <div className="text-sm text-[#545454] mt-1 line-clamp-2 max-w-lg">
                  {description || 'Site description will appear here in search results.'}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Global Meta Title</label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                maxLength={60}
                className="w-full border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 bg-white"
              />
              <div className="text-right text-xs text-slate-400 mt-1">{title.length}/60 chars</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Global Meta Description</label>
              <textarea 
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                maxLength={160}
                className="w-full border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 bg-white"
              />
              <div className="text-right text-xs text-slate-400 mt-1">{description.length}/160 chars</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Meta Keywords (Comma separated)</label>
              <input 
                type="text" 
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
                placeholder="skincare, cosmetics, fruit infused"
                className="w-full border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => updateMutation.mutate()}
                disabled={updateMutation.isPending}
                className="px-6 py-2 font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center shadow-sm"
              >
                {updateMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Save SEO Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
