import lipstickImg from '../assets/images/cosmetics_lipstick.webp';
import lipstickSide from '../assets/images/cat_magnetic_lipstick.webp';
import blushImg from '../assets/images/velvet_blush.webp';
import mascaraImg from '../assets/images/lift_curl_mascara.webp';
import paletteImg from '../assets/images/cat_eyeshadow_palette.webp';
import brushImg from '../assets/images/cat_makeup_brushes.webp';
import holderImg from '../assets/images/brush_holder.png';
import perfumeImg from '../assets/images/pocket_perfume.png';

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

  // Velvet Blush
  { id: 302, slug: "velvet-blush-soft-pink", name: "COSKINn Velvet Blush - Soft Pink", shade: "Soft Pink", price: 899, originalPrice: 1099, category: "Face", image: blushImg, images: getGallery(blushImg, blushImg), rating: 4.9, reviews: 210, longDescription: "A weightless velvet finish that melts seamlessly into the skin for a natural flush.", benefits: ["Cloud-Like Texture", "All-Day Wear", "Seamless blend"], howToUse: "Apply with fingers or brush on the apples of cheeks and blend.", keyIngredients: ["Fruit Extracts", "Vitamin E"] },
  { id: 351, slug: "velvet-blush-peachy-coral", name: "COSKINn Velvet Blush - Peachy Coral", shade: "Peachy Coral", price: 899, category: "Face", image: blushImg, images: getGallery(blushImg, blushImg), rating: 4.8, reviews: 142, longDescription: "A warm peachy coral for a sun-kissed look.", benefits: ["Cloud-Like Texture", "All-Day Wear"] },
  { id: 352, slug: "velvet-blush-berry-flush", name: "COSKINn Velvet Blush - Berry Flush", shade: "Berry Flush", price: 899, originalPrice: 1099, category: "Face", image: blushImg, images: getGallery(blushImg, blushImg), rating: 4.7, reviews: 95, longDescription: "A deep berry flush for a dramatic, natural pinch.", benefits: ["Cloud-Like Texture", "All-Day Wear"] },
  { id: 353, slug: "velvet-blush-rose-gold", name: "COSKINn Velvet Blush - Rose Gold", shade: "Rose Gold", price: 949, category: "Face", image: blushImg, images: getGallery(blushImg, blushImg), rating: 4.9, reviews: 312, longDescription: "A radiant rose gold that doubles as a blush and highlight.", benefits: ["Cloud-Like Texture", "Radiant Finish"] },

  // Makeup Brushes
  { id: 305, slug: "professional-brush-set", name: "COSKINn Professional Makeup Brush Set", price: 2499, originalPrice: 2999, category: "Tools", image: brushImg, images: getGallery(brushImg, brushImg), rating: 4.9, reviews: 184, longDescription: "A curated 6-piece luxury brush set designed to blend, contour, and highlight with absolute perfection. 100% vegan, cruelty-free synthetic bristles.", benefits: ["Ultra-soft vegan bristles", "Ergonomic handles", "Seamless blending", "Professional grade"], howToUse: "Use each brush for its intended purpose (foundation, powder, blending, etc.). Clean regularly with gentle soap.", keyIngredients: ["Synthetic Vegan Fibers", "Rose Gold Ferrule", "Matte Wood Handle"] },
  { id: 355, slug: "foundation-brush", name: "COSKINn Foundation Brush", price: 899, category: "Tools", image: brushImg, images: getGallery(brushImg, brushImg), rating: 4.8, reviews: 92, longDescription: "The perfect dense brush for flawless liquid and cream foundation application.", benefits: ["Streak-free application", "Dense vegan bristles", "Ergonomic grip"] },
  { id: 356, slug: "powder-brush", name: "COSKINn Powder Brush", price: 999, category: "Tools", image: brushImg, images: getGallery(brushImg, brushImg), rating: 4.9, reviews: 145, longDescription: "An ultra-fluffy large brush for dusting setting powder perfectly.", benefits: ["Cloud-like softness", "Even powder distribution"] },
  { id: 357, slug: "eyeshadow-brush", name: "COSKINn Eyeshadow Brush", price: 499, category: "Tools", image: brushImg, images: getGallery(brushImg, brushImg), rating: 4.7, reviews: 88, longDescription: "A precise, fluffy eye brush for seamless eyeshadow blending.", benefits: ["Perfect crease blending", "Soft precision"] },
  { id: 358, slug: "blush-brush", name: "COSKINn Blush Brush", price: 699, category: "Tools", image: brushImg, images: getGallery(brushImg, brushImg), rating: 4.9, reviews: 210, longDescription: "A fluffy angled brush perfect for sweeping blush across the cheeks.", benefits: ["Seamless application", "Ergonomic design"] },

  // Brush Holders
  { id: 308, slug: "crystal-brush-holder", name: "COSKINn Crystal Brush Holder", price: 1299, originalPrice: 1599, category: "Tools", image: holderImg, images: getGallery(holderImg, holderImg), rating: 4.9, reviews: 78, longDescription: "A stunning fluted glass centerpiece for your vanity that beautifully organizes your luxury tools with a rose gold trim.", benefits: ["Elegant fluted glass", "Rose gold details", "Heavy sturdy base", "Holds up to 20 brushes"], howToUse: "Place on vanity and store your clean brushes upright.", keyIngredients: ["Premium Glass", "Rose Gold Plated Rim"] },
  { id: 361, slug: "glass-holder", name: "COSKINn Glass Holder", price: 1299, category: "Tools", image: holderImg, images: getGallery(holderImg, holderImg), rating: 4.8, reviews: 45, longDescription: "A sleek clear edition of our famous brush holder.", benefits: ["Modern finish", "Fingerprint resistant"] },
  { id: 362, slug: "premium-leather-holder", name: "COSKINn Premium Leather Holder", price: 1099, category: "Tools", image: holderImg, images: getGallery(holderImg, holderImg), rating: 4.7, reviews: 62, longDescription: "A minimalist leather-bound holder for a clean, simple vanity.", benefits: ["Minimalist design", "Easy to clean"] },
  { id: 363, slug: "travel-holder", name: "COSKINn Travel Holder", price: 1299, category: "Tools", image: holderImg, images: getGallery(holderImg, holderImg), rating: 4.9, reviews: 89, longDescription: "Compact and protective for on-the-go brush storage.", benefits: ["Sturdy base", "Protective cover"] },
  { id: 364, slug: "acrylic-holder", name: "COSKINn Acrylic Holder", price: 899, category: "Tools", image: holderImg, images: getGallery(holderImg, holderImg), rating: 4.8, reviews: 102, longDescription: "Classic acrylic for easy visibility and cleaning.", benefits: ["Clear design", "Easy to clean"] },

  // Pocket Perfumes
  { id: 309, slug: "pocket-perfume-collection", name: "COSKINn Pocket Perfume Collection", price: 1899, originalPrice: 2299, category: "Fragrance", image: perfumeImg, images: getGallery(perfumeImg, perfumeImg), rating: 4.8, reviews: 215, longDescription: "A curated trio of our most loved fragrances, designed to take you from day to night in sleek, pocket-sized sprays.", benefits: ["Travel friendly", "Long-lasting sillage", "Premium atomizers", "3 signature scents"], howToUse: "Spray on pulse points (wrists, neck) as desired.", keyIngredients: ["Perfume Oils", "Alcohol Denat", "Water"] },
  { id: 371, slug: "pocket-perfume-floral", name: "COSKINn Floral Pocket Perfume", price: 799, category: "Fragrance", image: perfumeImg, images: getGallery(perfumeImg, perfumeImg), rating: 4.7, reviews: 110, longDescription: "A blooming bouquet of jasmine and rose.", benefits: ["Fresh floral notes", "Pocket sized"] },
  { id: 372, slug: "pocket-perfume-vanilla", name: "COSKINn Vanilla Pocket Perfume", price: 799, category: "Fragrance", image: perfumeImg, images: getGallery(perfumeImg, perfumeImg), rating: 4.9, reviews: 340, longDescription: "A warm, comforting blend of madagascar vanilla and amber.", benefits: ["Warm gourmand scent", "Pocket sized"] },
  { id: 373, slug: "pocket-perfume-rose", name: "COSKINn Rose Pocket Perfume", price: 799, category: "Fragrance", image: perfumeImg, images: getGallery(perfumeImg, perfumeImg), rating: 4.8, reviews: 120, longDescription: "Pure, elegant damascus rose essence.", benefits: ["Classic rose scent", "Pocket sized"] },
  { id: 374, slug: "pocket-perfume-peach", name: "COSKINn Peach Pocket Perfume", price: 799, category: "Fragrance", image: perfumeImg, images: getGallery(perfumeImg, perfumeImg), rating: 4.6, reviews: 85, longDescription: "A crisp, refreshing peachy fragrance.", benefits: ["Clean fresh scent", "Pocket sized"] },
  { id: 375, slug: "pocket-perfume-jasmine", name: "COSKINn Jasmine Pocket Perfume", price: 799, category: "Fragrance", image: perfumeImg, images: getGallery(perfumeImg, perfumeImg), rating: 4.8, reviews: 190, longDescription: "A deep, sensual jasmine for evening wear.", benefits: ["Sensual night scent", "Pocket sized"] }
];
