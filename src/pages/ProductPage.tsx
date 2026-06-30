import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  Heart,
  ShoppingBag,
  RotateCcw,
  Shield,
  Truck,
  ChevronDown,
  ArrowLeft,
  Layers,
  Waves,
  Info
} from 'lucide-react'
import { PRODUCTS, SIZES, SIZE_PRICES } from '../data/products'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

// Surcharges for pad upgrades depending on rug size
const CUSHIONED_SURCHARGES: Record<string, number> = {
  '2×3': 20,
  '4×6': 40,
  '5×8': 60,
  '8×10': 80,
  '9×12': 100,
  'Runner 2.5×7': 45,
  'Round 6': 55,
}

const TUFTED_SURCHARGES: Record<string, number> = {
  '2×3': 35,
  '4×6': 65,
  '5×8': 95,
  '8×10': 125,
  '9×12': 155,
  'Runner 2.5×7': 75,
  'Round 6': 85,
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ImageGallery({ productId, colorIndex }: { productId: string; colorIndex: number }) {
  const [activeIdx, setActiveIdx] = useState(0)

  // Use stable seed values based on product ID and color index to generate distinct images
  const images = Array.from({ length: 5 }).map((_, i) => ({
    src: `https://picsum.photos/seed/rug_${productId}_col${colorIndex}_img${i}/800/800`,
    thumb: `https://picsum.photos/seed/rug_${productId}_col${colorIndex}_img${i}/120/120`,
    alt: `Product image ${i + 1}`,
  }))

  // Reset active thumbnail when colorway changes
  useEffect(() => {
    setActiveIdx(0)
  }, [colorIndex])

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Thumbnail strip */}
      <div className="hidden sm:flex flex-row sm:flex-col gap-3 w-20 flex-shrink-0 order-2 sm:order-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`aspect-square w-16 sm:w-full overflow-hidden border-2 transition-all duration-150 ${
              activeIdx === i ? 'border-charcoal' : 'border-transparent hover:border-light-border'
            }`}
          >
            <img src={img.thumb} alt={img.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 aspect-square overflow-hidden bg-warm-gray relative order-1 sm:order-2">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIdx + '_' + colorIndex}
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
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:hidden z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${activeIdx === i ? 'bg-charcoal w-4' : 'bg-charcoal/30'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function TabSection({ description, care, materials }: { description: string; care: string[]; materials: string }) {
  const [activeTab, setActiveTab] = useState('Description')
  const [openAccordion, setOpenAccordion] = useState<string | null>('Description')

  const tabs = ['Description', 'Care & Washing', 'Shipping & Returns']

  const getTabContent = (tab: string) => {
    switch (tab) {
      case 'Description':
        return [
          description,
          'Our innovative two-piece system features a removable, lightweight Rug Cover and a non-slip Rug Pad. Together, they create a soft, durable rug that stays securely in place while allowing you to refresh your style at a fraction of the cost.',
          materials
        ]
      case 'Care & Washing':
        return care.concat([
          'Use mild, non-bleach laundry detergents.',
          'Line drying is great for fabric longevity, but tumble drying on low works perfectly too.',
          'Never wash the Rug Pad — only the Cover is washable. Simply vacuum or wipe down the non-slip pad if needed.'
        ])
      case 'Shipping & Returns':
        return [
          'Free standard shipping on all orders over $89. Most orders ship within 2–4 business days and arrive within 5-7 business days.',
          'Returns and exchanges are free within 30 days of delivery. Items must be returned in their original, unwashed condition.',
          'Expedited shipping options are available at checkout.'
        ]
      default:
        return []
    }
  }

  return (
    <div className="mt-8 border-t border-light-border">
      {/* Desktop tabs */}
      <div className="hidden md:flex border-b border-light-border">
        {tabs.map((tab) => (
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
        {getTabContent(activeTab).map((para, i) => (
          <p key={i} className="font-sans text-sm text-mid-gray leading-relaxed mb-3 last:mb-0">
            {para}
          </p>
        ))}
      </div>

      {/* Mobile accordion */}
      <div className="md:hidden">
        {tabs.map((tab) => (
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
                    {getTabContent(tab).map((para, i) => (
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

  // Find product by id or fallback to the first product
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0]

  // Component states
  const [selectedSize, setSelectedSize] = useState<string>('5×8')
  const [selectedColorIdx, setSelectedColorIdx] = useState(0)
  const [qty, setQty] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [purchaseType, setPurchaseType] = useState<'system' | 'cover'>('system')
  const [padType, setPadType] = useState<'standard' | 'cushioned' | 'tufted'>('standard')

  // Calculate pricing
  const baseSizePrice = SIZE_PRICES[selectedSize] || product.price
  let currentSinglePrice = baseSizePrice

  if (purchaseType === 'cover') {
    // Cover only is ~70% of the standard system price
    currentSinglePrice = Math.round(baseSizePrice * 0.7)
  } else {
    // Surcharges for premium pad types
    if (padType === 'cushioned') {
      currentSinglePrice += CUSHIONED_SURCHARGES[selectedSize] || 50
    } else if (padType === 'tufted') {
      currentSinglePrice += TUFTED_SURCHARGES[selectedSize] || 80
    }
  }

  const finalTotalPrice = currentSinglePrice * qty
  const activeColor = product.swatches[selectedColorIdx] || product.swatches[0]

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2400)
  }

  // Get washer compatibility description
  const getWasherCompatibility = (size: string) => {
    switch (size) {
      case '2×3':
      case 'Runner 2.5×7':
        return {
          text: 'Fits in compact washing machines',
          capacity: 'Fits easily in compact (2.0+ cu. ft.) home front-loader or top-loader washers.',
          status: 'excellent'
        }
      case '4×6':
      case 'Round 6':
        return {
          text: 'Fits in all standard home washers',
          capacity: 'Fits comfortably in standard (3.0+ cu. ft.) home washers.',
          status: 'excellent'
        }
      case '5×8':
        return {
          text: 'Fits in 3.5+ cu. ft. home washers',
          capacity: 'Fits in standard home front-load or top-load washers without agitators.',
          status: 'good'
        }
      case '8×10':
        return {
          text: 'Fits in 3.8+ cu. ft. home washers',
          capacity: 'Requires a standard large home washer (3.8+ cu. ft.). Fits best in front-loaders.',
          status: 'good'
        }
      case '9×12':
        return {
          text: 'Requires XL or commercial washer',
          capacity: 'Requires extra-large home washer (4.2+ cu. ft.) or a commercial laundromat washer.',
          status: 'warning'
        }
      default:
        return {
          text: 'Machine Washable Cover',
          capacity: 'We recommend verifying machine volume against rug fabric thickness.',
          status: 'good'
        }
    }
  }

  const washerComp = getWasherCompatibility(selectedSize)

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
          <span className="text-charcoal font-medium truncate">{product.name}</span>
        </nav>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column — Image gallery */}
          <div className="lg:col-span-7">
            <ImageGallery productId={product.id} colorIndex={selectedColorIdx} />

            {/* Additional informational blocks (Ruggable specifics) */}
            <div className="mt-8 hidden lg:grid grid-cols-2 gap-4">
              <div className="border border-light-border p-5 bg-warm-gray/40 rounded-sm">
                <div className="flex gap-3 mb-3">
                  <span className="p-2 bg-blush/40 text-terracotta rounded-full h-9 w-9 flex items-center justify-center">
                    <Layers size={18} />
                  </span>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-charcoal">The Patented Two-Piece System</h4>
                    <p className="font-sans text-xs text-stone mt-1">A lightweight Rug Cover clings to a non-slip Rug Pad. It stays put, avoids curling, and peels off in seconds.</p>
                  </div>
                </div>
              </div>
              <div className="border border-light-border p-5 bg-warm-gray/40 rounded-sm">
                <div className="flex gap-3 mb-3">
                  <span className="p-2 bg-sage/20 text-sage rounded-full h-9 w-9 flex items-center justify-center">
                    <Waves size={18} />
                  </span>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-charcoal">100% Machine Washable</h4>
                    <p className="font-sans text-xs text-stone mt-1">Stains, mud, pet accidents, spilled wine — just toss the cover in your washer. Designed to survive up to 100+ cycles.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Product configurator */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Badge + name */}
            <div>
              {product.badge && (
                <span className={`inline-block font-sans text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 mb-3 ${
                  product.badge === 'Sale' ? 'bg-terracotta text-ivory' : product.badge === 'New' ? 'bg-sage text-ivory' : 'bg-charcoal text-ivory'
                }`}>
                  {product.badge}
                </span>
              )}
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-charcoal leading-tight mb-2">
                {product.name}
              </h1>
              <p className="font-sans text-sm text-stone mb-4">
                {activeColor.name} colorway
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating) ? 'fill-terracotta text-terracotta' : 'text-light-border'}
                  />
                ))}
              </div>
              <span className="font-sans text-sm font-semibold text-charcoal">{product.rating.toFixed(1)}</span>
              <span className="font-sans text-sm text-stone">· {product.reviewCount.toLocaleString()} reviews</span>
              <a href="#reviews" className="font-sans text-xs text-terracotta hover:underline ml-1">Read all</a>
            </div>

            {/* Configurator Box */}
            <div className="border-t border-light-border pt-6">
              {/* 1. Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-sans text-sm font-semibold text-charcoal">
                    Select Size: <span className="font-normal text-stone">{selectedSize}</span>
                  </p>
                  <a href="#washer-guide" className="font-sans text-xs text-terracotta hover:underline">
                    Will it fit my washer?
                  </a>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-2.5 font-sans text-xs font-medium border text-center transition-all duration-150 ${
                        selectedSize === size
                          ? 'border-charcoal bg-charcoal text-ivory shadow-sm'
                          : 'border-light-border text-charcoal hover:border-stone bg-ivory'
                      }`}
                    >
                      <span className="block font-semibold">{size}</span>
                      <span className="block text-[10px] font-normal opacity-70 mt-0.5">
                        ${SIZE_PRICES[size]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Color selection */}
              <div className="mb-6">
                <p className="font-sans text-sm font-semibold text-charcoal mb-3">
                  Select Colorway: <span className="font-normal text-stone">{activeColor.name}</span>
                </p>
                <div className="flex gap-3">
                  {product.swatches.map((swatch, i) => (
                    <button
                      key={swatch.name}
                      title={swatch.name}
                      onClick={() => setSelectedColorIdx(i)}
                      className={`relative w-8 h-8 rounded-full border transition-all duration-150 ${
                        selectedColorIdx === i ? 'ring-2 ring-offset-2 ring-charcoal scale-110 shadow-sm' : 'border-light-border hover:scale-105'
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                    >
                      {selectedColorIdx === i && (
                        <span className="absolute inset-0 rounded-full ring-2 ring-offset-1 ring-charcoal" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Purchase Type: Full System vs Cover Only */}
              <div className="mb-6">
                <p className="font-sans text-sm font-semibold text-charcoal mb-3">
                  Choose System Setup:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPurchaseType('system')}
                    className={`p-4 border text-left rounded-sm transition-all duration-200 ${
                      purchaseType === 'system'
                        ? 'border-charcoal bg-warm-gray/40 ring-1 ring-charcoal'
                        : 'border-light-border hover:border-stone bg-ivory'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-semibold text-charcoal">Full Rug System</span>
                      <span className="h-4 w-4 rounded-full border border-charcoal flex items-center justify-center">
                        {purchaseType === 'system' && <span className="h-2 w-2 rounded-full bg-charcoal" />}
                      </span>
                    </div>
                    <p className="font-sans text-[11px] text-stone mt-1.5 leading-relaxed">
                      Includes 1 machine-washable **Rug Cover** + 1 non-slip **Rug Pad**. Complete setup.
                    </p>
                  </button>

                  <button
                    onClick={() => setPurchaseType('cover')}
                    className={`p-4 border text-left rounded-sm transition-all duration-200 ${
                      purchaseType === 'cover'
                        ? 'border-charcoal bg-warm-gray/40 ring-1 ring-charcoal'
                        : 'border-light-border hover:border-stone bg-ivory'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-semibold text-charcoal">Cover Only</span>
                      <span className="h-4 w-4 rounded-full border border-charcoal flex items-center justify-center">
                        {purchaseType === 'cover' && <span className="h-2 w-2 rounded-full bg-charcoal" />}
                      </span>
                    </div>
                    <p className="font-sans text-[11px] text-stone mt-1.5 leading-relaxed">
                      Save ~30%. Includes **Rug Cover** only. Requires a RugCo pad to lock in place.
                    </p>
                  </button>
                </div>
              </div>

              {/* 4. Pad Type upgrades (renders only if purchaseType === 'system') */}
              <AnimatePresence>
                {purchaseType === 'system' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden mb-6"
                  >
                    <p className="font-sans text-sm font-semibold text-charcoal mb-3">
                      Select Pad Type:
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        {
                          id: 'standard' as const,
                          name: 'Standard',
                          sub: 'Low Profile',
                          add: 0,
                          desc: '1/8" thin, fits easily under doors. Safe on all wood and vinyl surfaces.'
                        },
                        {
                          id: 'cushioned' as const,
                          name: 'Cushioned',
                          sub: 'Extra Soft',
                          add: CUSHIONED_SURCHARGES[selectedSize] || 50,
                          desc: '2/5" memory-foam comfort. Recommended for living rooms and nursery areas.'
                        },
                        {
                          id: 'tufted' as const,
                          name: 'Tufted Loft',
                          sub: 'Plush Luxury',
                          add: TUFTED_SURCHARGES[selectedSize] || 80,
                          desc: '3/5" cloud-like loftiness. Our thickest, most premium feel.'
                        }
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setPadType(p.id)}
                          className={`p-3 border text-left rounded-sm relative transition-all duration-150 ${
                            padType === p.id
                              ? 'border-charcoal bg-warm-gray/20'
                              : 'border-light-border hover:border-stone'
                          }`}
                        >
                          <span className="block font-serif text-xs font-bold text-charcoal">{p.name}</span>
                          <span className="block text-[9px] text-stone mt-0.5 uppercase tracking-wider">{p.sub}</span>
                          <span className="block text-[10px] font-semibold text-charcoal mt-1.5">
                            {p.add === 0 ? 'Included' : `+$${p.add}`}
                          </span>
                          <span className="absolute bottom-2 right-2 group/tooltip">
                            <Info size={11} className="text-stone hover:text-charcoal cursor-help" />
                            <span className="pointer-events-none absolute bottom-full right-0 mb-1 w-44 p-2 bg-charcoal text-ivory text-[9px] rounded shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity z-50 leading-relaxed">
                              {p.desc}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Washing Machine Compatibility Quick Badge */}
              <div className="mb-6 p-4 border border-light-border bg-warm-gray/30 rounded-sm flex gap-3 items-start">
                <Waves size={18} className={`flex-shrink-0 mt-0.5 ${washerComp.status === 'warning' ? 'text-terracotta' : 'text-sage'}`} />
                <div>
                  <h4 className="font-sans text-xs font-semibold text-charcoal flex items-center gap-1.5">
                    Washer Compatibility: 
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm ${
                      washerComp.status === 'warning' ? 'bg-terracotta/10 text-terracotta' : 'bg-sage/10 text-sage'
                    }`}>
                      {washerComp.status === 'warning' ? 'Heavy-Duty / Commercial' : 'Home-Washing Friendly'}
                    </span>
                  </h4>
                  <p className="font-sans text-[11px] text-stone mt-1 leading-normal">
                    {washerComp.capacity}
                  </p>
                </div>
              </div>

              {/* Real-time price display */}
              <div className="flex items-baseline justify-between py-5 border-t border-light-border mb-6">
                <div>
                  <span className="font-serif text-3xl font-semibold text-charcoal">
                    ${finalTotalPrice}
                  </span>
                  <span className="font-sans text-xs text-stone ml-2">
                    {qty > 1 ? `($${currentSinglePrice} each)` : ''}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-sans text-xs text-stone block">
                    {purchaseType === 'cover' ? 'Cover Only' : `System w/ ${padType.charAt(0).toUpperCase() + padType.slice(1)} Pad`}
                  </span>
                  <span className="font-sans text-[10px] text-stone italic block mt-0.5">
                    Tax and shipping calculated at checkout
                  </span>
                </div>
              </div>

              {/* Quantity + Add to cart */}
              <div className="flex gap-3 mb-6">
                {/* Qty stepper */}
                <div className="flex items-center border border-light-border bg-ivory">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 py-4 text-charcoal hover:text-terracotta transition-colors font-medium text-lg leading-none"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-3 font-sans text-sm font-semibold text-charcoal min-w-[2rem] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-4 py-4 text-charcoal hover:text-terracotta transition-colors font-medium text-lg leading-none"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to cart */}
                <motion.button
                  onClick={handleAddToCart}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 flex items-center justify-center gap-2 font-sans font-semibold text-xs tracking-widest uppercase py-4 transition-all duration-300 ${
                    addedToCart
                      ? 'bg-sage text-ivory'
                      : 'bg-charcoal text-ivory hover:bg-terracotta hover:shadow'
                  }`}
                >
                  <ShoppingBag size={14} />
                  {addedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
                </motion.button>

                {/* Wishlist */}
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className="px-4 border border-light-border bg-ivory hover:border-charcoal transition-colors rounded-sm"
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
              <TabSection
                description={product.description}
                care={product.careInstructions}
                materials={product.materials}
              />
            </div>
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
                <span className="font-sans text-sm font-semibold">{product.rating.toFixed(1)} out of 5</span>
                <span className="font-sans text-sm text-stone">· {product.reviewCount.toLocaleString()} reviews</span>
              </div>
            </div>
            <button className="btn-secondary text-sm hidden sm:flex">
              Write a Review
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { author: 'Priya S.', location: 'Austin, TX', rating: 5, date: 'Nov 2024', body: 'Absolutely love this rug. The texture feels premium and it washed perfectly on the first try. Colors are exactly as shown.' },
              { author: 'Marcus T.', location: 'Portland, OR', rating: 5, date: 'Oct 2024', body: 'Held up perfectly with two dogs and a toddler. After 6 months and multiple washes it looks brand new.' },
              { author: 'Aisha N.', location: 'Chicago, IL', rating: 4, date: 'Sep 2024', body: 'Beautiful rug, great quality. Took off one star because delivery was a day late, but the product itself is perfect.' },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="border border-light-border p-6 bg-warm-gray/20 rounded-sm"
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
            {PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4).map((rp, n) => (
              <motion.div
                key={rp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: n * 0.08, duration: 0.4 }}
              >
                <Link to={`/product/${rp.id}`} className="group flex flex-col">
                  <div className="aspect-square overflow-hidden bg-warm-gray mb-3 rounded-sm relative">
                    <img
                      src={rp.imageUrl}
                      alt={rp.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="font-sans text-sm font-semibold text-charcoal group-hover:text-terracotta transition-colors line-clamp-1">
                    {rp.name}
                  </p>
                  <p className="font-sans text-sm text-stone mt-0.5">From ${rp.price}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
