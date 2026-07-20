import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contentApi } from '../../core/api/content';
import { s3Client } from '../../core/api/s3Client';
import { FileText, Plus, Save, Trash2, Edit, Loader2, Image as ImageIcon } from 'lucide-react';

export const BlogEditorScreen = () => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [contentJson, setContentJson] = useState('');
  const [segment, setSegment] = useState('BOTH');
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [published, setPublished] = useState(false);

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['content', 'articles', 'BLOG'],
    queryFn: () => contentApi.getAdminArticles('BLOG')
  });

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const addMutation = useMutation({
    mutationFn: () => contentApi.createArticle({
      title,
      slug: slug || generateSlug(title),
      type: 'BLOG',
      contentJson: JSON.stringify({ body: contentJson }),
      segment,
      heroImageUrl,
      seoTitle,
      seoDesc,
      published
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content', 'articles', 'BLOG'] });
      setIsAdding(false);
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => contentApi.deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content', 'articles', 'BLOG'] });
    }
  });

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setContentJson('');
    setSegment('BOTH');
    setHeroImageUrl('');
    setSeoTitle('');
    setSeoDesc('');
    setPublished(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        setUploading(true);
        const url = await s3Client.uploadFile(e.target.files[0], 'blogs');
        setHeroImageUrl(url);
      } catch (err) {
        console.error("Upload failed", err);
        alert("Image upload failed");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
          <p className="text-slate-500 text-sm mt-1">Author and publish long-form editorial content.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" /> Write New Post
        </button>
      </div>

      {isAdding && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">New Blog Post</h3>
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
                Save Post
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. 5 Benefits of Vitamin C"
                  className="w-full border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 text-lg font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Content <span className="text-rose-500">*</span></label>
                <textarea 
                  value={contentJson}
                  onChange={e => setContentJson(e.target.value)}
                  placeholder="Write your article content here... (Supports Markdown)"
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
                  <option value="COSMETICS">Cosmetics Only</option>
                  <option value="NUTRITION">Nutrition Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 bg-white h-32 flex flex-col items-center justify-center relative overflow-hidden group">
                  {heroImageUrl ? (
                    <img src={heroImageUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <ImageIcon className="h-6 w-6 text-slate-300 mb-1" />
                      <span className="text-xs text-slate-500">Upload Image</span>
                    </>
                  )}
                  <input 
                    type="file" 
                    onChange={handleImageUpload} 
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    disabled={uploading}
                  />
                  {uploading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                      <Loader2 className="h-5 w-5 text-indigo-600 animate-spin" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h4 className="text-sm font-bold text-slate-700">SEO Settings</h4>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Meta Title</label>
                  <input 
                    type="text" 
                    value={seoTitle}
                    onChange={e => setSeoTitle(e.target.value)}
                    placeholder={title}
                    className="w-full border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Meta Description</label>
                  <textarea 
                    value={seoDesc}
                    onChange={e => setSeoDesc(e.target.value)}
                    rows={2}
                    className="w-full border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="p-12 text-center text-slate-500">Loading blog posts...</div>
      ) : !blogs || blogs.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="font-medium text-slate-900">No blog posts found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Segment</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map((blog: any) => (
                <tr key={blog.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6">
                    <div className="font-medium text-slate-900">{blog.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5">/{blog.slug}</div>
                  </td>
                  <td className="py-4 px-6">
                    {blog.published ? (
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
                    {blog.segment}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => {
                        if(window.confirm('Delete this post?')) deleteMutation.mutate(blog.id);
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
