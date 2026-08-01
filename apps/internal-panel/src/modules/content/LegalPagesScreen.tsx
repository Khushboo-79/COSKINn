import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contentApi } from '../../core/api/content';
import { Scale, Save, Edit, Loader2, Clock } from 'lucide-react';

const LEGAL_PAGES = [
  { slug: 'terms-and-conditions', name: 'Terms and Conditions' },
  { slug: 'privacy-policy', name: 'Privacy Policy' },
  { slug: 'shipping-policy', name: 'Shipping Policy' },
  { slug: 'return-refund-policy', name: 'Return & Refund Policy' },
  { slug: 'cancellation-policy', name: 'Cancellation Policy' },
  { slug: 'cookie-policy', name: 'Cookie Policy' },
];

export const LegalPagesScreen = () => {
  const queryClient = useQueryClient();
  const [activeSlug, setActiveSlug] = useState(LEGAL_PAGES[0].slug);

  // Form State for Editing
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [contentJson, setContentJson] = useState('');

  const { data: pages, isLoading } = useQuery({
    queryKey: ['content', 'articles', 'LEGAL'],
    queryFn: () => contentApi.getAdminArticles('LEGAL')
  });

  const activePageRecord = pages?.find((p: any) => p.slug === activeSlug);

  const startEditing = () => {
    setTitle(activePageRecord?.title || LEGAL_PAGES.find(p => p.slug === activeSlug)?.name);
    setContentJson(activePageRecord?.contentJson ? JSON.parse(activePageRecord.contentJson).text : '');
    setIsEditing(true);
  };

  const saveMutation = useMutation({
    mutationFn: () => {
      const payload = {
        title,
        slug: activeSlug,
        type: 'LEGAL',
        contentJson: JSON.stringify({ text: contentJson }),
        segment: 'BOTH',
        published: true // Legal pages are always published once saved
      };

      if (activePageRecord) {
        return contentApi.updateArticle(activePageRecord.id, payload);
      } else {
        return contentApi.createArticle(payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content', 'articles', 'LEGAL'] });
      setIsEditing(false);
    }
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 flex gap-8">
      {/* Sidebar Navigation */}
      <div className="w-64 shrink-0 space-y-2">
        <div>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 pl-3">Compliance Pages</h2>
          <div className="flex flex-col gap-1">
            {LEGAL_PAGES.map((page) => (
              <button
                key={page.slug}
                onClick={() => {
                  setActiveSlug(page.slug);
                  setIsEditing(false);
                }}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSlug === page.slug
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {page.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[600px]">
        {isLoading ? (
          <div className="p-12 flex-1 flex items-center justify-center text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
          </div>
        ) : isEditing ? (
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center">
                <Scale className="h-5 w-5 mr-2 text-slate-400" />
                Editing: {LEGAL_PAGES.find(p => p.slug === activeSlug)?.name}
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => saveMutation.mutate()}
                  disabled={saveMutation.isPending || !title || !contentJson}
                  className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 disabled:opacity-50 flex items-center shadow-sm"
                >
                  {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Publish Changes
                </button>
              </div>
            </div>

            <div className="space-y-4 flex-1 flex flex-col">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Page Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-slate-900 font-medium"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label className="block text-sm font-medium text-slate-700 mb-1">Content (Markdown supported)</label>
                <textarea 
                  value={contentJson}
                  onChange={e => setContentJson(e.target.value)}
                  className="w-full flex-1 border-slate-300 rounded-lg p-4 focus:ring-2 focus:ring-slate-900 font-mono text-sm leading-relaxed min-h-[400px]"
                  placeholder={`Write the content for ${activeSlug} here...`}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  {activePageRecord?.title || LEGAL_PAGES.find(p => p.slug === activeSlug)?.name}
                </h1>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> Last updated: {activePageRecord ? new Date(activePageRecord.updatedAt).toLocaleDateString() : 'Never'}</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-xs font-mono font-medium text-slate-600">/{activeSlug}</span>
                </div>
              </div>
              <button 
                onClick={startEditing}
                className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-lg font-medium text-sm flex items-center transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" /> Edit Page
              </button>
            </div>

            {activePageRecord ? (
              <div className="prose prose-slate max-w-none flex-1 overflow-y-auto">
                <div className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed">
                  {JSON.parse(activePageRecord.contentJson).text}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-100 rounded-xl bg-slate-50">
                <Scale className="h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Page Not Configured</h3>
                <p className="text-slate-500 mb-6 max-w-md">This legal page has not been written yet. It will return a 404 on the storefront until published.</p>
                <button 
                  onClick={startEditing}
                  className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:bg-slate-800 transition-colors"
                >
                  Write Content Now
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
