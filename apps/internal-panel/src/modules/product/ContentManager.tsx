import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Save, Plus, X, Type, HelpCircle, PackageCheck, FileText } from 'lucide-react';

interface ContentFormValues {
  howToUse: string;
  warnings: string;
  claims: string;
  storageInstructions: string;
  returnPolicy: string;
  isReturnable: boolean;
  isCodAvailable: boolean;
}

export default function ContentManager({
  product,
  onClose,
  onRefresh
}: {
  product: any;
  onClose: () => void;
  onRefresh: () => void;
}) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState('');

  const { register, handleSubmit } = useForm<ContentFormValues>({
    defaultValues: {
      howToUse: product?.howToUse || '',
      warnings: product?.warnings || '',
      claims: product?.claims || '',
      storageInstructions: product?.storageInstructions || '',
      returnPolicy: product?.returnPolicy || '',
      isReturnable: product?.isReturnable ?? false,
      isCodAvailable: product?.isCodAvailable ?? true,
    }
  });

  useEffect(() => {
    if (product) {
      setIngredients(product.ingredients?.map((i: any) => i.name) || []);
      setBenefits(product.benefits?.map((b: any) => b.name) || []);
    }
  }, [product]);

  const updateMutation = useMutation({
    mutationFn: (data: any) => api.patch(`/product/${product.id}/content`, data),
    onSuccess: () => {
      onRefresh();
      onClose();
    }
  });

  const onSubmit = (data: ContentFormValues) => {
    updateMutation.mutate({
      ...data,
      ingredients,
      benefits
    });
  };

  const addIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim())) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const addBenefit = () => {
    if (newBenefit.trim() && !benefits.includes(newBenefit.trim())) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit('');
    }
  };

  return (
    <div className="fixed inset-0 bg-rose-50/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl flex flex-col max-h-[90vh] border border-rose-100 overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-rose-100 bg-white/50 sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <FileText className="text-rose-500" />
              Content & Policies
            </h2>
            <p className="text-sm text-gray-500 mt-1">Manage content, ingredients, benefits, and commerce rules for {product.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-rose-50 rounded-full transition-colors text-gray-500 hover:text-rose-600">
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-gray-50/50">
          <form id="content-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Section 1: Usage & Warnings */}
            <div className="bg-white p-6 rounded-2xl border border-rose-50 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-3">
                <HelpCircle className="text-rose-500" size={20} /> Usage & Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">How to Use</label>
                  <textarea 
                    {...register('howToUse')} 
                    rows={4} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring focus:ring-rose-200 transition-all bg-gray-50/50"
                    placeholder="Step-by-step usage instructions..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Warnings / Precautions</label>
                  <textarea 
                    {...register('warnings')} 
                    rows={4} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring focus:ring-rose-200 transition-all bg-gray-50/50"
                    placeholder="e.g., Avoid contact with eyes. Keep away from direct sunlight."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Claims</label>
                <textarea 
                  {...register('claims')} 
                  rows={2} 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring focus:ring-rose-200 transition-all bg-gray-50/50"
                  placeholder="e.g., Dermatologically tested, Cruelty-free, Vegan..."
                />
              </div>
            </div>

            {/* Section 2: Dynamic Lists (Ingredients & Benefits) */}
            <div className="bg-white p-6 rounded-2xl border border-rose-50 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-3">
                <Type className="text-rose-500" size={20} /> Ingredients & Benefits
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Ingredients */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Key Ingredients</label>
                  <div className="flex gap-2 mb-3">
                    <input 
                      type="text" 
                      value={newIngredient} 
                      onChange={e => setNewIngredient(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                      className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring focus:ring-rose-200"
                      placeholder="e.g., Hyaluronic Acid"
                    />
                    <button type="button" onClick={addIngredient} className="p-2 bg-rose-100 text-rose-600 rounded-xl hover:bg-rose-200 transition-colors">
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ingredients.map((ing, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                        {ing}
                        <button type="button" onClick={() => setIngredients(ingredients.filter((_, i) => i !== idx))} className="text-gray-400 hover:text-red-500">
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    {ingredients.length === 0 && <span className="text-sm text-gray-400 italic">No ingredients added.</span>}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Key Benefits</label>
                  <div className="flex gap-2 mb-3">
                    <input 
                      type="text" 
                      value={newBenefit} 
                      onChange={e => setNewBenefit(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                      className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring focus:ring-rose-200"
                      placeholder="e.g., Deep Hydration"
                    />
                    <button type="button" onClick={addBenefit} className="p-2 bg-rose-100 text-rose-600 rounded-xl hover:bg-rose-200 transition-colors">
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {benefits.map((ben, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-rose-50 text-rose-700 rounded-lg text-sm font-medium">
                        {ben}
                        <button type="button" onClick={() => setBenefits(benefits.filter((_, i) => i !== idx))} className="text-rose-400 hover:text-red-500">
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    {benefits.length === 0 && <span className="text-sm text-gray-400 italic">No benefits added.</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Commerce Policies */}
            <div className="bg-white p-6 rounded-2xl border border-rose-50 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-3">
                <PackageCheck className="text-rose-500" size={20} /> Commerce & Fulfillment Policies
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Storage Instructions</label>
                  <input 
                    {...register('storageInstructions')} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring focus:ring-rose-200 transition-all bg-gray-50/50"
                    placeholder="e.g., Store in a cool, dry place"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Return Policy</label>
                  <input 
                    {...register('returnPolicy')} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring focus:ring-rose-200 transition-all bg-gray-50/50"
                    placeholder="e.g., 7 days returnable"
                  />
                </div>
              </div>

              <div className="flex gap-8 border-t border-gray-100 pt-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" {...register('isReturnable')} className="peer sr-only" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-rose-600 transition-colors">Is Returnable?</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" {...register('isCodAvailable')} className="peer sr-only" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-rose-600 transition-colors">COD Available?</span>
                </label>
              </div>
            </div>

          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-rose-100 bg-gray-50 rounded-b-3xl flex justify-end gap-3">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            form="content-form"
            type="submit" 
            disabled={updateMutation.isPending}
            className="px-6 py-2.5 rounded-xl font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors flex items-center gap-2 shadow-lg shadow-rose-200 disabled:opacity-70"
          >
            {updateMutation.isPending ? 'Saving...' : <><Save size={18} /> Save Content</>}
          </button>
        </div>

      </div>
    </div>
  );
}
