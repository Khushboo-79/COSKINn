export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  badge: string | null;
  image: string;
  image2?: string;
  description?: string;
  ingredients?: string;
  howToUse?: string;
}

export const skinProducts: Product[] = [
  { id: 101, name: 'Peachy Glow Vitamin C Serum', category: 'Serums', price: 3499, rating: 4.8, reviews: 1284, badge: null, image: 'https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 102, name: 'Watermelon Burst Hydrator', category: 'Moisturizers', price: 2999, rating: 4.9, reviews: 856, badge: 'BESTSELLER', image: 'https://images.pexels.com/photos/27393236/pexels-photo-27393236.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 103, name: 'Berry Bounce Sleep Mask', category: 'Masks', price: 1999, rating: 4.7, reviews: 512, badge: null, image: 'https://images.pexels.com/photos/9306017/pexels-photo-9306017.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 104, name: 'Avocado Melt Eye Cream', category: 'Eye Care', price: 2499, rating: 4.6, reviews: 733, badge: 'NEW', image: 'https://images.unsplash.com/photo-1615397323133-c90a2a16d557?auto=format&fit=crop&q=80' },
  { id: 105, name: 'Papaya Enzyme Cleanser', category: 'Cleansers', price: 1899, rating: 4.8, reviews: 342, badge: null, image: 'https://images.pexels.com/photos/8101522/pexels-photo-8101522.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 106, name: 'Pineapple Brightening Toner', category: 'Toners', price: 2199, rating: 4.5, reviews: 129, badge: null, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80' },
  { id: 107, name: 'Coconut Water Splash SPF 50', category: 'Sun Care', price: 2799, rating: 4.9, reviews: 924, badge: 'ESSENTIAL', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80' },
  { id: 108, name: 'Plum Plump Hyaluronic Acid', category: 'Serums', price: 3299, rating: 4.8, reviews: 210, badge: null, image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80' },
  { id: 109, name: 'Blueberry Blemish Rescue Patch', category: 'Treatments', price: 999, rating: 4.7, reviews: 1045, badge: 'LIMITED', image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80' },
  { id: 110, name: 'Kiwi Detox Clay Mask', category: 'Masks', price: 2299, rating: 4.6, reviews: 382, badge: null, image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 111, name: 'Dragonfruit Nourishing Lip Balm', category: 'Lip Care', price: 799, rating: 4.9, reviews: 1533, badge: null, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80' },
  { id: 112, name: 'Citrus Glow Exfoliator', category: 'Exfoliators', price: 2499, rating: 4.7, reviews: 245, badge: 'NEW', image: 'https://images.pexels.com/photos/6621467/pexels-photo-6621467.jpeg?auto=compress&cs=tinysrgb&w=800' }
];

export const glamProducts: Product[] = [
  { id: 201, name: 'Coskin Angel 9-Color Palette', category: 'Eyes', price: 4500, rating: 4.9, reviews: 2145, badge: 'ICON', image: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/ec25942077e080c392d7cb4696caea57.jpg?v=1761982588' },
  { id: 202, name: 'Velvet Angel Matte Lipstick', category: 'Lips', price: 2000, rating: 4.8, reviews: 1420, badge: 'BESTSELLER', image: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/01_2db59608-095a-442a-afec-9c7aafeb7fab.jpg?v=1758249299' },
  { id: 203, name: 'Strawberry Cupid Blush', category: 'Face', price: 2800, rating: 4.9, reviews: 934, badge: null, image: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/24c4ac61030646c83895aa1d3448017a_256e2b1a-3119-4a30-af27-4926c38103a2.jpg?v=1756201951' },
  { id: 204, name: 'Gilded Halo Highlighter', category: 'Face', price: 3200, rating: 4.8, reviews: 541, badge: 'NEW', image: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/20260420-103644.jpg?v=1776653923' },
  { id: 205, name: 'Midnight Elixir Lip Gloss', category: 'Lips', price: 1800, rating: 4.7, reviews: 1102, badge: null, image: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/590a8334bd8ab755509375e386f047d6.jpg?v=1761982588' },
  { id: 206, name: 'Swan Ballet Hand Mirror', category: 'Accessories', price: 2500, rating: 4.9, reviews: 884, badge: 'LIMITED', image: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/61605ff4361e206d245c64bb08d66c4b_41cd63f3-7c74-4c4d-853d-ef8949a10017.jpg?v=1784689317' },
  { id: 207, name: 'Rosy Veil Starter Set', category: 'Sets', price: 5500, rating: 5.0, reviews: 321, badge: 'BUNDLE', image: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/20260722-162356.jpg?v=1784708678' },
  { id: 208, name: 'Aurora Glow Essentials Set', category: 'Sets', price: 5700, rating: 4.9, reviews: 290, badge: null, image: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/20260722-142134.jpg?v=1784704087' },
  { id: 209, name: 'Cherry Blossom Makeup Brush', category: 'Brushes', price: 1500, rating: 4.8, reviews: 456, badge: null, image: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/01_-13588.jpg?v=1772596546' },
  { id: 210, name: 'Peachy Cloud Liquid Eyeliner', category: 'Eyes', price: 1600, rating: 4.7, reviews: 899, badge: null, image: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/19bac577d535519ba342418872ac2270.jpg?v=1772596546' },
  { id: 211, name: 'Watermelon Setting Spray', category: 'Face', price: 2200, rating: 4.8, reviews: 632, badge: null, image: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/02_4b483c74-d2ab-4898-a2a1-bcf4acb74b1b.jpg?v=1772596546' },
  { id: 212, name: 'Fairy Court Eyeshadow Quad', category: 'Eyes', price: 3500, rating: 4.9, reviews: 110, badge: 'NEW', image: 'https://cdn.shopify.com/s/files/1/0593/5418/5889/files/4_89623397-717c-404c-bbc6-d00fe79d6f11.jpg?v=1772596546' }
];

export const getAllProducts = (isGlam: boolean) => {
  return isGlam ? glamProducts : skinProducts;
};
