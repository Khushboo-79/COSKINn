import { useState, useEffect } from 'react';
import api from '../services/api';
import type { ProductData } from './useHomeData';

export const useProduct = (id?: string) => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/products/${id}`);
        const p = res.data?.data || res.data;
        
        if (p) {
          const mappedProduct: ProductData = {
            id: p.id,
            name: p.name,
            price: p.discountPrice || p.mrp || 0,
            originalPrice: p.mrp || 0,
            mrp: p.mrp || 0,
            image: p.primaryImage || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            image2: (p.media && p.media.length > 1) ? p.media[1].url : undefined,
            category: p.category?.name || 'Skincare',
            badge: p.tags && p.tags.includes('bestseller') ? 'BESTSELLER' : (p.tags && p.tags.includes('new') ? 'NEW' : undefined),
            rating: p.rating || 4.8,
            reviews: p.reviewsCount || 124,
            description: p.description || p.shortDescription || '',
            ingredients: p.ingredients || '',
            howToUse: p.howToUse || ''
          };
          setProduct(mappedProduct);
        } else {
          setProduct(null);
        }
      } catch (err: any) {
        console.error('Failed to fetch product:', err);
        setError(err.response?.data?.message || 'Failed to fetch product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, isLoading, error };
};
