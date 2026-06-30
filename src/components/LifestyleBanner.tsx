/**
 * LifestyleBanner
 * Full-bleed split section: image (60%) + editorial copy (40%).
 * Alternates image side via the `reverse` prop so it can be reused
 * for multiple "story" beats on the page.
 */

import { ArrowRight } from 'lucide-react'

interface LifestyleBannerProps {
  eyebrow: string
  headline: string
  body: string
  ctaLabel: string
  ctaHref: string
  imageUrl: string
  imageAlt: string
  reverse?: boolean
  dark?: boolean // dark background variant
}

function LifestyleBannerSection({
  eyebrow,
  headline,
  body,
  ctaLabel,
  ctaHref,
  imageUrl,
  imageAlt,
  reverse = false,
  dark = false,
}: LifestyleBannerProps) {
  return (
    <div
      className={`flex flex-col ${
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      } min-h-[480px] md:min-h-[560px]`}
    >
      {/* Image */}
      <div className="relative w-full md:w-3/5 overflow-hidden aspect-[4/3] md:aspect-auto">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
        />
      </div>

      {/* Copy */}
      <div
        className={`flex items-center w-full md:w-2/5 px-8 py-14 md:px-14 lg:px-20 ${
          dark ? 'bg-charcoal text-ivory' : 'bg-blush text-charcoal'
        }`}
      >
        <div className="max-w-sm">
          <p
            className={`font-sans text-xs font-semibold tracking-[0.22em] uppercase mb-4 ${
              dark ? 'text-stone' : 'text-mid-gray'
            }`}
          >
            {eyebrow}
          </p>
          <h2
            className={`font-serif text-3xl md:text-4xl font-medium leading-tight mb-6 ${
              dark ? 'text-ivory' : 'text-charcoal'
            }`}
          >
            {headline}
          </h2>
          <p
            className={`font-sans text-base leading-relaxed mb-10 ${
              dark ? 'text-ivory/70' : 'text-mid-gray'
            }`}
          >
            {body}
          </p>
          <a
            href={ctaHref}
            className={`inline-flex items-center gap-2 font-sans font-semibold text-sm tracking-widest uppercase border-b-2 pb-0.5 transition-colors duration-200 ${
              dark
                ? 'border-ivory/40 text-ivory hover:border-blush hover:text-blush'
                : 'border-charcoal text-charcoal hover:border-terracotta hover:text-terracotta'
            }`}
          >
            {ctaLabel}
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default function LifestyleBanner() {
  return (
    <section className="overflow-hidden">
      <LifestyleBannerSection
        eyebrow="The Washable Difference"
        headline="From Muddy Paws to Party Night — Just Wash It."
        body="Our two-piece rug system separates into a rug face and a rug pad, both of which fit standard home washing machines up to king size. Forget the rug cleaner."
        ctaLabel="See How It Works"
        ctaHref="#"
        imageUrl="https://placehold.co/960x640/c9b49a/3d3530?text=Dog+on+Rug+(Lifestyle)"
        imageAlt="Dog relaxing on a washable area rug"
      />

      <LifestyleBannerSection
        eyebrow="Designed for Every Home"
        headline="200+ Patterns. One Rug System."
        body="Whether your style is minimalist, maximalist, or somewhere in between, we have a pattern to match. All in sizes from 2×3 accent mats to 9×12 statement pieces."
        ctaLabel="Shop the Collection"
        ctaHref="#"
        imageUrl="https://placehold.co/960x640/8a9b7e/ffffff?text=Pattern+Collection+Flatlay"
        imageAlt="Flat lay of multiple rug patterns"
        reverse
        dark
      />
    </section>
  )
}
