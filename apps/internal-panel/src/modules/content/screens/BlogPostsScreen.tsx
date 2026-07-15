import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import { FileText, Edit3, Trash2, Plus, Save, X, Calendar } from 'lucide-react';

export default function BlogManager() {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [form, setForm] = useState<any>({});

  const { data: posts, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const res = await api.get('/content/articles?type=BLOG');
      return res.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.post('/content/admin/articles', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      setIsCreating(false);
      setForm({});
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => api.put(`/content/admin/articles/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      setIsEditing(null);
      setForm({});
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/content/admin/articles/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  });

  const handleSave = (id?: string) => {
    const data = {
      title: form.title,
      slug: form.slug,
      type: 'BLOG',
      contentJson: form.contentJson || '{}',
      heroImageUrl: form.heroImageUrl,
      seoTitle: form.seoTitle,
      seoDesc: form.seoDesc,
      seoKeywords: form.seoKeywords,
      published: form.published || false
    };

    if (id) {
      updateMutation.mutate({ id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const renderForm = (id?: string) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 space-y-4 mb-6">
      <div className="flex justify-between items-center border-b pb-3">
        <h3 className="font-bold text-gray-900">{id ? 'Edit Blog Post' : 'New Blog Post'}</h3>
        <button onClick={() => id ? setIsEditing(null) : setIsCreating(false)} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600">Title</label>
          <input 
            type="text" 
            placeholder="e.g. Summer Skincare Routine"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#FF0069] outline-none"
            value={form.title || ''}
            onChange={e => {
              const title = e.target.value;
              const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
              setForm({...form, title, slug: id ? form.slug : slug});
            }}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600">URL Slug</label>
          <input 
            type="text" 
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#FF0069] outline-none font-mono"
            value={form.slug || ''}
            onChange={e => setForm({...form, slug: e.target.value})}
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-semibold text-gray-600">Hero Image URL</label>
          <input 
            type="text" 
            placeholder="https://example.com/image.jpg"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#FF0069] outline-none"
            value={form.heroImageUrl || ''}
            onChange={e => setForm({...form, heroImageUrl: e.target.value})}
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-semibold text-gray-600">Content (Markdown / Text)</label>
          <textarea 
            rows={6}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#FF0069] outline-none"
            value={form.contentJson || ''}
            onChange={e => setForm({...form, contentJson: e.target.value})}
          />
        </div>

        {/* SEO SECTION */}
        <div className="md:col-span-2 pt-4 border-t mt-2">
          <h4 className="font-bold text-gray-800 text-sm mb-3">SEO Configuration</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Meta Title</label>
              <input 
                type="text" 
                placeholder="Title for search engines..."
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#FF0069] outline-none"
                value={form.seoTitle || ''}
                onChange={e => setForm({...form, seoTitle: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Meta Keywords</label>
              <input 
                type="text" 
                placeholder="skincare, tips, glowing..."
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#FF0069] outline-none"
                value={form.seoKeywords || ''}
                onChange={e => setForm({...form, seoKeywords: e.target.value})}
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-semibold text-gray-600">Meta Description</label>
              <textarea 
                rows={2}
                placeholder="Description for search engines..."
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#FF0069] outline-none"
                value={form.seoDesc || ''}
                onChange={e => setForm({...form, seoDesc: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <input 
            type="checkbox" 
            className="w-4 h-4 text-[#FF0069] rounded focus:ring-[#FF0069]"
            checked={form.published} 
            onChange={e => setForm({...form, published: e.target.checked})}
          /> 
          Publish Immediately
        </label>
        <button 
          onClick={() => handleSave(id)} 
          className="flex items-center gap-2 px-4 py-2 bg-[#FF0069] text-white font-medium rounded-lg hover:bg-rose-600 transition-colors"
        >
          <Save className="w-4 h-4" /> Save Post
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Blog Manager</h2>
          <p className="text-sm text-gray-500">Create and manage content articles</p>
        </div>
        <button 
          onClick={() => { setIsCreating(true); setForm({ published: false }); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF0069] text-white rounded-lg hover:bg-rose-600 transition-all font-medium shadow-md"
        >
          <Plus className="w-4 h-4" /> Write New Post
        </button>
      </div>

      {isCreating && renderForm()}

      {isLoading ? (
        <div className="p-8 text-center text-gray-500">Loading blog posts...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post: any) => isEditing === post.id ? (
            <div key={post.id} className="col-span-full">
              {renderForm(post.id)}
            </div>
          ) : (
            <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-all group">
              <div className="h-40 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                {post.heroImageUrl ? (
                  <img src={post.heroImageUrl} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  <FileText className="w-8 h-8 text-gray-300" />
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-[#FF0069] transition-colors">{post.title}</h3>
                <p className="text-xs text-gray-500 font-mono mb-3 line-clamp-1">{post.slug}</p>
                
                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => { setIsEditing(post.id); setForm(post); }}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => { if(confirm('Delete post?')) deleteMutation.mutate(post.id); }}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {(!posts || posts.length === 0) && !isCreating && (
            <div className="col-span-full p-12 text-center border-2 border-dashed border-gray-200 rounded-2xl">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-gray-900 font-semibold">No blog posts yet</h3>
              <p className="text-gray-500 text-sm mt-1">Write your first post to engage your audience.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
