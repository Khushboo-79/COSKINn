import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Plus, Edit2, Trash2, LayoutList, X, ChevronDown, ChevronRight, CornerDownRight } from 'lucide-react';
const API_URL = '/categories';
type Subcategory = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  subcategories: Subcategory[];
};

export const CategoryManager = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addingSubcategoryTo, setAddingSubcategoryTo] = useState<string | null>(null);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});

  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get(API_URL);
      return data;
    },
  });

  const createCategory = useMutation({
    mutationFn: (newCat: Partial<Category>) => api.post(API_URL, newCat),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Failed to create category');
    }
  });

  const createSubcategory = useMutation({
    mutationFn: (newSubcat: Partial<Subcategory> & { categoryId: string }) => api.post(`${API_URL}/subcategories`, newSubcat),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setAddingSubcategoryTo(null);
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Failed to create subcategory');
    }
  });

  const deleteCategory = useMutation({
    mutationFn: (id: string) => api.delete(`${API_URL}/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
    onError: (error: any) => alert(error.response?.data?.message || 'Failed to delete category')
  });

  const deleteSubcategory = useMutation({
    mutationFn: (id: string) => api.delete(`${API_URL}/subcategories/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
    onError: (error: any) => alert(error.response?.data?.message || 'Failed to delete subcategory')
  });

  const toggleExpand = (id: string) => {
    setExpandedCats(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="h-full flex flex-col p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Category Structure</h1>
          <p className="text-gray-500 mt-1">Organize your product hierarchy and sub-categories.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl">
            {categories?.map((cat) => (
              <div key={cat.id} className="bg-white/70 backdrop-blur-sm border border-rose-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <div 
                  className="p-5 flex items-center justify-between cursor-pointer group"
                  onClick={() => toggleExpand(cat.id)}
                >
                  <div className="flex items-center gap-4">
                    <button className="text-rose-400 hover:text-rose-600 transition-colors p-1 rounded-md hover:bg-rose-50">
                      {expandedCats[cat.id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        {cat.name} 
                        <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">/{cat.slug}</span>
                      </h3>
                      <p className="text-gray-500 text-sm">{cat.description || 'No description'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-rose-500 bg-rose-50 px-3 py-1 rounded-full">
                      {cat.subcategories?.length || 0} Subcats
                    </span>
                    <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); /* handle edit */ }}
                      className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteCategory.mutate(cat.id); }}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Subcategories Expansion */}
                {expandedCats[cat.id] && (
                  <div className="bg-rose-50/50 border-t border-rose-100 p-4 pl-14 space-y-2 animate-in slide-in-from-top-2 fade-in duration-200">
                    {cat.subcategories?.length > 0 ? (
                      cat.subcategories.map(sub => (
                        <div key={sub.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-rose-50 shadow-sm">
                          <div className="flex items-center gap-3">
                            <CornerDownRight size={16} className="text-rose-300" />
                            <span className="font-medium text-gray-700">{sub.name}</span>
                            <span className="text-xs text-gray-400">/{sub.slug}</span>
                          </div>
                          <div className="flex gap-2">
                             <button className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"><Edit2 size={14} /></button>
                             <button 
                                 onClick={(e) => { e.stopPropagation(); deleteSubcategory.mutate(sub.id); }} 
                                 className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                               >
                                 <Trash2 size={14} />
                               </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500 py-2 italic pl-6">No subcategories yet.</div>
                    )}
                    <button 
                      onClick={() => setAddingSubcategoryTo(cat.id)}
                      className="mt-2 ml-6 text-sm font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 py-1 px-2 rounded-md hover:bg-rose-100/50 transition-colors"
                    >
                      <Plus size={14} /> Add Subcategory
                    </button>
                  </div>
                )}
              </div>
            ))}
            
            {categories?.length === 0 && (
              <div className="py-12 text-center text-gray-400 border-2 border-dashed border-rose-100 rounded-3xl bg-white/30 backdrop-blur-sm">
                <LayoutList size={48} className="mx-auto mb-4 opacity-50 text-rose-400" />
                <p className="text-lg font-medium">No categories found</p>
                <p className="text-sm">Click "Add Category" to build your hierarchy.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-6 py-4 border-b border-rose-100 flex justify-between items-center bg-rose-50/50">
              <h2 className="text-xl font-bold text-gray-800">Add New Category</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-white hover:bg-gray-100 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name') as string;
                const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                
                createCategory.mutate({
                  name,
                  slug,
                  description: formData.get('description') as string,
                  isActive: true,
                });
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category Name *</label>
                <input 
                  name="name"
                  required
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/20 transition-all outline-none bg-gray-50/50 focus:bg-white"
                  placeholder="e.g. Skincare"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea 
                  name="description"
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/20 transition-all outline-none bg-gray-50/50 focus:bg-white resize-none"
                  placeholder="Optional description"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={createCategory.isPending}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium shadow-md shadow-rose-200 transition-colors disabled:opacity-50"
                >
                  {createCategory.isPending ? 'Saving...' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subcategory Modal */}
      {addingSubcategoryTo && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-6 py-4 border-b border-rose-100 flex justify-between items-center bg-rose-50/50">
              <h2 className="text-xl font-bold text-gray-800">Add Subcategory</h2>
              <button onClick={() => setAddingSubcategoryTo(null)} className="text-gray-400 hover:text-gray-600 bg-white hover:bg-gray-100 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name') as string;
                const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                
                createSubcategory.mutate({
                  name,
                  slug,
                  categoryId: addingSubcategoryTo,
                  isActive: true,
                });
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Subcategory Name *</label>
                <input 
                  name="name"
                  required
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/20 transition-all outline-none bg-gray-50/50 focus:bg-white"
                  placeholder="e.g. Cleansers"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setAddingSubcategoryTo(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={createSubcategory.isPending}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium shadow-md shadow-rose-200 transition-colors disabled:opacity-50"
                >
                  {createSubcategory.isPending ? 'Saving...' : 'Save Subcategory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
