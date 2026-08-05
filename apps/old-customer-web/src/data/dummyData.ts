export interface Product {
  id: number;
  name: string;
  subtitle?: string;
  category: string;
  subCategory?: string;
  price: number;
  rating: number;
  reviews: number;
  theme: 'skin' | 'glam';
  badges: string[]; // e.g. "Bestseller", "New", "Juicy"
  images: string[];
  galleryVideo?: string; // Optional video/gif for PDP
  shortDescription: string;
  ingredients: { name: string; description: string; icon?: string }[];
  usage: string[];
  skinTypes: string[];
  concerns: string[];
  // --- New Trust & Marketing Fields ---
  benefits?: string[];
  consumerStudyResults?: { metric: string; description: string }[];
  textureImage?: string;
  fullIngredientsList?: string;
  faqs?: { q: string; a: string }[];
  customerReviews?: { author: string; date: string; rating: number; text: string; avatar?: string }[];
}

export const dummyProducts: Product[] = [
  // ================== SKIN MODE PRODUCTS (Fruity, Fresh, Cute) ==================
  {
    id: 1,
    name: 'Peachy Glow Vitamin C Serum',
    subtitle: 'Brightening + Plumping Drop',
    category: 'Serums',
    subCategory: 'Vitamin C',
    price: 3400,
    rating: 4.8,
    reviews: 1284,
    theme: 'skin',
    badges: ['Bestseller', 'Fresh Drop 🍑'],
    images: [
      'https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    galleryVideo: 'https://media.giphy.com/media/26FPCXdkvDbKBbgIU/giphy.mp4',
    shortDescription: 'A juicy, fruit-forward serum packed with 15% Vitamin C and real peach extract to give you that bouncy, glass-skin glow.',
    ingredients: [
      { name: 'Peach Extract', description: 'Rich in vitamins to soften and plump.', icon: '🍑' },
      { name: '15% Vitamin C', description: 'Brightens dark spots and evens tone.', icon: '✨' },
      { name: 'Hyaluronic Acid', description: 'Draws moisture into the skin for a bouncy feel.', icon: '💧' }
    ],
    usage: ['Apply 2-3 drops to clean skin.', 'Pat gently until fully absorbed.', 'Follow with moisturizer.'],
    skinTypes: ['All', 'Dry', 'Combination'],
    concerns: ['Dullness', 'Uneven Texture'],
    benefits: ['Instantly plumps and hydrates', 'Fades dark spots over time', 'Leaves a non-sticky, dewy finish'],
    textureImage: 'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800',
    consumerStudyResults: [
      { metric: '98%', description: 'agreed skin felt instantly hydrated' },
      { metric: '92%', description: 'saw a visible glow after one use' },
      { metric: '89%', description: 'noticed brighter skin in 2 weeks' }
    ],
    fullIngredientsList: 'Water/Aqua/Eau, Glycerin, Niacinamide, Prunus Persica (Peach) Fruit Extract, Ascorbic Acid (Vitamin C), Sodium Hyaluronate, Squalane, Panthenol, Xanthan Gum, Butylene Glycol, Caprylyl Glycol, 1,2-Hexanediol, Ethylhexylglycerin, Fragrance (Parfum).',
    faqs: [
      { q: 'Is this safe for sensitive skin?', a: 'Yes! Our Vitamin C is formulated with soothing peach extract to prevent irritation.' },
      { q: 'Can I use this with retinol?', a: 'We recommend using this serum in the morning and your retinol at night to avoid over-exfoliating.' }
    ],
    customerReviews: [
      { author: 'Sarah M.', date: 'Oct 12, 2025', rating: 5, text: 'This changed my life! My skin has never looked so bouncy. It smells like a fresh peach and absorbs so quickly.', avatar: 'https://i.pravatar.cc/150?u=sarah' },
      { author: 'Jessica K.', date: 'Sep 28, 2025', rating: 5, text: 'The glow is unreal. I stopped wearing foundation because this gives me that glass skin look natively.' },
      { author: 'Amanda B.', date: 'Sep 15, 2025', rating: 4, text: 'Love the texture and smell. Lost one star because the dropper can be a bit finicky when you get to the bottom of the bottle.' }
    ]
  },
  {
    id: 2,
    name: 'Watermelon Burst Hydrator',
    subtitle: 'Oil-Free Gel Cream',
    category: 'Moisturizers',
    price: 2800,
    rating: 4.9,
    reviews: 856,
    theme: 'skin',
    badges: ['Cult Favorite'],
    images: [
      'https://images.pexels.com/photos/27393236/pexels-photo-27393236.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4465121/pexels-photo-4465121.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    shortDescription: 'Quench your skin’s thirst with this cooling, oil-free gel moisturizer that smells exactly like a fresh watermelon slice.',
    ingredients: [
      { name: 'Watermelon Extract', description: 'Soothes irritation and floods skin with hydration.', icon: '🍉' },
      { name: 'Aloe Vera', description: 'Calms redness and cools the skin.', icon: '🌿' }
    ],
    usage: ['Scoop a dime-sized amount.', 'Massage into face and neck.', 'Use morning and night.'],
    skinTypes: ['Oily', 'Combination', 'Acne-Prone'],
    concerns: ['Dryness', 'Redness'],
    benefits: ['Instantly cools and soothes redness', 'Weightless hydration that never clogs pores', 'Helps control excess oil'],
    textureImage: 'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800',
    consumerStudyResults: [{ metric: '95%', description: 'felt immediate cooling relief' }],
    fullIngredientsList: 'Water, Propanediol, Citrullus Lanatus (Watermelon) Fruit Extract, Glycerin, Sodium Hyaluronate...',
    faqs: [{ q: 'Is it sticky?', a: 'Not at all! It absorbs instantly into a soft matte finish.' }],
    customerReviews: [{ author: 'Mia T.', date: 'Dec 01, 2025', rating: 5, text: 'The perfect summer moisturizer!' }]
  },
  {
    id: 3,
    name: 'Berry Bounce Sleep Mask',
    subtitle: 'Overnight Repair',
    category: 'Masks',
    price: 3200,
    rating: 4.7,
    reviews: 2103,
    theme: 'skin',
    badges: ['Award Winner'],
    images: [
      'https://images.pexels.com/photos/9306017/pexels-photo-9306017.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4041391/pexels-photo-4041391.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    shortDescription: 'Wake up to the bounciest skin of your life. This rich overnight mask uses a blend of antioxidant-rich berries to repair your skin barrier while you sleep.',
    ingredients: [
      { name: 'Mixed Berry Complex', description: 'Fights free radicals and brightens.', icon: '🍓' },
      { name: 'Squalane', description: 'Locks in deep moisture without clogging pores.', icon: '💧' }
    ],
    usage: ['Apply a thick layer as the last step of your routine.', 'Leave on overnight.', 'Rinse off in the morning.'],
    skinTypes: ['Dry', 'Normal'],
    concerns: ['Dryness', 'Anti-Aging'],
    benefits: ['Repairs skin barrier overnight', 'Deeply moisturizes dry patches', 'Rich in antioxidants'],
    textureImage: 'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800',
    consumerStudyResults: [{ metric: '92%', description: 'woke up with deeply hydrated skin' }],
    fullIngredientsList: 'Water, Squalane, Rubus Idaeus (Raspberry) Fruit Extract, Fragaria Ananassa (Strawberry) Fruit Extract...',
    faqs: [{ q: 'Will it ruin my pillow?', a: 'It sets within 10 minutes and won\'t transfer to your pillowcase.' }],
    customerReviews: [{ author: 'Jen B.', date: 'Jan 12, 2026', rating: 5, text: 'A lifesaver for winter skin.' }]
  },
  {
    id: 4,
    name: 'Avocado Melt Eye Cream',
    subtitle: 'Depuffing & Brightening',
    category: 'Eye Care',
    price: 2400,
    rating: 4.6,
    reviews: 542,
    theme: 'skin',
    badges: [],
    images: [
      'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    shortDescription: 'A rich, buttery eye cream infused with avocado oil and encapsulated retinol to firm and depuff the delicate eye area.',
    ingredients: [
      { name: 'Avocado Oil', description: 'Deeply nourishes and softens.', icon: '🥑' },
      { name: 'Encapsulated Retinol', description: 'Gently smooths fine lines without irritation.', icon: '✨' },
      { name: 'Coffeeberry', description: 'Reduces dark circles and depuffs.', icon: '☕' }
    ],
    usage: ['Take a pea-sized amount.', 'Gently tap around the orbital bone.', 'Use nightly.'],
    skinTypes: ['All'],
    concerns: ['Dark Circles', 'Fine Lines'],
    benefits: ['Visibly reduces dark circles', 'Smooths fine lines and wrinkles', 'Rich, buttery texture'],
    textureImage: 'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800',
    consumerStudyResults: [{ metric: '88%', description: 'saw a reduction in dark circles after 4 weeks' }],
    fullIngredientsList: 'Water, Persea Gratissima (Avocado) Oil, Retinol, Glycerin, Coffea Arabica (Coffee) Seed Extract...',
    faqs: [{ q: 'Is it safe for sensitive eyes?', a: 'Yes, it is ophthalmologist tested and formulated to be gentle.' }],
    customerReviews: [{ author: 'Claire P.', date: 'Feb 14, 2026', rating: 4, text: 'Really creamy and hydrating.' }]
  },
  {
    id: 5,
    name: 'Yuzu Lemon Cleansing Balm',
    subtitle: 'Makeup Melter',
    category: 'Cleansers',
    price: 2100,
    rating: 4.9,
    reviews: 932,
    theme: 'skin',
    badges: ['Vegan'],
    images: [
      'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    shortDescription: 'Melt away stubborn makeup and SPF in seconds with this sorbet-like balm that smells like fresh citrus.',
    ingredients: [
      { name: 'Yuzu Extract', description: 'Brightens and refreshes.', icon: '🍋' },
      { name: 'Papaya Enzyme', description: 'Gently exfoliates dead skin cells.', icon: '🥭' }
    ],
    usage: ['Massage onto dry skin.', 'Add water to emulsify.', 'Rinse thoroughly.'],
    skinTypes: ['All'],
    concerns: ['Makeup Removal', 'Clogged Pores'],
    benefits: ['Melts waterproof makeup effortlessly', 'Leaves skin soft, not stripped', 'Smells like fresh citrus'],
    textureImage: 'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800',
    consumerStudyResults: [{ metric: '100%', description: 'said it removed all waterproof makeup' }],
    fullIngredientsList: 'Ethylhexyl Palmitate, Cetyl Ethylhexanoate, PEG-20 Glyceryl Triisostearate, Citrus Junos Fruit Extract...',
    faqs: [{ q: 'Does it blur vision?', a: 'No, our formula emulsifies completely and washes away clean without leaving a film.' }],
    customerReviews: [{ author: 'Zoe L.', date: 'Mar 10, 2026', rating: 5, text: 'Takes off my waterproof mascara in seconds!' }]
  },

  // ================== GLAM MODE PRODUCTS (Luxurious, Fairytale, Romance) ==================
  {
    id: 101,
    name: 'Midnight Elixir Serum Foundation',
    subtitle: 'Flawless Luminous Finish',
    category: 'Face',
    subCategory: 'Foundation',
    price: 5200,
    rating: 4.8,
    reviews: 1284,
    theme: 'glam',
    badges: ['The Royal Court', 'Best Seller'],
    images: [
      'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    galleryVideo: 'https://media.giphy.com/media/xT0xeQ1ZUQ0lvlRby8/giphy.mp4',
    shortDescription: 'A potion of pure perfection. This serum foundation provides buildable, luminous coverage while infusing your skin with 24k gold flakes.',
    ingredients: [
      { name: '24k Gold Flakes', description: 'Imparts a regal, lit-from-within glow.', icon: '✨' },
      { name: 'Rose Absolute', description: 'Soothes and provides a luxurious scent.', icon: '🌹' }
    ],
    usage: ['Shake well before use.', 'Dispense 1-2 pumps onto the back of your hand.', 'Blend into skin with a brush or sponge.'],
    skinTypes: ['Normal', 'Dry'],
    concerns: ['Uneven Tone', 'Dullness'],
    benefits: ['Weightless, breathable coverage', 'Infused with real 24k gold for a lit-from-within glow', 'Hydrates and plumps fine lines all day'],
    consumerStudyResults: [
      { metric: '100%', description: 'agreed the foundation felt weightless' },
      { metric: '95%', description: 'said their skin looked more radiant' },
      { metric: '90%', description: 'saw improved skin texture over time' }
    ],
    textureImage: 'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800',
    fullIngredientsList: 'Cyclopentasiloxane, Water/Aqua/Eau, Butylene Glycol, Gold (CI 77480), Rosa Damascena Flower Water, Titanium Dioxide, Iron Oxides, Dimethicone/Vinyl Dimethicone Crosspolymer, Squalane, Tocopherol (Vitamin E), Phenoxyethanol, Parfum/Fragrance.',
    faqs: [
      { q: 'What kind of coverage does this provide?', a: 'It provides medium, buildable coverage with a luminous, dewy finish.' },
      { q: 'Is it suitable for oily skin?', a: 'While it is deeply hydrating, we recommend setting it with our Velvet Setting Powder if you have very oily skin.' }
    ],
    customerReviews: [
      { author: 'Eleanor R.', date: 'Nov 02, 2025', rating: 5, text: 'Absolutely decadent. It feels like silk on the skin and the subtle gold flakes make me look like I sleep 12 hours a night.', avatar: 'https://i.pravatar.cc/150?u=eleanor' },
      { author: 'Victoria H.', date: 'Oct 20, 2025', rating: 5, text: 'The perfect foundation for evening events. It looks incredible in low light and photography.' },
      { author: 'Chloe S.', date: 'Oct 05, 2025', rating: 4, text: 'Beautiful finish, but the shade range leans a bit warm. I had to mix two shades to get my perfect match.' }
    ]
  },
  {
    id: 102,
    name: 'Scarlet Kiss Velvet Lipstick',
    subtitle: 'Matte but Hydrating',
    category: 'Lips',
    price: 3500,
    rating: 4.9,
    reviews: 3410,
    theme: 'glam',
    badges: ['Iconic Shade'],
    images: [
      'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    shortDescription: 'The perfect, dramatic red for a candlelit romance. This velvet matte lipstick glides on seamlessly and lasts past midnight without drying your lips.',
    ingredients: [
      { name: 'Velvet Spheres', description: 'Creates a soft-focus matte finish.', icon: '🎭' },
      { name: 'Jojoba Oil', description: 'Keeps lips hydrated all night.', icon: '💧' }
    ],
    usage: ['Exfoliate lips before use.', 'Apply directly from the bullet or use a lip brush for precision.'],
    skinTypes: ['All'],
    concerns: [],
    benefits: ['Intense, one-swipe color payoff', 'Hydrating velvet finish that never cracks', '12-hour wear'],
    textureImage: 'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800',
    consumerStudyResults: [{ metric: '98%', description: 'felt lips were hydrated after 8 hours' }],
    fullIngredientsList: 'Dimethicone, Octyldodecanol, Polyethylene, Polysilicone-11, Nylon-12, Caprylic/Capric Triglyceride...',
    faqs: [{ q: 'Does it bleed?', a: 'No, the formula is self-setting and prevents feathering.' }],
    customerReviews: [{ author: 'Sophia C.', date: 'Dec 15, 2025', rating: 5, text: 'The only red lipstick I will ever wear.' }]
  },
  {
    id: 103,
    name: 'Gilded Age Highlighter',
    subtitle: 'Blinding Liquid Gold',
    category: 'Face',
    subCategory: 'Highlighter',
    price: 4100,
    rating: 4.7,
    reviews: 890,
    theme: 'glam',
    badges: ['Limited Edition'],
    images: [
      'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    shortDescription: 'Catch the candlelight. A single drop of this intense liquid highlighter creates a blinding, wet-look glow fit for royalty.',
    ingredients: [
      { name: 'Crushed Pearl', description: 'Reflects light for a multi-dimensional glow.', icon: '🦪' },
      { name: 'Champagne Extract', description: 'Antioxidant protection with a touch of luxury.', icon: '🥂' }
    ],
    usage: ['Tap onto the high points of the face.', 'Can be mixed with foundation for an all-over glow.'],
    skinTypes: ['All'],
    concerns: [],
    benefits: ['Creates a wet-look, glass skin finish', 'No chunky glitter, just pure glow', 'Blends seamlessly over powder'],
    textureImage: 'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800',
    consumerStudyResults: [{ metric: '100%', description: 'agreed it blended effortlessly' }],
    fullIngredientsList: 'Isododecane, Mica, Hydrogenated Polyisobutene, Synthetic Fluorphlogopite, Silica...',
    faqs: [{ q: 'Can I use this on my body?', a: 'Yes! Mix a few drops with body lotion for an all-over glow.' }],
    customerReviews: [{ author: 'Isabella M.', date: 'Nov 30, 2025', rating: 5, text: 'Blinding! A little goes a long way.' }]
  },
  {
    id: 104,
    name: 'Enchanted Woods Eyeshadow Palette',
    subtitle: '12 Jeweled Tones',
    category: 'Eyes',
    price: 6800,
    rating: 4.9,
    reviews: 1102,
    theme: 'glam',
    badges: [],
    images: [
      'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    shortDescription: 'Step into a fairytale. Twelve hyper-pigmented shades ranging from deep emeralds to sparkling amethysts, housed in an ornate vintage clasp palette.',
    ingredients: [
      { name: 'Mica Infusion', description: 'Provides smooth, buttery blending.', icon: '✨' }
    ],
    usage: ['Use a dense brush for metallics.', 'Use a fluffy brush for matte transition shades.'],
    skinTypes: ['All'],
    concerns: [],
    benefits: ['Hyper-pigmented jewel tones', 'Creamy mattes that blend themselves', 'Zero fallout metallics'],
    textureImage: 'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800',
    consumerStudyResults: [{ metric: '94%', description: 'experienced zero fallout during application' }],
    fullIngredientsList: 'Talc, Mica, Zinc Stearate, Cetearyl Isononanoate, Dimethicone, Boron Nitride...',
    faqs: [{ q: 'Are the shadows vegan?', a: 'Yes, this entire palette is 100% vegan.' }],
    customerReviews: [{ author: 'Emma T.', date: 'Oct 02, 2025', rating: 5, text: 'The most beautiful palette I own.' }]
  },
  {
    id: 105,
    name: 'Corset Setting Spray',
    subtitle: '16-Hour Lock',
    category: 'Face',
    price: 3200,
    rating: 4.8,
    reviews: 2150,
    theme: 'glam',
    badges: ['Cult Favorite'],
    images: [
      'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    shortDescription: 'Laces your makeup in place for 16 hours. A micro-fine mist that melts powders into the skin and ensures your look survives the grand ball.',
    ingredients: [
      { name: 'White Tea', description: 'Protects against environmental stressors.', icon: '🍵' },
      { name: 'Polymer Shield', description: 'Creates an invisible, breathable lock over makeup.', icon: '🛡️' }
    ],
    usage: ['Hold 8 inches from face.', 'Spray in an X and T motion.', 'Let dry.'],
    skinTypes: ['All'],
    concerns: ['Longevity'],
    benefits: ['Locks makeup in place for 16 hours', 'Melts powders for a seamless finish', 'Micro-fine mist won\'t ruin your look'],
    textureImage: 'https://images.pexels.com/photos/6621451/pexels-photo-6621451.jpeg?auto=compress&cs=tinysrgb&w=800',
    consumerStudyResults: [{ metric: '100%', description: 'agreed makeup lasted all day and night' }],
    fullIngredientsList: 'Water, Alcohol Denat., PVP, Dimethicone PEG-7 Phosphate, PPG-3 Benzyl Ether Myristate...',
    faqs: [{ q: 'Is it alcohol-free?', a: 'It contains cosmetically-formulated SD alcohol to ensure rapid drying without stripping the skin.' }],
    customerReviews: [{ author: 'Olivia W.', date: 'Aug 14, 2025', rating: 5, text: 'My makeup did not budge in a rainstorm.' }]
  }
];

export const getProductsByTheme = (theme: 'skin' | 'glam') => {
  return dummyProducts.filter(p => p.theme === theme);
};

export const getProductById = (id: number) => {
  return dummyProducts.find(p => p.id === id);
};
