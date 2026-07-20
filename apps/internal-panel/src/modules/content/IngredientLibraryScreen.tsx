import { useQuery } from '@tanstack/react-query';
import { contentApi } from '../../core/api/content';
import { Leaf, Search } from 'lucide-react';
import { useState } from 'react';

export const IngredientLibraryScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: ingredients, isLoading } = useQuery({
    queryKey: ['catalog', 'ingredients'],
    queryFn: () => contentApi.getIngredients()
  });

  const filtered = ingredients?.filter((ing: any) => 
    ing.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ingredient Library</h1>
          <p className="text-slate-500 text-sm mt-1">Directory of all fruit ingredients used in our products.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[600px]">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search ingredients..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div className="text-sm font-medium text-slate-500">
            Total Unique Ingredients: {ingredients?.length || 0}
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-slate-500 flex-1 flex items-center justify-center">Loading ingredients...</div>
        ) : !filtered || filtered.length === 0 ? (
          <div className="p-12 text-center flex-1 flex flex-col items-center justify-center">
            <Leaf className="h-12 w-12 text-slate-300 mb-4" />
            <p className="font-medium text-slate-900">No ingredients found matching "{searchTerm}".</p>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1 content-start overflow-y-auto">
            {filtered.map((ing: any) => (
              <div key={ing.name} className="border border-emerald-100 bg-emerald-50/30 rounded-xl p-4 flex items-start gap-3 hover:bg-emerald-50 transition-colors cursor-pointer group">
                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg shrink-0 group-hover:scale-110 transition-transform">
                  <Leaf className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 capitalize text-sm">{ing.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{ing._count?.product || 0} Products</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
