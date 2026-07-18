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

export const cosmeticsProducts = [
  { ...baseLipstickInfo, id: 301, name: "COSKINn Magnetic Lipstick - Ruby Red", rating: 4.9, reviews: 428, stock: 85, discountBadge: "NEW", shadeColor: "#b21e27" },
  { ...baseLipstickInfo, id: 311, name: "COSKINn Magnetic Lipstick - Rose Velvet", rating: 4.8, reviews: 312, stock: 40, discountBadge: "BEST SELLER", shadeColor: "#c25e75" },
  { ...baseLipstickInfo, id: 312, name: "COSKINn Magnetic Lipstick - Nude Beige", rating: 4.7, reviews: 198, stock: 120, shadeColor: "#d4a390" },
  { ...baseLipstickInfo, id: 313, name: "COSKINn Magnetic Lipstick - Peach Bloom", rating: 4.9, reviews: 245, stock: 65, shadeColor: "#e69485" },
  { ...baseLipstickInfo, id: 314, name: "COSKINn Magnetic Lipstick - Berry Crush", rating: 4.8, reviews: 176, stock: 30, shadeColor: "#802b48" },
  { ...baseLipstickInfo, id: 315, name: "COSKINn Magnetic Lipstick - Soft Coral", rating: 4.6, reviews: 142, stock: 55, shadeColor: "#f07f75" },
  
  // Skeletal related products
  { id: 302, name: "COSKINn Velvet Blush", price: 899, category: "Face", image: blushImg, images: [blushImg] },
  { id: 303, name: "COSKINn Lift & Curl Mascara", price: 799, category: "Eyes", image: mascaraImg, images: [mascaraImg] },
  { id: 304, name: "COSKINn Eyeshadow Palette", price: 1899, category: "Eyes", image: paletteImg, images: [paletteImg] },
  { id: 305, name: "COSKINn Professional Makeup Brush Set", price: 2499, category: "Tools", image: brushImg, images: [brushImg] },
  { id: 306, name: "COSKINn Precision Lip Liner", price: 499, category: "Lips", image: lipstickImg, images: [lipstickImg] },
  { id: 307, name: "COSKINn Lip Blur", price: 699, category: "Lips", image: lipstickImg, images: [lipstickImg] },
  { id: 308, name: "COSKINn Mango Lip Balm SPF 30", price: 399, category: "Lips", image: lipstickImg, images: [lipstickImg] }
];
