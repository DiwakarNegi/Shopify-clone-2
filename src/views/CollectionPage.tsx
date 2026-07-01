'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'
import Link from 'next/link'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const SORT_OPTIONS = ['Best Sellers', 'New Arrivals', 'Price: Low to High', 'Price: High to Low', 'Top Rated']
const SIZES = ['2×3', '4×6', '5×8', '8×10', 'Runner', 'Round']
const STYLES = ['Modern', 'Traditional', 'Bohemian', 'Minimalist', 'Coastal']

import { PRODUCTS } from '../data/products'

const products = PRODUCTS.map((p) => ({
  ...p,
  reviews: p.reviewCount,
}))


export default function CollectionPage() {
  const [sort, setSort] = useState('Best Sellers')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [activeSize, setActiveSize] = useState<string | null>(null)
  const [activeStyle, setActiveStyle] = useState<string | null>(null)

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Page header */}
      <div className="border-b border-light-border bg-warm-gray py-10">
        <div className="section-container">
          <p className="font-sans text-xs text-stone tracking-widest uppercase mb-2">
            <Link href="/" className="hover:text-terracotta transition-colors">Home</Link>
            {' / '}All Rugs
          </p>
          <h1 className="font-serif text-4xl font-medium text-charcoal">All Rugs</h1>
          <p className="font-sans text-sm text-stone mt-1">{products.length} products</p>
        </div>
      </div>

      <div className="section-container py-10">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 font-sans text-sm font-medium text-charcoal border border-light-border px-4 py-2.5 hover:border-charcoal transition-colors"
          >
            <SlidersHorizontal size={16} strokeWidth={1.5} />
            Filters
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <span className="font-sans text-sm text-stone">Sort by:</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none font-sans text-sm text-charcoal border border-light-border bg-ivory px-4 pr-9 py-2.5 focus:outline-none focus:ring-1 focus:ring-charcoal cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone" />
            </div>
          </div>
        </div>

        {/* Filter pills */}
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-light-border p-6 mb-8 bg-warm-gray"
          >
            <div className="flex flex-wrap gap-10">
              <div>
                <p className="font-sans text-xs font-semibold tracking-widest uppercase text-stone mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setActiveSize(activeSize === s ? null : s)}
                      className={`px-4 py-1.5 font-sans text-sm border transition-all ${
                        activeSize === s
                          ? 'border-charcoal bg-charcoal text-ivory'
                          : 'border-light-border text-charcoal hover:border-charcoal'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-sans text-xs font-semibold tracking-widest uppercase text-stone mb-3">Style</p>
                <div className="flex flex-wrap gap-2">
                  {STYLES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setActiveStyle(activeStyle === s ? null : s)}
                      className={`px-4 py-1.5 font-sans text-sm border transition-all ${
                        activeStyle === s
                          ? 'border-charcoal bg-charcoal text-ivory'
                          : 'border-light-border text-charcoal hover:border-charcoal'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link href={`/product/${product.id}`} className="group flex flex-col">
                <div className="relative aspect-square overflow-hidden bg-warm-gray mb-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 font-sans ${
                      product.badge === 'Sale' ? 'bg-terracotta text-ivory'
                        : product.badge === 'New' ? 'bg-sage text-ivory'
                        : 'bg-charcoal text-ivory'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-sans text-sm font-medium text-charcoal group-hover:text-terracotta transition-colors mb-1">
                  {product.name}
                </h3>
                <p className="font-sans text-xs text-stone mb-1.5">
                  ★ {product.rating.toFixed(1)} ({product.reviews.toLocaleString()})
                </p>
                <p className="font-sans font-semibold text-sm text-charcoal">
                  From ${product.price}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
