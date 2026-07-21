import lipstickImg from '../assets/images/cosmetics_lipstick.webp';
import lipstickSide from '../assets/images/cat_magnetic_lipstick.webp';
import blushImg from '../assets/images/velvet_blush.webp';
import mascaraImg from '../assets/images/lift_curl_mascara.webp';
import paletteImg from '../assets/images/cat_eyeshadow_palette.webp';
import brushImg from '../assets/images/cat_makeup_brushes.webp';

const getGallery = (mainImg, sideImg) => [
  mainImg, 
  sideImg,
  mainImg,
  sideImg
];

const baseLipstickInfo = {
  category: "Lips", 
  image: lipstickImg, 
  images: getGallery(lipstickImg, lipstickSide),
  originalPrice: 1299,
  price: 999,
  badge: "LUXURY PICK",
  shortDescription: "A weightless, intensely pigmented lipstick with a magnetic velvet-matte finish that lasts all day.",
  longDescription: "Experience the ultimate in lip luxury. The COSKINn Magnetic Lipstick glides on effortlessly, delivering high-impact color in a single stroke. Formulated with hydrating fruit oils, it provides a comfortable, non-drying velvet-matte finish that stays perfectly in place for up to 12 hours.",
  benefits: ["One-stroke high pigmentation", "12-hour comfortable wear", "Non-drying velvet-matte finish", "Magnetic closure case"],
  keyIngredients: ["Mango Seed Butter", "Vitamin E", "Hyaluronic Acid"],
  howToUse: [
    { title: "Prep", desc: "Start with clean, exfoliated lips for the smoothest application." },
    { title: "Apply", desc: "Glide the bullet directly across lips starting from the center." },
    { title: "Refine", desc: "Use the pointed tip to define your cupid's bow and lip edges." },
    { title: "Set", desc: "Allow a few seconds for the formula to set into a transfer-resistant velvet finish." }
  ],
  suitableSkinType: "All Skin Types",
  skinConcerns: "Dry Lips",
  texture: "Velvet Matte",
  fragrance: "Subtle Vanilla",
  netQuantity: "3.5g",
  shelfLife: "36 Months",
  manufacturedBy: "COSKINn Labs",
  countryOfOrigin: "India",
  suitableFor: "Anyone seeking a high-impact, comfortable matte lip color that doesn't dry out the lips.",
  finish: "Velvet-Matte",
  longLasting: "Up to 12 Hours",
  crueltyFree: true
};

const baseMascaraInfo = {
  category: "Eyes",
  image: mascaraImg,
  images: getGallery(mascaraImg, mascaraImg),
  originalPrice: 999,
  price: 799,
  badge: "BEST SELLER",
  shortDescription: "A revolutionary fruit-powered mascara that instantly lifts, lengthens, and volumizes without clumping.",
  longDescription: "Get the dramatic, wide-eyed look you've always wanted. Our smudge-proof formula is enriched with fruit extracts to condition your lashes while providing gravity-defying lift and curl that lasts all day long.",
  benefits: ["Gravity-defying lift & curl", "Smudge-proof & water-resistant", "Lash-conditioning fruit extracts", "Zero clumping or flaking"],
  keyIngredients: ["Coconut Extract", "Vitamin E", "Panthenol (Pro-Vitamin B5)"],
  howToUse: [
    { title: "Prep", desc: "Ensure your lashes are clean and dry before application." },
    { title: "Apply", desc: "Wiggle the wand at the root of the lashes and sweep smoothly upward to the tips." },
    { title: "Layer", desc: "Apply a second coat while the first is still wet for maximum dramatic volume." },
    { title: "Details", desc: "Use the precision tip to coat inner corner and bottom lashes." }
  ],
  suitableSkinType: "All Skin Types",
  skinConcerns: "Short or Straight Lashes",
  texture: "Smooth Whipped Cream",
  fragrance: "Fragrance-Free",
  netQuantity: "8.5ml",
  shelfLife: "24 Months",
  manufacturedBy: "COSKINn Labs",
  countryOfOrigin: "India",
  suitableFor: "Anyone seeking intense volume and lift without lash damage.",
  longLasting: "Up to 24 Hours",
  crueltyFree: true
};

const baseEyeshadowInfo = {
  category: "Eyes",
  image: paletteImg,
  images: getGallery(paletteImg, paletteImg),
  originalPrice: 2499,
  price: 1899,
  badge: "PRO MUST-HAVE",
  shortDescription: "A luxurious 12-pan eyeshadow palette featuring ultra-pigmented mattes and stunning shimmers.",
  longDescription: "Unleash your creativity with our premium Eyeshadow Palette. Formulated with our proprietary fruit-pigment technology, these buttery powders blend effortlessly and deliver intense, fallout-free color payoff that lasts all day and night.",
  benefits: ["Intensely pigmented", "Buttery, blendable formula", "Zero fallout", "Matte, shimmer, and metallic finishes"],
  keyIngredients: ["Plum Seed Oil", "Vitamin E", "Mineral Pigments"],
  howToUse: [
    { title: "Prep", desc: "Start with an eyeshadow primer for maximum longevity." },
    { title: "Base", desc: "Apply a light matte shade all over the lid as a transition." },
    { title: "Define", desc: "Blend a deeper shade into the crease to add dimension." },
    { title: "Pop", desc: "Press a shimmer or metallic shade onto the center of the lid." }
  ],
  suitableSkinType: "All Skin Types",
  skinConcerns: "Uneven Texture",
  texture: "Velvet Powder",
  fragrance: "Fragrance-Free",
  netQuantity: "12 x 1.5g",
  shelfLife: "36 Months",
  manufacturedBy: "COSKINn Labs",
  countryOfOrigin: "India",
  suitableFor: "Anyone looking for a versatile, high-end palette for everyday to glam looks.",
  finish: "Multi-Finish",
  longLasting: "Up to 16 Hours",
  crueltyFree: true
};

