import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contentApi } from '../../core/api/content';
import { Droplets, Plus, Save, Trash2, Edit, Loader2 } from 'lucide-react';

export const SkinRoutineScreen = () => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [contentJson, setContentJson] = useState('');
  const [segment, setSegment] = useState('BOTH');
  const [published, setPublished] = useState(false);

  const { data: routines, isLoading } = useQuery({
    queryKey: ['content', 'articles', 'ROUTINE'],
    queryFn: () => contentApi.getAdminArticles('ROUTINE')
  });

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const addMutation = useMutation({
    mutationFn: () => contentApi.createArticle({
      title,
      slug: slug || generateSlug(title),
      type: 'ROUTINE',
      contentJson: JSON.stringify({ steps: contentJson }),
      segment,
      published
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content', 'articles', 'ROUTINE'] });
      setIsAdding(false);
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => contentApi.deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content', 'articles', 'ROUTINE'] });
    }
  });

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setContentJson('');
    setSegment('BOTH');
    setPublished(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Skin Routine Articles</h1>
          <p className="text-slate-500 text-sm mt-1">Author multi-step skin routine guides.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" /> Write Routine
        </button>
      </div>

      {isAdding && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center">
              <Droplets className="h-5 w-5 mr-2 text-indigo-500" /> New Routine Guide
            </h3>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500" 
                />
                <span className="text-sm font-medium text-slate-700">Publish immediately</span>
              </label>
              <button 
                onClick={() => addMutation.mutate()}
                disabled={!title || !contentJson || addMutation.isPending}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-indigo-700 disabled:opacity-50"
              >
                {addMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Save Routine
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Routine Title <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. The 3-Step Morning Glow Routine"
                  className="w-full border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 text-lg font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Steps Content <span className="text-rose-500">*</span></label>
                <textarea 
                  value={contentJson}
                  onChange={e => setContentJson(e.target.value)}
                  placeholder="Step 1: Cleanse with... &#10;Step 2: Apply serum... &#10;Step 3: Moisturize with..."
                  rows={15}
                  className="w-full border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                />
              </div>
            </div>

            <div className="space-y-6 bg-slate-50 p-5 rounded-xl border border-slate-100">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">URL Slug</label>
                <input 
                  type="text" 
                  value={slug || generateSlug(title)}
                  onChange={e => setSlug(e.target.value)}
                  className="w-full border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Segment</label>
                <select 
                  value={segment}
                  onChange={e => setSegment(e.target.value)}
                  className="w-full border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="BOTH">All / Both</option>
                  <option value="COSMETICS">Cosmetics</option>
                  <option value="NUTRITION">Nutrition</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end">
                  <button 
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 text-sm font-medium text-indigo-700 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50"
                  >
                  Cancel
                  </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="p-12 text-center text-slate-500">Loading routines...</div>
      ) : !routines || routines.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <Droplets className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="font-medium text-slate-900">No skin routine articles found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Routine Title</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Segment</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {routines.map((routine: any) => (
                <tr key={routine.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-900 flex items-center">
                       <Droplets className="h-4 w-4 text-indigo-400 mr-2" /> {routine.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 ml-6">/{routine.slug}</div>
                  </td>
                  <td className="py-4 px-6">
                    {routine.published ? (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">
                    {routine.segment}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => {
                        if(window.confirm('Delete this routine?')) deleteMutation.mutate(routine.id);
                      }}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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
