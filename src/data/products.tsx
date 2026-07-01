export interface ColorSwatch {
  name: string
  hex: string
  imageIndex: number
}

export interface Product {
  id: string
  name: string
  price: number // Base price for smallest size (2x3)
  originalPrice?: number
  badge?: string
  rating: number
  reviewCount: number
  imageUrl: string
  hoverImageUrl: string
  swatches: ColorSwatch[]
  description: string
  careInstructions: string[]
  materials: string
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Isla Jute-Look Indoor/Outdoor Rug',
    price: 129,
    badge: 'Best Seller',
    rating: 4.8,
    reviewCount: 3421,
    imageUrl: 'https://images.unsplash.com/photo-1600121848594-d8644e57abbd?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1534889156217-d3424e650e41?auto=format&fit=crop&w=800&q=80',
    swatches: [
      { name: 'Natural Jute', hex: '#D4C8B8', imageIndex: 0 },
      { name: 'Sage Green', hex: '#8A9B7E', imageIndex: 1 },
      { name: 'Rust Terracotta', hex: '#C4614A', imageIndex: 2 },
      { name: 'Charcoal Black', hex: '#3D3530', imageIndex: 3 }
    ],
    description: 'The Isla Jute-Look Rug brings the warmth of natural fiber into your home — with none of the shedding or coarse texture. Woven from our proprietary soft-touch synthetic yarn, it mimics the beautiful earthy tones of real jute while remaining 100% machine-washable and stain-resistant.',
    careInstructions: [
      'Machine wash cold on a gentle cycle.',
      'Separate the rug face from the rug pad before washing.',
      'Tumble dry low or hang to dry.',
      'Do not dry clean, bleach, or iron.'
    ],
    materials: '100% recycled polyester face with a breathable polyurethane liquid barrier. Made from 75 recycled plastic bottles.'
  },
  {
    id: '2',
    name: 'Margot Persian-Style Area Rug',
    price: 189,
    originalPrice: 249,
    badge: 'Sale',
    rating: 4.9,
    reviewCount: 2187,
    imageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80',
    swatches: [
      { name: 'Vintage Terracotta', hex: '#C4614A', imageIndex: 2 },
      { name: 'Classic Navy', hex: '#2D3A5E', imageIndex: 5 },
      { name: 'Soft Blush', hex: '#E8D5C4', imageIndex: 4 }
    ],
    description: 'Elevate your living space with the Margot Persian-Style Rug. This classic, distressed design features intricate floral motifs and a border structure that looks like a priceless heirloom. Re-imagined for active households with kids and pets, it is fully spill-resistant and washable.',
    careInstructions: [
      'Machine wash cold with mild detergent on gentle cycle.',
      'Wash with similar colors to preserve the rich, traditional dye tones.',
      'Tumble dry low or line dry.',
      'Vacuum regularly on low-power, brush-free setting.'
    ],
    materials: 'Sustainably woven chenille with an integrated spill-repellent coating. Hypoallergenic and highly durable.'
  },
  {
    id: '3',
    name: 'Cleo Geometric Flatweave Rug',
    price: 109,
    badge: 'New',
    rating: 4.7,
    reviewCount: 892,
    imageUrl: 'https://images.unsplash.com/photo-1562564219-01c9a21c550d?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?auto=format&fit=crop&w=800&q=80',
    swatches: [
      { name: 'Ivory Cream', hex: '#FAF9F6', imageIndex: 6 },
      { name: 'Warm Stone', hex: '#9E9589', imageIndex: 7 },
      { name: 'Bold Black', hex: '#1A1A1A', imageIndex: 3 }
    ],
    description: 'A striking statement piece, the Cleo Geometric Rug features bold lines and minimalist triangles to ground any contemporary room. Its ultra-flat weave makes it highly resistant to heavy foot traffic and easy to slide under low-clearance doors.',
    careInstructions: [
      'Machine wash cold on delicate cycle.',
      'Tumble dry low. Cover will soften beautifully after the first wash.',
      'For small spills, blot immediately with a clean dry cloth.',
      'Avoid high-heat drying.'
    ],
    materials: 'Polyester-weave flat flatweave. Backing contains 50% recycled rubber materials.'
  },
  {
    id: '4',
    name: 'Odette Boho Diamond Area Rug',
    price: 159,
    rating: 4.8,
    reviewCount: 1654,
    imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1579656592043-a20e25a4aa4b?auto=format&fit=crop&w=800&q=80',
    swatches: [
      { name: 'Sage Green', hex: '#8A9B7E', imageIndex: 1 },
      { name: 'Blush Cream', hex: '#E8D5C4', imageIndex: 4 },
      { name: 'Indigo Blue', hex: '#4A5568', imageIndex: 8 },
      { name: 'Natural Sand', hex: '#D4C8B8', imageIndex: 0 }
    ],
    description: 'Embrace cozy bohemian vibes with the Odette Diamond Rug. Thick, plush cream lines form a soft tufted lattice pattern over a textured backdrop. Perfect for bedrooms and nurseries where bare feet deserve luxurious comfort.',
    careInstructions: [
      'Machine wash cold on gentle cycle with a mild dye-free detergent.',
      'Air dry flat or tumble dry low. Do not use heat booster settings.',
      'Gently shake or brush out to restore loft after washing.'
    ],
    materials: 'Semi-plush microfiber tufting over a recycled canvas base. 100% hypoallergenic.'
  },
  {
    id: '5',
    name: 'Fern Abstract Flow Rug',
    price: 145,
    rating: 4.6,
    reviewCount: 651,
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=800&q=80',
    swatches: [
      { name: 'Sage Green', hex: '#8A9B7E', imageIndex: 1 },
      { name: 'Warm Stone', hex: '#9E9589', imageIndex: 7 }
    ],
    description: 'Inspired by organic fluid curves, the Fern Abstract Rug displays hand-painted waves of color that flow seamlessly across your floor. A modern piece that adds artistic elegance to living rooms and studies.',
    careInstructions: [
      'Machine wash cold on gentle cycle.',
      'Line dry or tumble dry on lowest heat level.',
      'Do not bleach or dry clean.'
    ],
    materials: 'Premium velvet chenille face. Liquid-barrier lining. Highly durable and pet-safe.'
  },
  {
    id: '6',
    name: 'Lola Modern Striped Runner',
    price: 89,
    rating: 4.8,
    reviewCount: 1102,
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    swatches: [
      { name: 'Charcoal Grey', hex: '#3D3530', imageIndex: 3 },
      { name: 'Natural Jute', hex: '#D4C8B8', imageIndex: 0 }
    ],
    description: 'Perfect for long, narrow hallways or galley kitchens, the Lola Striped Runner features crisp horizontal lines that expand your space visually. Spill-resistant and low-profile so kitchen cabinets open with ease.',
    careInstructions: [
      'Machine wash cold in any standard home washer.',
      'Tumble dry low or lay flat to dry.',
      'Vacuum with high-power setting is fully supported.'
    ],
    materials: 'Stain-repellent flat weave polyester. Low-profile height (only 3mm thick).'
  },
  {
    id: '7',
    name: 'Nova Morocco Trellis Rug',
    price: 175,
    rating: 4.7,
    reviewCount: 742,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    swatches: [
      { name: 'Ivory Cream', hex: '#FAF9F6', imageIndex: 6 },
      { name: 'Charcoal Grey', hex: '#3D3530', imageIndex: 3 }
    ],
    description: 'A beautiful Moroccan-inspired trellis design that offers an elegant, neutral backdrop for dining rooms and hallways. Woven with highly durable fibers that resist dust, pollen, and mud.',
    careInstructions: [
      'Machine wash cold, delicate cycle.',
      'Tumble dry low or air dry.',
      'Gently vacuum without beater bar.'
    ],
    materials: 'OEKO-TEX certified recycled polyester yarns. Stain-resistant shield.'
  },
  {
    id: '8',
    name: 'Sage Classic Border Rug',
    price: 135,
    rating: 4.8,
    reviewCount: 541,
    imageUrl: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    swatches: [
      { name: 'Sage Green', hex: '#8A9B7E', imageIndex: 1 },
      { name: 'Natural Sand', hex: '#D4C8B8', imageIndex: 0 }
    ],
    description: 'Framed with a clean, classic border, this design brings sophisticated structure into any office or dining area. The beautiful sage tone has earthy grey undertones that complement wooden furnishings perfectly.',
    careInstructions: [
      'Wash cold on gentle cycle.',
      'Separate cover from pad before washing.',
      'Line dry recommended to maintain perfect rectangular form.'
    ],
    materials: '100% premium low-profile chenille with eco-barrier backing.'
  },
  {
    id: '9',
    name: 'Ember Southwest Tribal Rug',
    price: 155,
    rating: 4.9,
    reviewCount: 948,
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    swatches: [
      { name: 'Rust Terracotta', hex: '#C4614A', imageIndex: 2 },
      { name: 'Bold Charcoal', hex: '#1A1A1A', imageIndex: 3 }
    ],
    description: 'Inspired by traditional Southwestern weaving patterns, the Ember Rug boasts warm terracotta and cream motifs. Adds a cozy, rustic charm to dens, cabins, and bedrooms.',
    careInstructions: [
      'Machine wash cold, tumble dry low.',
      'For quick stain removal, use soapy water and dab gently.',
      'Do not bleach.'
    ],
    materials: 'Chenille weaved fabric with patented water-repelling core.'
  },
  {
    id: '10',
    name: 'Drift Ocean Gradient Rug',
    price: 165,
    rating: 4.6,
    reviewCount: 421,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?auto=format&fit=crop&w=800&q=80',
    swatches: [
      { name: 'Indigo Blue', hex: '#4A5568', imageIndex: 8 },
      { name: 'Warm Stone', hex: '#9E9589', imageIndex: 7 }
    ],
    description: 'Bring the calming tones of the seaside into your home with the Drift Ocean Rug. Smooth, ombre blues melt into warm sandy beige, creating a tranquil gradient effect perfect for coastal or nautical styling.',
    careInstructions: [
      'Machine wash cold, delicate speed.',
      'Tumble dry low or air dry.',
      'Do not iron.'
    ],
    materials: 'Plush velvet microfiber with moisture-lock barrier. Ultra-soft feel.'
  },
  {
    id: '11',
    name: 'Pearl Luxurious Shag Rug',
    price: 195,
    rating: 4.7,
    reviewCount: 1342,
    imageUrl: 'https://images.unsplash.com/photo-1544030288-e6e6108867f8?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    swatches: [
      { name: 'Ivory Cream', hex: '#FAF9F6', imageIndex: 6 },
      { name: 'Soft Blush', hex: '#E8D5C4', imageIndex: 4 }
    ],
    description: 'Yes, even a shag rug can be washable! The Pearl Shag Rug features incredibly soft, thick high-pile fibers that feel like walking on clouds. Patented light-shed technology ensures it stays gorgeous wash after wash.',
    careInstructions: [
      'Machine wash cold on delicate/wool cycle. Do not overload machine.',
      'Tumble dry ultra-low or air dry. Brush out to restore the high loft.',
      'Avoid heavy vacuuming with high-power beater bar.'
    ],
    materials: 'High-pile 10mm washable polyester shag yarns. Safe, pet-friendly adhesive backing.'
  },
  {
    id: '12',
    name: 'Cedar Vintage Heritage Rug',
    price: 149,
    rating: 4.8,
    reviewCount: 1205,
    imageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
    hoverImageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80',
    swatches: [
      { name: 'Rust Terracotta', hex: '#C4614A', imageIndex: 2 },
      { name: 'Sage Green', hex: '#8A9B7E', imageIndex: 1 }
    ],
    description: 'Featuring a distressed center medallion and intricate scrollwork, the Cedar Vintage Rug pays homage to classic European design. Its stonewashed patina effect looks beautifully aged yet maintains its color indefinitely.',
    careInstructions: [
      'Machine wash cold, gentle cycle.',
      'Tumble dry low or hang dry.',
      'Vacuum with soft brush setting.'
    ],
    materials: 'Premium velvet chenille with advanced fade-resistant ink lock. OEKO-TEX Standard 100.'
  }
]

export const SIZES = ['2×3', '4×6', '5×8', '8×10', '9×12', 'Runner 2.5×7', 'Round 6']

export const SIZE_PRICES: Record<string, number> = {
  '2×3': 59,
  '4×6': 109,
  '5×8': 149,
  '8×10': 229,
  '9×12': 299,
  'Runner 2.5×7': 129,
  'Round 6': 169
}
