import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Tags, ArrowLeft, X } from 'lucide-react';

interface TagInputProps {
  label: string;
  tags: string[];
  onChange: (newTags: string[]) => void;
  placeholder?: string;
}

function TagInput({ label, tags, onChange, placeholder }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="flex flex-wrap items-center gap-2 p-2 min-h-[46px] bg-slate-50 border border-slate-200 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
        {tags.map((tag, index) => (
          <span key={index} className="flex items-center gap-1.5 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-indigo-400 hover:text-indigo-600 focus:outline-none"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-slate-800 placeholder-slate-400"
        />
      </div>
      <p className="text-xs text-slate-400">Press Enter or comma to add a tag</p>
    </div>
  );
}

export default function TagManager({ productId, onClose }: { productId: string, onClose: () => void }) {
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/api/product/${productId}`);
      return data;
    },
  });

  const [ingredients, setIngredients] = useState<string[]>([]);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [skinTypes, setSkinTypes] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);

  // Initialize state when product data is loaded
  useState(() => {
    if (product) {
      setIngredients(product.ingredients?.map((i: any) => i.name) || []);
      setConcerns(product.concerns?.map((c: any) => c.name) || []);
      setSkinTypes(product.skinTypes?.map((s: any) => s.name) || []);
      setBenefits(product.benefits?.map((b: any) => b.name) || []);
    }
  });


  const updateMutation = useMutation({
    mutationFn: (tagsData: any) => axios.patch(`http://localhost:3000/api/product/${productId}/tags`, tagsData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onClose(); // Optional: close after saving, or keep open with a toast
    },
  });

  const handleSave = () => {
    updateMutation.mutate({
      ingredients,
      concerns,
      skinTypes,
      benefits,
    });
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-400">Loading tag data...</div>;
  }

  // Effect to sync remote data initially
  if (product && ingredients.length === 0 && product.ingredients?.length > 0 && !updateMutation.isPending) {
    setIngredients(product.ingredients.map((i: any) => i.name));
    setConcerns(product.concerns?.map((c: any) => c.name) || []);
    setSkinTypes(product.skinTypes?.map((s: any) => s.name) || []);
    setBenefits(product.benefits?.map((b: any) => b.name) || []);
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4">
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
            <Tags className="w-6 h-6 text-fuchsia-500" />
            Manage Tags
          </h2>
          <p className="text-slate-500 text-sm">{product?.name}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 space-y-8">
        <TagInput 
          label="Key Ingredients (e.g., Strawberry, Vitamin C, Niacinamide)" 
          tags={ingredients} 
          onChange={setIngredients} 
          placeholder="Add ingredient..."
        />

        <TagInput 
          label="Target Skin Concerns (e.g., Acne, Dryness, Pigmentation)" 
          tags={concerns} 
          onChange={setConcerns} 
          placeholder="Add skin concern..."
        />

        <TagInput 
          label="Suitable Skin Types (e.g., Oily, Dry, Sensitive, All)" 
          tags={skinTypes} 
          onChange={setSkinTypes} 
          placeholder="Add skin type..."
        />

        <TagInput 
          label="Product Benefits (e.g., Hydrating, Brightening)" 
          tags={benefits} 
          onChange={setBenefits} 
          placeholder="Add benefit..."
        />

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button 
            onClick={handleSave} 
            disabled={updateMutation.isPending} 
            className="px-6 py-2.5 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 transition-colors font-medium disabled:opacity-50"
          >
            {updateMutation.isPending ? 'Saving Tags...' : 'Save Tags'}
          </button>
        </div>
      </div>
    </div>
  );
}
