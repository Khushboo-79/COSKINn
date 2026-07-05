import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { Package, Search, Plus, Filter, Edit2, Trash2, X, Layers, Tags } from 'lucide-react';
import VariantManager from './VariantManager';
import TagManager from './TagManager';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  sku: z.string().min(1, 'SKU is required'),
  categoryId: z.string().min(1, 'Category is required'),
  brandId: z.string().min(1, 'Brand is required'),
  description: z.string().optional(),
  mrp: z.coerce.number().min(0, 'MRP must be positive'),
  discountPrice: z.coerce.number().min(0, 'Selling Price must be positive').optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function ProductManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [managingVariantFor, setManagingVariantFor] = useState<string | null>(null);
  const [managingTagsFor, setManagingTagsFor] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', filterCategory, filterBrand, searchTerm],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filterCategory) params.append('categoryId', filterCategory);
      if (filterBrand) params.append('brandId', filterBrand);
      if (searchTerm) params.append('search', searchTerm);
      const { data } = await axios.get(`http://localhost:3000/api/product?${params.toString()}`);
      return data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:3000/api/category');
      return data;
    },
  });

  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:3000/api/brand');
      return data;
    },
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const createMutation = useMutation({
    mutationFn: (newProduct: ProductFormValues) => axios.post('http://localhost:3000/api/product', newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setIsCreating(false);
      reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => axios.delete(`http://localhost:3000/api/product/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  const onSubmit = (data: ProductFormValues) => {
    createMutation.mutate(data);
  };

  if (managingVariantFor) {
    return <VariantManager productId={managingVariantFor} onClose={() => setManagingVariantFor(null)} />;
  }

  if (managingTagsFor) {
    return <TagManager productId={managingTagsFor} onClose={() => setManagingTagsFor(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
          <Package className="w-6 h-6 text-rose-500" />
          Product Catalog
        </h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>
          <div className="relative">
            <Filter className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 appearance-none"
            >
              <option value="">All Categories</option>
              {categories?.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <Filter className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 appearance-none"
            >
              <option value="">All Brands</option>
              {brands?.map((b: any) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isCreating && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white/80 backdrop-blur border-b border-slate-100 p-6 flex items-center justify-between z-10">
              <h3 className="text-lg font-semibold text-slate-800">Create New Product</h3>
              <button onClick={() => {setIsCreating(false); reset();}} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Product Name</label>
                  <input {...register('name')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" placeholder="e.g. Hydrating Serum" />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">URL Slug</label>
                  <input {...register('slug')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" placeholder="e.g. hydrating-serum" />
                  {errors.slug && <p className="text-red-500 text-xs">{errors.slug.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">SKU</label>
                  <input {...register('sku')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" placeholder="e.g. SERUM-001" />
                  {errors.sku && <p className="text-red-500 text-xs">{errors.sku.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Brand</label>
                  <select {...register('brandId')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500">
                    <option value="">Select Brand</option>
                    {brands?.map((b: any) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                  {errors.brandId && <p className="text-red-500 text-xs">{errors.brandId.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Category</label>
                  <select {...register('categoryId')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500">
                    <option value="">Select Category</option>
                    {categories?.map((c: any) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  {errors.categoryId && <p className="text-red-500 text-xs">{errors.categoryId.message}</p>}
                </div>
                
                <div className="space-y-1.5 col-span-2">
                  <label className="text-sm font-medium text-slate-700">Description</label>
                  <textarea {...register('description')} rows={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" placeholder="Product details..." />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">MRP (₹)</label>
                  <input type="number" {...register('mrp')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
                  {errors.mrp && <p className="text-red-500 text-xs">{errors.mrp.message}</p>}
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Selling Price (₹)</label>
                  <input type="number" {...register('discountPrice')} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500" />
                  {errors.discountPrice && <p className="text-red-500 text-xs">{errors.discountPrice.message}</p>}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => {setIsCreating(false); reset();}} className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors font-medium">Cancel</button>
                <button type="submit" disabled={createMutation.isPending} className="px-5 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium disabled:opacity-50">
                  {createMutation.isPending ? 'Saving...' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-400">Loading products...</div>
        ) : products?.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center text-slate-400">
            <Package className="w-12 h-12 mb-4 text-slate-200" />
            <p className="text-lg font-medium text-slate-600">No products found</p>
            <p className="text-sm">Get started by creating your first product.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products?.map((product: any) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{product.name}</div>
                    <div className="text-sm text-slate-400">Slug: {product.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                      {product.category?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {product.brand?.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-800">₹{product.discountPrice || product.mrp}</div>
                    {product.discountPrice && product.discountPrice < product.mrp && (
                      <div className="text-xs text-slate-400 line-through">₹{product.mrp}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        title="Manage Tags"
                        onClick={() => setManagingTagsFor(product.id)}
                        className="p-2 text-slate-400 hover:text-fuchsia-500 hover:bg-fuchsia-50 rounded-lg transition-colors"
                      >
                        <Tags className="w-4 h-4" />
                      </button>
                      <button 
                        title="Manage Variants & Shades"
                        onClick={() => setManagingVariantFor(product.id)}
                        className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Layers className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          if(confirm('Are you sure you want to delete this product?')) {
                            deleteMutation.mutate(product.id);
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
