import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Plus, Image as ImageIcon, Trash2, Edit3, Save, X } from 'lucide-react';

export default function BannerManager() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [isCreating, setIsCreating] = useState(false);

  const { data: banners, isLoading } = useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      const res = await api.get('/marketing/banners');
      return res.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.post('/marketing/banners', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      setIsCreating(false);
      setEditForm({});
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => api.put(`/marketing/banners/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      setIsEditing(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/marketing/banners/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
    }
  });

  const handleSave = (id?: string) => {
    if (id) {
      updateMutation.mutate({ id, data: editForm });
    } else {
      createMutation.mutate(editForm);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Banners</h2>
          <p className="text-sm text-gray-500">Manage homepage and category banners</p>
        </div>
        <button 
          onClick={() => { setIsCreating(true); setEditForm({ isActive: true, position: 'hero', sortOrder: 0 }); }}
          className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
        >
          <Plus className="w-4 h-4" /> Add Banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isCreating && (
          <div className="border rounded-xl p-4 bg-rose-50 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900">New Banner</h3>
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Banner Title" 
                className="w-full border rounded px-3 py-2 text-sm"
                value={editForm.title || ''}
                onChange={e => setEditForm({...editForm, title: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Image URL" 
                className="w-full border rounded px-3 py-2 text-sm"
                value={editForm.imageUrl || ''}
                onChange={e => setEditForm({...editForm, imageUrl: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Link URL (Optional)" 
                className="w-full border rounded px-3 py-2 text-sm"
                value={editForm.linkUrl || ''}
                onChange={e => setEditForm({...editForm, linkUrl: e.target.value})}
              />
              <select 
                className="w-full border rounded px-3 py-2 text-sm"
                value={editForm.position || 'hero'}
                onChange={e => setEditForm({...editForm, position: e.target.value})}
              >
                <option value="hero">Hero (Top)</option>
                <option value="mid-page">Mid Page</option>
                <option value="footer">Footer</option>
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setIsCreating(false)} className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded">Cancel</button>
                <button onClick={() => handleSave()} className="px-3 py-1 text-sm bg-rose-600 text-white rounded hover:bg-rose-700 flex items-center gap-1">
                  <Save className="w-4 h-4" /> Save
                </button>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="col-span-full p-8 text-center text-gray-500">Loading banners...</div>
        ) : (
          banners?.map((banner: any) => (
            <div key={banner.id} className="border rounded-xl overflow-hidden bg-white shadow-sm flex flex-col">
              {isEditing === banner.id ? (
                <div className="p-4 space-y-3 flex-1">
                  <input 
                    type="text" 
                    className="w-full border rounded px-3 py-2 text-sm"
                    value={editForm.title || ''}
                    onChange={e => setEditForm({...editForm, title: e.target.value})}
                  />
                  <input 
                    type="text" 
                    className="w-full border rounded px-3 py-2 text-sm"
                    value={editForm.imageUrl || ''}
                    onChange={e => setEditForm({...editForm, imageUrl: e.target.value})}
                  />
                  <input 
                    type="text" 
                    className="w-full border rounded px-3 py-2 text-sm"
                    value={editForm.linkUrl || ''}
                    onChange={e => setEditForm({...editForm, linkUrl: e.target.value})}
                  />
                  <select 
                    className="w-full border rounded px-3 py-2 text-sm"
                    value={editForm.position || 'hero'}
                    onChange={e => setEditForm({...editForm, position: e.target.value})}
                  >
                    <option value="hero">Hero (Top)</option>
                    <option value="mid-page">Mid Page</option>
                    <option value="footer">Footer</option>
                  </select>
                  <label className="flex items-center gap-2 text-sm">
                    <input 
                      type="checkbox" 
                      checked={editForm.isActive} 
                      onChange={e => setEditForm({...editForm, isActive: e.target.checked})}
                    /> Active
                  </label>
                  <div className="flex justify-end gap-2 pt-2">
                    <button onClick={() => setIsEditing(null)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"><X className="w-4 h-4" /></button>
                    <button onClick={() => handleSave(banner.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-full"><Save className="w-4 h-4" /></button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="h-40 bg-gray-100 relative overflow-hidden flex items-center justify-center group">
                    {banner.imageUrl ? (
                      <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    )}
                    {!banner.isActive && (
                      <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">Inactive</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 line-clamp-1">{banner.title}</h3>
                      <div className="text-xs text-gray-500 mt-1 flex gap-2">
                        <span className="bg-gray-100 px-2 py-0.5 rounded">{banner.position}</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                      <button 
                        onClick={() => { setIsEditing(banner.id); setEditForm(banner); }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => { if(confirm('Delete banner?')) deleteMutation.mutate(banner.id); }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
