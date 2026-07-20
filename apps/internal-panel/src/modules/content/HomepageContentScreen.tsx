import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contentApi } from '../../core/api/content';
import { LayoutTemplate, Save, Loader2 } from 'lucide-react';

export const HomepageContentScreen = () => {
  const queryClient = useQueryClient();

  // Form State
  const [heroHeading, setHeroHeading] = useState('');
  const [heroSubheading, setHeroSubheading] = useState('');
  const [seasonalMessage, setSeasonalMessage] = useState('');
  const [footerAbout, setFooterAbout] = useState('');

  const { data: pages, isLoading } = useQuery({
    queryKey: ['content', 'articles', 'PAGE'],
    queryFn: () => contentApi.getAdminArticles('PAGE')
  });

  const homepageRecord = pages?.find((p: any) => p.slug === 'homepage');

  useEffect(() => {
    if (homepageRecord?.contentJson) {
      try {
        const data = JSON.parse(homepageRecord.contentJson);
        setHeroHeading(data.heroHeading || '');
        setHeroSubheading(data.heroSubheading || '');
        setSeasonalMessage(data.seasonalMessage || '');
        setFooterAbout(data.footerAbout || '');
      } catch (e) {
        console.error('Failed to parse homepage content');
      }
    }
  }, [homepageRecord]);

  const saveMutation = useMutation({
    mutationFn: () => {
      const payload = {
        title: 'Homepage Editorial Content',
        slug: 'homepage',
        type: 'PAGE',
        contentJson: JSON.stringify({ heroHeading, heroSubheading, seasonalMessage, footerAbout }),
        segment: 'BOTH',
        published: true 
      };

      if (homepageRecord) {
        return contentApi.updateArticle(homepageRecord.id, payload);
      } else {
        return contentApi.createArticle(payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content', 'articles', 'PAGE'] });
      alert('Homepage content updated successfully!');
    }
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Homepage Content</h1>
          <p className="text-slate-500 text-sm mt-1">Manage editorial copy blocks for the main storefront landing page.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        {isLoading ? (
          <div className="p-12 text-center flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-slate-300 mb-2" />
            Loading homepage config...
          </div>
        ) : (
          <div className="space-y-8">
            
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <LayoutTemplate className="h-5 w-5 mr-2 text-indigo-500" /> Hero Section Copy
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Main Headline (H1)</label>
                  <input 
                    type="text" 
                    value={heroHeading}
                    onChange={e => setHeroHeading(e.target.value)}
                    placeholder="e.g. Pure Fruit. Pure You."
                    className="w-full border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 font-medium text-lg"
                  />
                  <p className="text-xs text-slate-500 mt-1">Appears overlaid on the primary hero banner.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Sub-headline</label>
                  <textarea 
                    value={heroSubheading}
                    onChange={e => setHeroSubheading(e.target.value)}
                    rows={2}
                    placeholder="e.g. Discover our new summer collection infused with natural extracts."
                    className="w-full border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">Announcement / Seasonal Bar</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Global Top-Bar Message</label>
                <input 
                  type="text" 
                  value={seasonalMessage}
                  onChange={e => setSeasonalMessage(e.target.value)}
                  placeholder="e.g. 🌸 Spring Sale: Get 20% off all Citrus products with code SPRING20"
                  className="w-full border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-xs text-slate-500 mt-1">Appears at the very top of every page site-wide.</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">Footer Content</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">"About COSKINn" Short Bio</label>
                <textarea 
                  value={footerAbout}
                  onChange={e => setFooterAbout(e.target.value)}
                  rows={4}
                  className="w-full border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex justify-end">
              <button 
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending}
                className="px-6 py-2.5 font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center shadow-sm"
              >
                {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Publish Live to Storefront
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
