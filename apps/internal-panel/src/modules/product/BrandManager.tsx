import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Plus, Edit2, Trash2, ShieldCheck, X } from 'lucide-react';

const API_URL = 'http://localhost:3000/brands';

type Brand = {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  isActive: boolean;
};

export const BrandManager = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: brands, isLoading } = useQuery<Brand[]>({
    queryKey: ['brands'],
    queryFn: async () => {
      const { data } = await axios.get(API_URL);
      return data;
    },
  });

  const createBrand = useMutation({
    mutationFn: (newBrand: Partial<Brand>) => axios.post(API_URL, newBrand),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      setIsModalOpen(false);
    },
  });

  const deleteBrand = useMutation({
    mutationFn: (id: string) => axios.delete(`${API_URL}/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['brands'] }),
  });

  return (
    <div className="h-full flex flex-col p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Brand Catalog</h1>
          <p className="text-gray-500 mt-1">Manage product brands and their visibility.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus size={18} /> Add Brand
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands?.map((brand) => (
              <div key={brand.id} className="bg-white/70 backdrop-blur-sm border border-rose-100 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full blur-2xl opacity-40 transition-all ${brand.isActive ? 'bg-green-400' : 'bg-gray-400'}`} />
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-xl border border-rose-200">
                    {brand.logoUrl ? (
                      <img src={brand.logoUrl} alt={brand.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      brand.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${brand.isActive ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700 border border-gray-200'}`}>
                    {brand.isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{brand.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 min-h-[2.5rem]">
                  {brand.description || 'No description provided.'}
                </p>
                <div className="mt-5 pt-4 border-t border-rose-50 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => deleteBrand.mutate(brand.id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {brands?.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-400 border-2 border-dashed border-rose-100 rounded-3xl bg-white/30 backdrop-blur-sm">
                <ShieldCheck size={48} className="mx-auto mb-4 opacity-50 text-rose-400" />
                <p className="text-lg font-medium">No brands found</p>
                <p className="text-sm">Click "Add Brand" to create your first one.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-6 py-4 border-b border-rose-100 flex justify-between items-center bg-rose-50/50">
              <h2 className="text-xl font-bold text-gray-800">Add New Brand</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-white hover:bg-gray-100 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                createBrand.mutate({
                  name: formData.get('name') as string,
                  description: formData.get('description') as string,
                  isActive: true,
                });
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Brand Name *</label>
                <input 
                  name="name"
                  required
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/20 transition-all outline-none bg-gray-50/50 focus:bg-white"
                  placeholder="e.g. L'Oreal Paris"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea 
                  name="description"
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/20 transition-all outline-none bg-gray-50/50 focus:bg-white resize-none"
                  placeholder="Brand details..."
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
                  disabled={createBrand.isPending}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium shadow-md shadow-rose-200 transition-colors disabled:opacity-50"
                >
                  {createBrand.isPending ? 'Saving...' : 'Save Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
