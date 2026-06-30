import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Heart, ShoppingBag, RotateCcw, Shield, Truck, ChevronDown, ArrowLeft } from 'lucide-react'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

// ─── Mock product data ────────────────────────────────────────────────────────

const SIZES = ['2×3', '4×6', '5×8', '8×10', '9×12', 'Runner 2.5×7', 'Round 6']
const SIZE_PRICES: Record<string, number> = {
  '2×3': 59, '4×6': 109, '5×8': 149, '8×10': 229, '9×12': 299,
  'Runner 2.5×7': 129, 'Round 6': 169,
}

const COLORS = [
  { name: 'Natural', hex: '#d4c8b8', imageIndex: 0 },
  { name: 'Sage', hex: '#8a9b7e', imageIndex: 1 },
  { name: 'Terracotta', hex: '#c4614a', imageIndex: 2 },
  { name: 'Charcoal', hex: '#3d3530', imageIndex: 3 },
  { name: 'Blush', hex: '#e8d5c4', imageIndex: 4 },
]

const GALLERY_SEEDS = ['rugmain', 'rugroom', 'rugdetail', 'rugflat', 'ruglife']

const TABS = ['Description', 'Care & Washing', 'Shipping & Returns']

const TAB_CONTENT: Record<string, string[]> = {
  'Description': [
    'The Isla Jute-Look Rug brings the warmth of natural fiber into your home — with none of the fuss. Woven from our proprietary soft-touch synthetic yarn, it mimics the texture and earthy tones of real jute while remaining fully machine washable.',
    'Each rug is a two-piece system: a printed rug face and a non-slip rug pad, both designed to separate and fit in a standard home washing machine up to king size.',
    'OEKO-TEX® Standard 100 certified. No harmful substances, no harsh dyes — safe for children and pets.',
  ],
  'Care & Washing': [
    'Machine wash cold on a gentle cycle. Separate the rug face from the rug pad before washing.',
    'Tumble dry low or lay flat to dry. Do not dry clean.',
    'For spot cleaning, use a damp cloth with mild detergent. Blot — do not rub.',
    'We recommend washing every 3–6 months, or as needed. The rug face can be washed up to 100 times without loss of color or structure.',
  ],
  'Shipping & Returns': [
    'Free standard shipping on orders over $89. Most orders ship within 1–3 business days and arrive within 5–8 business days.',
    'Expedited (2-day) shipping available at checkout for an additional fee.',
    'Free returns and exchanges within 30 days of delivery. Items must be in original, unwashed condition. Initiate a return from your account dashboard.',
  ],
}