export const cosmeticsProducts = [
  { ...baseLipstickInfo, id: 301, name: "COSKINn Magnetic Lipstick - Ruby Red", rating: 4.9, reviews: 428, stock: 85, discountBadge: "NEW", shadeColor: "#b21e27" },
  { ...baseLipstickInfo, id: 311, name: "COSKINn Magnetic Lipstick - Rose Velvet", rating: 4.8, reviews: 312, stock: 40, discountBadge: "BEST SELLER", shadeColor: "#c25e75" },
  { ...baseLipstickInfo, id: 312, name: "COSKINn Magnetic Lipstick - Nude Beige", rating: 4.7, reviews: 198, stock: 120, shadeColor: "#d4a390" },
  { ...baseLipstickInfo, id: 313, name: "COSKINn Magnetic Lipstick - Peach Bloom", rating: 4.9, reviews: 245, stock: 65, shadeColor: "#e69485" },
  { ...baseLipstickInfo, id: 314, name: "COSKINn Magnetic Lipstick - Berry Crush", rating: 4.8, reviews: 176, stock: 30, shadeColor: "#802b48" },
  { ...baseLipstickInfo, id: 315, name: "COSKINn Magnetic Lipstick - Soft Coral", rating: 4.6, reviews: 142, stock: 55, shadeColor: "#f07f75" },
  
  // Mascara products
  { ...baseMascaraInfo, id: 303, name: "COSKINn Lift & Curl Mascara", rating: 4.9, reviews: 124, stock: 45, discountBadge: "20% OFF" },
  { ...baseMascaraInfo, id: 334, name: "COSKINn Berry Volume Mascara", price: 849, originalPrice: 1099, rating: 4.8, reviews: 89, stock: 32, discountBadge: "23% OFF" },
  { ...baseMascaraInfo, id: 335, name: "COSKINn Mango Length Mascara", price: 749, originalPrice: 899, rating: 4.7, reviews: 156, stock: 110, discountBadge: "16% OFF" },
  { ...baseMascaraInfo, id: 336, name: "COSKINn Coconut Waterproof", price: 899, originalPrice: 1199, rating: 4.9, reviews: 210, stock: 15, discountBadge: "25% OFF" },
  { ...baseMascaraInfo, id: 337, name: "COSKINn Cherry Lift Mini", price: 499, originalPrice: 599, rating: 4.6, reviews: 64, stock: 80, discountBadge: "16% OFF" },
  { ...baseMascaraInfo, id: 338, name: "COSKINn Peach Clear Mascara", price: 699, originalPrice: 899, rating: 4.5, reviews: 42, stock: 95, discountBadge: "22% OFF" },

  // Eyeshadow Palette products
  { ...baseEyeshadowInfo, id: 341, name: "COSKINn Nude Elegance", rating: 4.9, reviews: 342, stock: 65, discountBadge: "BEST SELLER" },
  { ...baseEyeshadowInfo, id: 342, name: "COSKINn Sunset Glow", rating: 4.8, reviews: 218, stock: 40, discountBadge: "NEW" },
  { ...baseEyeshadowInfo, id: 343, name: "COSKINn Rose Romance", rating: 4.9, reviews: 412, stock: 120, discountBadge: "15% OFF" },
  { ...baseEyeshadowInfo, id: 344, name: "COSKINn Smokey Luxe", rating: 4.7, reviews: 156, stock: 25 },
  { ...baseEyeshadowInfo, id: 345, name: "COSKINn Golden Glam", rating: 4.8, reviews: 289, stock: 55, discountBadge: "20% OFF" },
  { ...baseEyeshadowInfo, id: 346, name: "COSKINn Berry Muse", rating: 4.6, reviews: 134, stock: 35 },

  // Skeletal related products
  { id: 302, name: "COSKINn Velvet Blush", price: 899, category: "Face", image: blushImg, images: [blushImg] },

  { id: 305, name: "COSKINn Professional Makeup Brush Set", price: 2499, category: "Tools", image: brushImg, images: [brushImg] },
  { id: 306, name: "COSKINn Precision Lip Liner", price: 499, category: "Lips", image: lipstickImg, images: [lipstickImg] },
  { id: 307, name: "COSKINn Lip Blur", price: 699, category: "Lips", image: lipstickImg, images: [lipstickImg] }
];
