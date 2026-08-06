import { useState, useEffect } from 'react';
import api from '../services/api';
import type { ProductData } from './useHomeData';

export const useProducts = (categorySlug?: string) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const url = '/products';
        const res = await api.get(url);
        
        const data = res.data?.data || res.data;
        if (Array.isArray(data)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mappedProducts = data.map((p: any) => ({
            id: p.id,
            name: p.name,
            price: p.discountPrice || p.mrp || 0,
            originalPrice: p.mrp || 0,
            mrp: p.mrp || 0,
            image: p.primaryImage || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: p.category?.name || 'Skincare',
            badge: p.tags && p.tags.includes('bestseller') ? 'BESTSELLER' : (p.tags && p.tags.includes('new') ? 'NEW' : undefined),
            rating: p.rating || 4.8,
            reviews: p.reviewsCount || 124,
            description: p.shortDescription || p.description || ''
          }));
          setProducts(mappedProducts);
        } else {
          setProducts([]);
        }
      } catch (err: any) {
        console.error('Failed to fetch products:', err);
        setError(err.response?.data?.message || 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  return { products, isLoading, error };
};
