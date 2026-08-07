import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../../core/api/product';
import { resolveImageUrl } from '../../core/api/client';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Edit2, Package, Tag, Filter, Search, Trash2, Eye, X, Star } from 'lucide-react';
import { toast } from 'sonner';

export const ProductListScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productApi.getProducts
  });

  const [productToDelete, setProductToDelete] = useState<{id: string, name: string} | null>(null);
  const [productToView, setProductToView] = useState<any | null>(null);

  const deleteMutation = useMutation({
    mutationFn: productApi.deleteProduct,
    onSuccess: () => {
      toast.success('Product deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setProductToDelete(null);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete product');
      setProductToDelete(null);
    }
  });

  const bestsellerMutation = useMutation({
    mutationFn: ({ id, isBestseller }: { id: string, isBestseller: boolean }) => productApi.setBestseller(id, isBestseller),
    onSuccess: (_, variables) => {
      toast.success(`Product ${variables.isBestseller ? 'added to' : 'removed from'} bestsellers`);
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => toast.error('Failed to update bestseller status')
  });

  const handleDelete = (id: string, name: string) => {
    setProductToDelete({ id, name });
  };

  const filteredProducts = products.filter((product: any) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStatus = true;
    if (statusFilter !== 'ALL') {
      if (statusFilter === 'LIVE') matchesStatus = (product.status === 'LIVE' || product.published);
      else matchesStatus = product.status === statusFilter;
    }

    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: 'name',
      header: 'Product Name',
      sortable: true,
      render: (product: any) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
            {product.images?.[0]?.url ? (
              <img 
                src={resolveImageUrl(product.images[0].url)} 
                alt={product.name} 
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=No+Img';
                }}
              />
            ) : (
              <Package className="h-5 w-5 text-slate-400" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-slate-900">{product.name}</p>
              {product.isBestseller && (
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" title="Bestseller" />
              )}
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{product.sku || 'No SKU'}</p>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      header: 'Category',
      render: (product: any) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 text-sm border border-slate-200">
          <Tag className="h-3.5 w-3.5 text-slate-400" />
          {product.category?.name || 'Uncategorized'}
        </span>
      )
    },
    {
      key: 'price',
      header: 'Price',
      sortable: true,
      render: (product: any) => (
        <span className="font-medium text-slate-900">
          ₹{product.mrp || product.basePrice || 0}
        </span>
      )
    },
    {
      key: 'qty',
      header: 'Qty',
      render: (product: any) => {
        const qty = product.variants?.[0]?.stockQuantity || 0;
        return <span className="font-medium text-slate-700">{qty}</span>;
      }
    },
    {
      key: 'status',
      header: 'Status',
      render: (product: any) => {
        const isActive = product.status === 'LIVE' || product.published;
        return (
          <StatusBadge 
            status={isActive ? 'Active' : 'Draft'} 
            variant={isActive ? 'success' : 'warning'} 
          />
        );
      }
    },
    {
      key: 'actions',
      header: '',
      render: (product: any) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setProductToView(product)}
            className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors inline-flex"
            title="View Product"
          >
            <Eye className="h-4 w-4" />
          </button>
          <Link 
            to={`/product/edit/${product.id}`}
            className="p-1.5 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors inline-flex"
            title="Edit Product"
          >
            <Edit2 className="h-4 w-4" />
          </Link>
          <button 
            onClick={() => handleDelete(product.id, product.name)}
            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors inline-flex"
            title="Delete Product"
            disabled={deleteMutation.isPending}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Package className="h-6 w-6 text-primary-500" />
            Product Catalog
          </h1>
          <p className="text-slate-500 mt-1">Manage all products across your store.</p>
        </div>
        <Link 
          to="/product/create"
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-xl shadow-sm text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          Add Product
        </Link>
      </div>

      <DataTable 
        data={filteredProducts} 
        columns={columns} 
        searchPlaceholder="Search by product name or SKU..."
        onSearch={setSearchTerm}
        onFilterClick={() => setIsFilterOpen(true)}
      />

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary-500" />
              Filter Products
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Product Status</label>
                <div className="relative">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white text-slate-700 transition-all cursor-pointer"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="LIVE">Active / Live</option>
                    <option value="DRAFT">Draft</option>
                    <option value="PENDING_APPROVAL">Pending Approval</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-5">
              <button 
                onClick={() => {
                  setStatusFilter('ALL');
                  setIsFilterOpen(false);
                }}
                className="px-4 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-xl transition-colors"
              >
                Clear & Close
              </button>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Product Modal */}
      {productToView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Package className="h-5 w-5 text-primary-500" />
                Product Details
              </h3>
              <button onClick={() => setProductToView(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500">Name</p>
                  <p className="font-medium text-slate-900">{productToView.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">SKU</p>
                  <p className="font-medium text-slate-900">{productToView.sku || productToView.variants?.[0]?.sku || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Category</p>
                  <p className="font-medium text-slate-900">{productToView.category?.name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Status</p>
                  <StatusBadge status={productToView.status === 'LIVE' ? 'Active' : 'Draft'} variant={productToView.status === 'LIVE' ? 'success' : 'warning'} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Shade</p>
                  <div className="flex items-center gap-2 mt-1">
                    {productToView.variants?.[0]?.shadeHex ? (
                      <>
                        <span 
                          className="h-4 w-4 rounded-full border border-slate-200" 
                          style={{ backgroundColor: productToView.variants[0].shadeHex }}
                        ></span>
                        <span className="font-medium text-slate-900 uppercase">
                          {productToView.variants[0].shadeName || productToView.variants[0].shadeHex}
                        </span>
                      </>
                    ) : (
                      <span className="font-medium text-slate-900">N/A</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Inventory & Validity</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Quantity</p>
                    <p className="font-semibold text-slate-900">{productToView.variants?.[0]?.stockQuantity || 0} Units</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Mfg Date</p>
                    <p className="font-medium text-slate-900">
                      {productToView.variants?.[0]?.mfgDate ? new Date(productToView.variants[0].mfgDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Expiry Date</p>
                    <p className="font-medium text-slate-900">
                      {productToView.variants?.[0]?.expiryDate ? new Date(productToView.variants[0].expiryDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-100 transform transition-all">
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Trash2 className="h-7 w-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Product</h3>
              <p className="text-slate-500 mb-6">
                Are you sure you want to delete <span className="font-semibold text-slate-700">"{productToDelete.name}"</span>? 
                This action will mark the product as deleted and remove it from active listings.
              </p>
              
              <div className="flex items-center gap-3 w-full">
                <button 
                  onClick={() => setProductToDelete(null)}
                  disabled={deleteMutation.isPending}
                  className="flex-1 px-4 py-2.5 text-slate-700 font-medium hover:bg-slate-100 bg-slate-50 border border-slate-200 rounded-xl transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => deleteMutation.mutate(productToDelete.id)}
                  disabled={deleteMutation.isPending}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {deleteMutation.isPending ? 'Deleting...' : 'Yes, Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
