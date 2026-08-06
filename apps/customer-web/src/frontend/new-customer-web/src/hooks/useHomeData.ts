import { useState, useEffect } from 'react';
import api from '../services/api';

export interface ProductData {
  id: string;
  name: string;
  price: number;
  mrp: number;
  image: string;
  category: string;
  badge?: string;
  rating?: number;
  reviews?: number;
  description?: string;
  image2?: string;
  ingredients?: string;
  howToUse?: string;
}

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export const useHomeData = () => {
  const [bestSellers, setBestSellers] = useState<ProductData[]>([]);
  const [newArrivals, setNewArrivals] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/catalog/home')
      .then((res) => {
        const { bestSellers, newArrivals, categories } = res.data;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mapProduct = (p: any): ProductData => ({
          id: p.id,
          name: p.name,
          mrp: p.mrp || 0,
          price: p.discountPrice || p.mrp || 0,
          image: p.images?.[0]?.url || 'https://via.placeholder.com/400x500',
          category: p.category?.name || 'Skincare',
          badge: p.tags?.[0] || undefined,
        });

        if (bestSellers) setBestSellers(bestSellers.map(mapProduct));
        if (newArrivals) setNewArrivals(newArrivals.map(mapProduct));
        if (categories) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setCategories(categories.map((c: any) => ({
            id: c.id,
            name: c.name,
            slug: c.slug || c.name.toLowerCase(),
            image: c.image || 'https://via.placeholder.com/400x400'
          })));
        }
      })
      .catch((err) => {
        console.error('Failed to fetch home data from API:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { bestSellers, newArrivals, categories, isLoading };
};