const REVIEWS = [
  { author: 'Priya S.', location: 'Austin, TX', rating: 5, date: 'Nov 2024', body: 'Absolutely love this rug. The texture feels premium and it washed perfectly on the first try. Colors are exactly as shown.' },
  { author: 'Marcus T.', location: 'Portland, OR', rating: 5, date: 'Oct 2024', body: 'Held up perfectly with two dogs and a toddler. After 6 months and multiple washes it looks brand new.' },
  { author: 'Aisha N.', location: 'Chicago, IL', rating: 4, date: 'Sep 2024', body: 'Beautiful rug, great quality. Took off one star because delivery was a day late, but the product itself is perfect.' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ImageGallery({ colorIndex }: { colorIndex: number }) {
  const [activeIdx, setActiveIdx] = useState(0)

  const images = GALLERY_SEEDS.map((seed, i) => ({
    src: `https://picsum.photos/seed/${seed}${colorIndex}/800/800`,
    thumb: `https://picsum.photos/seed/${seed}${colorIndex}/120/120`,
    alt: `Product image ${i + 1}`,
  }))

  return (
    <div className="flex gap-4">
      {/* Thumbnail strip */}
      <div className="hidden md:flex flex-col gap-3 w-20 flex-shrink-0">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`aspect-square overflow-hidden border-2 transition-all duration-150 ${
              activeIdx === i ? 'border-charcoal' : 'border-transparent hover:border-light-border'
            }`}
          >
            <img src={img.thumb} alt={img.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 aspect-square overflow-hidden bg-warm-gray relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIdx}
            src={images[activeIdx].src}
            alt={images[activeIdx].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Mobile dot navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${activeIdx === i ? 'bg-charcoal w-4' : 'bg-charcoal/30'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function TabSection() {
  const [activeTab, setActiveTab] = useState(TABS[0])
  const [openAccordion, setOpenAccordion] = useState<string | null>(TABS[0])

  return (
    <div className="mt-8 border-t border-light-border">
      {/* Desktop tabs */}
      <div className="hidden md:flex border-b border-light-border">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 font-sans text-sm font-medium transition-all border-b-2 -mb-px ${
              activeTab === tab
                ? 'border-charcoal text-charcoal'
                : 'border-transparent text-stone hover:text-charcoal'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="hidden md:block py-6">
        {TAB_CONTENT[activeTab].map((para, i) => (
          <p key={i} className="font-sans text-sm text-mid-gray leading-relaxed mb-3 last:mb-0">
            {para}
          </p>
        ))}
      </div>

      {/* Mobile accordion */}
      <div className="md:hidden">
        {TABS.map((tab) => (
          <div key={tab} className="border-b border-light-border">
            <button
              onClick={() => setOpenAccordion(openAccordion === tab ? null : tab)}
              className="w-full flex items-center justify-between py-4 font-sans text-sm font-medium text-charcoal"
            >
              {tab}
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${openAccordion === tab ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {openAccordion === tab && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 space-y-3">
                    {TAB_CONTENT[tab].map((para, i) => (
                      <p key={i} className="font-sans text-sm text-mid-gray leading-relaxed">{para}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductPage() {
  const { id } = useParams()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColorIdx, setSelectedColorIdx] = useState(0)
  const [qty, setQty] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  const basePrice = selectedSize ? SIZE_PRICES[selectedSize] : 149
  const color = COLORS[selectedColorIdx]

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return }
    setSizeError(false)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2400)
  }

  // Use id to vary the product name slightly for demo purposes
  const productNum = Number(id) || 1
  const productNames = ['Isla Jute-Look Rug', 'Margot Persian Rug', 'Cleo Geometric Rug',
    'Odette Boho Rug', 'Fern Abstract Rug', 'Lola Striped Runner']
  const productName = productNames[(productNum - 1) % productNames.length]

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="section-container py-8 md:py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 text-xs font-sans text-stone">
          <Link to="/" className="hover:text-charcoal transition-colors flex items-center gap-1">
            <ArrowLeft size={12} /> Home
          </Link>
          <span>/</span>
          <Link to="/collection" className="hover:text-charcoal transition-colors">All Rugs</Link>
          <span>/</span>
          <span className="text-charcoal font-medium truncate">{productName}</span>
        </nav>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">

          {/* Left — Image gallery */}
          <ImageGallery colorIndex={selectedColorIdx} />

          {/* Right — Product info */}
          <div>
            {/* Badge + name */}
            <span className="inline-block font-sans text-[10px] font-semibold tracking-widest uppercase bg-sage text-ivory px-2.5 py-1 mb-4">
              Best Seller
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-charcoal leading-tight mb-3">
              {productName}
            </h1>
            <p className="font-sans text-sm text-stone mb-4 italic">
              {color.name} colorway
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-terracotta text-terracotta" />
                ))}
              </div>
              <span className="font-sans text-sm font-medium text-charcoal">4.8</span>
              <span className="font-sans text-sm text-stone">· 3,421 reviews</span>
              <a href="#reviews" className="font-sans text-xs text-terracotta hover:underline ml-1">Read all</a>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-light-border">
              <span className="font-serif text-3xl font-medium text-charcoal">
                ${basePrice}
              </span>
              {selectedSize && (
                <span className="font-sans text-sm text-stone">for {selectedSize}</span>
              )}
              {!selectedSize && (
                <span className="font-sans text-sm text-stone">· Select size for final price</span>
              )}
            </div>

            {/* Color selector */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <p className="font-sans text-sm font-semibold text-charcoal">
                  Color: <span className="font-normal text-mid-gray">{color.name}</span>
                </p>
              </div>
              <div className="flex gap-3">
                {COLORS.map((c, i) => (
                  <button
                    key={c.name}
                    title={c.name}
                    onClick={() => setSelectedColorIdx(i)}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all duration-150 ${
                      selectedColorIdx === i ? 'border-charcoal scale-110 shadow-sm' : 'border-transparent hover:border-stone'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  >
                    {selectedColorIdx === i && (
                      <span className="absolute inset-0 rounded-full ring-2 ring-offset-1 ring-charcoal" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <p className={`font-sans text-sm font-semibold ${sizeError ? 'text-terracotta' : 'text-charcoal'}`}>
                  {sizeError ? 'Please select a size' : 'Size'}
                </p>
                <a href="#" className="font-sans text-xs text-stone underline hover:text-charcoal transition-colors">
                  Size guide
                </a>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false) }}
                    className={`py-2.5 px-2 font-sans text-xs font-medium border transition-all duration-150 ${
                      selectedSize === size
                        ? 'border-charcoal bg-charcoal text-ivory'
                        : sizeError
                        ? 'border-terracotta/50 text-charcoal hover:border-terracotta'
                        : 'border-light-border text-charcoal hover:border-charcoal'
                    }`}
                  >
                    {size}
                    <span className="block text-[10px] font-normal opacity-70 mt-0.5">
                      ${SIZE_PRICES[size]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex gap-3 mb-6">
              {/* Qty stepper */}
              <div className="flex items-center border border-light-border">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-4 text-charcoal hover:text-terracotta transition-colors font-medium text-lg leading-none"
                >
                  −
                </button>
                <span className="px-4 font-sans text-sm font-medium text-charcoal min-w-[2.5rem] text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-4 text-charcoal hover:text-terracotta transition-colors font-medium text-lg leading-none"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.97 }}
                className={`flex-1 flex items-center justify-center gap-2 font-sans font-semibold text-sm tracking-widest uppercase py-4 transition-all duration-300 ${
                  addedToCart
                    ? 'bg-sage text-ivory'
                    : 'bg-charcoal text-ivory hover:bg-terracotta'
                }`}
              >
                <ShoppingBag size={16} />
                {addedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
              </motion.button>

              {/* Wishlist */}
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="px-4 border border-light-border hover:border-charcoal transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart
                  size={18}
                  className={wishlisted ? 'fill-terracotta text-terracotta' : 'text-charcoal'}
                />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 py-6 border-y border-light-border text-center">
              {[
                { Icon: Truck, label: 'Free Shipping', sub: 'Orders $89+' },
                { Icon: RotateCcw, label: 'Free Returns', sub: 'Within 30 days' },
                { Icon: Shield, label: 'Certified Safe', sub: 'OEKO-TEX®' },
              ].map(({ Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <Icon size={18} strokeWidth={1.5} className="text-terracotta" />
                  <p className="font-sans text-xs font-semibold text-charcoal">{label}</p>
                  <p className="font-sans text-[10px] text-stone">{sub}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <TabSection />
          </div>
        </div>

        {/* Reviews section */}
        <div id="reviews" className="mt-20 pt-10 border-t border-light-border">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl font-medium text-charcoal">Customer Reviews</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-terracotta text-terracotta" />
                  ))}
                </div>
                <span className="font-sans text-sm font-semibold">4.8 out of 5</span>
                <span className="font-sans text-sm text-stone">· 3,421 reviews</span>
              </div>
            </div>
            <button className="btn-secondary text-sm hidden sm:flex">
              Write a Review
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="border border-light-border p-6"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={12} className="fill-terracotta text-terracotta" />
                  ))}
                </div>
                <p className="font-sans text-sm text-mid-gray leading-relaxed italic mb-5">
                  "{review.body}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-light-border">
                  <div>
                    <p className="font-sans text-xs font-semibold text-charcoal">{review.author}</p>
                    <p className="font-sans text-[10px] text-stone">{review.location}</p>
                  </div>
                  <span className="font-sans text-[10px] text-stone">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Related products */}
        <div className="mt-20 pt-10 border-t border-light-border">
          <h2 className="font-serif text-3xl font-medium text-charcoal mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((n) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: n * 0.08, duration: 0.4 }}
              >
                <Link to={`/product/${(productNum % 6) + n}`} className="group flex flex-col">
                  <div className="aspect-square overflow-hidden bg-warm-gray mb-3">
                    <img
                      src={`https://picsum.photos/seed/related${n}${productNum}/600/600`}
                      alt="Related product"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="font-sans text-sm font-medium text-charcoal group-hover:text-terracotta transition-colors">
                    {['Isla Jute-Look Rug', 'Margot Persian Rug', 'Cleo Geometric Rug', 'Odette Boho Rug'][n - 1]}
                  </p>
                  <p className="font-sans text-sm text-stone mt-0.5">From ${[129, 189, 109, 159][n - 1]}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  )
}
