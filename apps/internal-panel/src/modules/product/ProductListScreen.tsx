import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '../../core/api/product';
import { DataTable } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Edit2, Package, Tag, Filter, Search } from 'lucide-react';

export const ProductListScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productApi.getProducts
  });

  const filteredProducts = products.filter((product: any) => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: 'name',
      header: 'Product Name',
      sortable: true,
      render: (product: any) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
            {product.images?.[0] ? (
              <img src={product.images[0].url} alt="" className="h-full w-full object-cover rounded-lg" />
            ) : (
              <Package className="h-5 w-5 text-slate-400" />
            )}
          </div>
          <div>
            <p className="font-medium text-slate-900">{product.name}</p>
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
      render: () => (
        <button className="p-1.5 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
          <Edit2 className="h-4 w-4" />
        </button>
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
      />
    </div>
  );
};
