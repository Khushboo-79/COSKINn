import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contentApi } from '../../core/api/content';
import { Sparkles, Plus, Save, Trash2, Loader2 } from 'lucide-react';

export const BeautyTipsScreen = () => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [contentJson, setContentJson] = useState('');
  const [segment, setSegment] = useState('BOTH');
  const [published, setPublished] = useState(true);

  const { data: tips, isLoading } = useQuery({
    queryKey: ['content', 'articles', 'TIP'],
    queryFn: () => contentApi.getAdminArticles('TIP')
  });

  const addMutation = useMutation({
    mutationFn: () => contentApi.createArticle({
      title,
      slug: `tip-${Date.now()}`,
      type: 'TIP',
      contentJson: JSON.stringify({ text: contentJson }),
      segment,
      published
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content', 'articles', 'TIP'] });
      setIsAdding(false);
      setTitle('');
      setContentJson('');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => contentApi.deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content', 'articles', 'TIP'] });
    }
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Beauty Tips</h1>
          <p className="text-slate-500 text-sm mt-1">Manage short-form tips for the homepage and app.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Tip
        </button>
      </div>

      {isAdding && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-indigo-500" /> New Beauty Tip
          </h3>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-indigo-900 mb-1">Tip Title / Headline <span className="text-rose-500">*</span></label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Always Double Cleanse"
                className="w-full border-indigo-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-indigo-900 mb-1">Tip Content <span className="text-rose-500">*</span></label>
              <textarea 
                value={contentJson}
                onChange={e => setContentJson(e.target.value)}
                placeholder="Write your tip here (max 280 chars)..."
                rows={3}
                maxLength={280}
                className="w-full border-indigo-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 bg-white"
              />
              <div className="text-right text-xs text-indigo-400 mt-1">{contentJson.length}/280</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-indigo-900 mb-1">Target Segment</label>
                <select 
                  value={segment}
                  onChange={e => setSegment(e.target.value)}
                  className="w-full border-indigo-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="BOTH">All</option>
                  <option value="COSMETICS">Cosmetics</option>
                  <option value="NUTRITION">Nutrition</option>
                </select>
              </div>
              <div className="flex flex-col justify-center">
                <label className="flex items-center gap-2 cursor-pointer mt-5">
                  <input 
                    type="checkbox" 
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500" 
                  />
                  <span className="text-sm font-medium text-indigo-900">Publish immediately</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-indigo-100 pt-4">
            <button 
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-sm font-medium text-indigo-700 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50"
            >
              Cancel
            </button>
            <button 
              onClick={() => addMutation.mutate()}
              disabled={!title || !contentJson || addMutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center"
            >
              {addMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Save Tip
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="p-12 text-center text-slate-500">Loading tips...</div>
      ) : !tips || tips.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <Sparkles className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="font-medium text-slate-900">No beauty tips found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {tips.map((tip: any) => (
            <div key={tip.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex gap-4 group">
              <div className="bg-indigo-50 p-3 rounded-xl h-fit">
                <Sparkles className="h-6 w-6 text-indigo-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-900 text-lg">{tip.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${tip.published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                      {tip.published ? 'LIVE' : 'DRAFT'}
                    </span>
                    <button 
                      onClick={() => {
                        if(window.confirm('Delete this tip?')) deleteMutation.mutate(tip.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-slate-600 mt-2">{JSON.parse(tip.contentJson).text}</p>
                <div className="mt-3 flex gap-2">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">Segment: {tip.segment}</span>
                  <span className="text-xs text-slate-400 py-1">{new Date(tip.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
