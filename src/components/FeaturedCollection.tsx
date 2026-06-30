/**
 * FeaturedCollection — horizontally scrollable on mobile, 4-col grid on desktop.
 * Framer Motion stagger on viewport entry. Product cards link to ProductPage.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Star, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ColorSwatch { name: string; hex: string }
interface Product {
  id: string; name: string; price: number; originalPrice?: number
  badge?: string; rating: number; reviewCount: number
  imageUrl: string; hoverImageUrl: string; swatches: ColorSwatch[]
}

const products: Product[] = [
  {
    id: '1', name: 'Isla Jute-Look Indoor/Outdoor Rug', price: 129, badge: 'Best Seller',
    rating: 4.8, reviewCount: 3421,
    imageUrl: 'https://picsum.photos/seed/isla1/600/600',
    hoverImageUrl: 'https://picsum.photos/seed/isla2/600/600',
    swatches: [{ name: 'Natural', hex: '#d4c8b8' }, { name: 'Sage', hex: '#8a9b7e' }, { name: 'Rust', hex: '#c4614a' }, { name: 'Charcoal', hex: '#3d3530' }],
  },
  {
    id: '2', name: 'Margot Persian-Style Area Rug', price: 189, originalPrice: 249, badge: 'Sale',
    rating: 4.9, reviewCount: 2187,
    imageUrl: 'https://picsum.photos/seed/margot1/600/600',
    hoverImageUrl: 'https://picsum.photos/seed/margot2/600/600',
    swatches: [{ name: 'Terracotta', hex: '#c4614a' }, { name: 'Navy', hex: '#2d3a5e' }, { name: 'Blush', hex: '#e8d5c4' }],
  },
  {
    id: '3', name: 'Cleo Geometric Flatweave Rug', price: 109, badge: 'New',
    rating: 4.7, reviewCount: 892,
    imageUrl: 'https://picsum.photos/seed/cleo1/600/600',
    hoverImageUrl: 'https://picsum.photos/seed/cleo2/600/600',
    swatches: [{ name: 'Ivory', hex: '#faf9f6' }, { name: 'Stone', hex: '#9e9589' }, { name: 'Black', hex: '#1a1a1a' }],
  },
  {
    id: '4', name: 'Odette Boho Diamond Area Rug', price: 159,
    rating: 4.8, reviewCount: 1654,
    imageUrl: 'https://picsum.photos/seed/odette1/600/600',
    hoverImageUrl: 'https://picsum.photos/seed/odette2/600/600',
    swatches: [{ name: 'Sage', hex: '#8a9b7e' }, { name: 'Blush', hex: '#e8d5c4' }, { name: 'Indigo', hex: '#4a5568' }, { name: 'Natural', hex: '#d4c8b8' }],
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

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
