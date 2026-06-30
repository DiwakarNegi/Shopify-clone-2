/**
 * CategoryGrid — shop-by-room cards with scroll-triggered stagger animation.
 * First card spans 2 rows on desktop (featured layout).
 */

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Category {
  id: string; label: string; subLabel?: string
  imageUrl: string; featured?: boolean
}

const categories: Category[] = [
  { id: 'living-room', label: 'Living Room', subLabel: '240+ styles', imageUrl: 'https://picsum.photos/seed/livingroom/800/900', featured: true },
  { id: 'bedroom',     label: 'Bedroom',     subLabel: '180+ styles', imageUrl: 'https://picsum.photos/seed/bedroomrug/800/440' },
  { id: 'outdoor',     label: 'Outdoor',     subLabel: '90+ styles',  imageUrl: 'https://picsum.photos/seed/outdoorphoto/800/440' },
  { id: 'kitchen',     label: 'Kitchen & Entry', subLabel: 'Runners & Mats', imageUrl: 'https://picsum.photos/seed/kitchenroom/800/440' },
  { id: 'kids',        label: "Kids' Rooms", subLabel: 'Fun & washable',    imageUrl: 'https://picsum.photos/seed/kidsplay/800/440' },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <motion.div variants={cardVariants} className={category.featured ? 'row-span-2' : ''}>
      <Link
        to="/collection"
        className="group relative flex overflow-hidden bg-warm-gray w-full h-full"
        style={{ minHeight: category.featured ? '560px' : '260px' }}
      >
        <img
          src={category.imageUrl}
          alt={category.label}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/65 via-charcoal/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {category.subLabel && (
            <p className="font-sans text-xs text-ivory/70 tracking-widest uppercase mb-1">{category.subLabel}</p>
          )}
          <div className="flex items-end justify-between">
            <h3 className="font-serif text-xl md:text-2xl font-medium text-ivory">{category.label}</h3>
            <span className="flex items-center justify-center w-9 h-9 rounded-full border border-ivory/40 text-ivory opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-ivory/10 group-hover:border-ivory">
              <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function CategoryGrid() {
  return (
    <section id="shop" className="py-16 md:py-24 bg-ivory">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-stone mb-2">Browse</p>
            <h2 className="font-serif text-3xl md:text-display-md font-medium text-charcoal">Shop by Room</h2>
          </div>
          <Link to="/collection" className="btn-ghost hidden sm:inline-flex">
            View All <ArrowRight size={14} />
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[260px] md:auto-rows-[280px]"
        >
          {categories.map((cat) => <CategoryCard key={cat.id} category={cat} />)}
        </motion.div>

        <div className="mt-8 text-center sm:hidden">
          <Link to="/collection" className="btn-ghost">View All Categories <ArrowRight size={14} /></Link>
        </div>
      </div>
    </section>
  )
}
