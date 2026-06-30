/**
 * FeaturedCollection — horizontally scrollable on mobile, 4-col grid on desktop.
 * Framer Motion stagger on viewport entry. Product cards link to ProductPage.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Star, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PRODUCTS, type Product } from '../data/products'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
} as const
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
} as const


function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [activeSwatchIdx, setActiveSwatchIdx] = useState(0)

  return (
    <motion.div variants={cardVariants} className="flex flex-col" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-warm-gray">
        <img src={product.imageUrl}      alt={product.name} className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${hovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`} />
        <img src={product.hoverImageUrl} alt={`${product.name} in room`} className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${hovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`} />

        {product.badge && (
          <span className={`absolute top-3 left-3 font-sans text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 ${product.badge === 'Sale' ? 'bg-terracotta text-ivory' : product.badge === 'New' ? 'bg-sage text-ivory' : 'bg-charcoal text-ivory'}`}>
            {product.badge}
          </span>
        )}

        <button
          onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted) }}
          className="absolute top-3 right-3 p-2 rounded-full bg-ivory/80 backdrop-blur-sm hover:bg-ivory transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart size={16} className={wishlisted ? 'fill-terracotta text-terracotta' : 'text-charcoal'} />
        </button>

        {/* Quick add slides up on hover */}
        <div className={`absolute bottom-0 left-0 right-0 transition-transform duration-300 ease-out ${hovered ? 'translate-y-0' : 'translate-y-full'}`}>
          <button
            onClick={(e) => e.preventDefault()}
            className="w-full flex items-center justify-center gap-2 bg-charcoal hover:bg-terracotta text-ivory font-sans text-xs font-semibold tracking-widest uppercase py-4 transition-colors duration-200"
          >
            <ShoppingBag size={14} /> Quick Add
          </button>
        </div>
      </Link>

      <div className="pt-4 flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          {product.swatches.map((swatch, i) => (
            <button
              key={swatch.name}
              title={swatch.name}
              onClick={() => setActiveSwatchIdx(i)}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-150 ${activeSwatchIdx === i ? 'border-charcoal scale-110' : 'border-transparent hover:border-stone'}`}
              style={{ backgroundColor: swatch.hex }}
            />
          ))}
          {product.swatches.length > 3 && <span className="text-stone text-[10px] font-medium ml-1">+{product.swatches.length - 3}</span>}
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-sans text-sm font-medium text-charcoal leading-snug hover:text-terracotta transition-colors duration-150 line-clamp-2">{product.name}</h3>
        </Link>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'fill-terracotta text-terracotta' : 'fill-light-border text-light-border'} />
            ))}
          </div>
          <span className="font-sans text-xs text-stone">({product.reviewCount.toLocaleString()})</span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-sans font-semibold text-base text-charcoal">From ${product.price}</span>
          {product.originalPrice && <span className="font-sans text-sm text-stone line-through">${product.originalPrice}</span>}
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturedCollection() {
  const products = PRODUCTS.slice(0, 4)

  return (
    <section className="py-16 md:py-24 bg-warm-gray">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-stone mb-2">Customer Favorites</p>
            <h2 className="font-serif text-3xl md:text-display-md font-medium text-charcoal">Best Sellers</h2>
          </div>
          <Link to="/collection" className="btn-ghost hidden sm:inline-flex">Shop All <ArrowRight size={14} /></Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 md:grid md:grid-cols-4 md:overflow-visible md:pb-0"
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[260px] md:min-w-0">
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>

        <div className="mt-10 text-center sm:hidden">
          <Link to="/collection" className="btn-secondary">View All Best Sellers</Link>
        </div>
      </div>
    </section>
  )
}
