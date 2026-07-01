'use client'

/**
 * Hero — full-viewport lifestyle banner with Framer Motion entrance animation.
 * Text stagger: eyebrow → headline → body → buttons, each offset by 0.1s.
 */

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Link from 'next/link'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
} as const
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
} as const


export default function Hero() {
  return (
    <section className="relative w-full h-[92vh] min-h-[560px] overflow-hidden">
      {/* Background */}
      <motion.img
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1920&q=80"
        alt="Warm living room with a washable area rug"
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/25 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end pb-16 md:pb-24">
        <div className="section-container">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.p variants={item} className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-blush mb-4">
              New Summer Collection
            </motion.p>

            <motion.h1 variants={item} className="font-serif text-balance text-5xl md:text-6xl lg:text-display-lg font-medium text-ivory leading-tight mb-6">
              Rugs Made{' '}
              <em className="font-normal text-blush not-italic">for Real Life</em>
            </motion.h1>

            <motion.p variants={item} className="font-sans text-base md:text-lg text-ivory/80 leading-relaxed max-w-lg mb-10">
              Machine-washable, pet-friendly, and certified safe for children.
              Finally, a rug you don't have to stress about.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
              <Link href="/collection" className="btn-primary text-center">
                Shop All Rugs
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 border border-ivory/60 text-ivory font-sans font-medium text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300 hover:bg-ivory/10 hover:border-ivory"
              >
                How It Works
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        aria-label="Scroll down"
        className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 text-ivory/60 hover:text-ivory transition-colors group"
      >
        <span className="font-sans text-xs tracking-widest uppercase">Explore</span>
        <ArrowDown size={16} className="animate-bounce group-hover:text-blush" />
      </motion.button>
    </section>
  )
}
