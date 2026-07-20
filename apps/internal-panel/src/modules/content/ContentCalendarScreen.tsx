import { useQuery } from '@tanstack/react-query';
import { contentApi } from '../../core/api/content';
import { Calendar, FileText, Sparkles, Droplets, Scale, LayoutTemplate, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ContentCalendarScreen = () => {
  // Fetch ALL content articles via the admin endpoint
  const { data: articles, isLoading } = useQuery({
    queryKey: ['content', 'articles', 'ALL'],
    queryFn: () => contentApi.getAdminArticles()
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case 'BLOG': return <FileText className="h-4 w-4 text-indigo-500" />;
      case 'TIP': return <Sparkles className="h-4 w-4 text-amber-500" />;
      case 'ROUTINE': return <Droplets className="h-4 w-4 text-cyan-500" />;
      case 'LEGAL': return <Scale className="h-4 w-4 text-slate-500" />;
      case 'PAGE': return <LayoutTemplate className="h-4 w-4 text-purple-500" />;
      default: return <FileText className="h-4 w-4 text-slate-400" />;
    }
  };

  const getEditPathForType = (type: string) => {
    switch (type) {
      case 'BLOG': return '/content/blogs';
      case 'TIP': return '/content/tips';
      case 'ROUTINE': return '/content/routines';
      case 'LEGAL': return '/content/legal';
      case 'PAGE': return '/content/homepage';
      default: return '/content/blogs';
    }
  };

  // Sort by updatedAt descending
  const sortedArticles = articles ? [...articles].sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()) : [];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Content Calendar</h1>
          <p className="text-slate-500 text-sm mt-1">Unified view of all content drafts, publications, and updates.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="font-medium text-slate-700 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-indigo-500" /> Publishing Pipeline
          </div>
          <div className="text-sm font-medium text-slate-500">
            Total Content Entries: {articles?.length || 0}
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-slate-500">Loading calendar...</div>
        ) : !sortedArticles || sortedArticles.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="font-medium text-slate-900">No content found.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title / Slug</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Modified</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {sortedArticles.map((article: any) => (
                <tr key={article.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-white border border-slate-200 rounded shadow-sm">
                        {getIconForType(article.type)}
                      </div>
                      <span className="text-xs font-bold text-slate-600">{article.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-900 truncate max-w-sm" title={article.title}>{article.title}</div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">/{article.slug}</div>
                  </td>
                  <td className="py-4 px-6">
                    {article.published ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1.5 text-slate-400" />
                      {new Date(article.updatedAt).toLocaleString(undefined, {
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link 
                      to={getEditPathForType(article.type)}
                      className="text-indigo-600 hover:text-indigo-900 text-sm font-medium hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
