/**
 * ValueProps
 * Icon + headline + body-copy row explaining the core product USPs.
 * Renders as a 2×2 grid on mobile, 4 columns on desktop.
 * Each tile has a subtle hover lift.
 */

import { Droplets, Shield, Leaf, RefreshCw } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface ValueProp {
  Icon: LucideIcon
  title: string
  body: string
}

const props: ValueProp[] = [
  {
    Icon: Droplets,
    title: 'Machine Washable',
    body: 'Toss the whole rug in a standard home washer. Life-proof meets design-forward.',
  },
  {
    Icon: Shield,
    title: 'Certified Safe',
    body: 'OEKO-TEX® Standard 100 certified — free from harmful substances for kids and pets.',
  },
  {
    Icon: Leaf,
    title: 'Sustainably Made',
    body: 'Crafted from recycled materials with a low-impact dye process and carbon-neutral shipping.',
  },
  {
    Icon: RefreshCw,
    title: 'Free 30-Day Returns',
    body: 'Not the right fit? Return or exchange within 30 days, no questions asked.',
  },
]

export default function ValueProps() {
  return (
    <section className="py-16 md:py-20 bg-ivory border-y border-light-border">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 lg:gap-10">
          {props.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="group flex flex-col items-center text-center px-3 py-6 rounded-sm transition-all duration-300 hover:bg-warm-gray"
            >
              {/* Icon ring */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-light-border bg-warm-gray mb-5 transition-all duration-300 group-hover:border-terracotta group-hover:bg-blush">
                <Icon
                  size={24}
                  strokeWidth={1.5}
                  className="text-charcoal transition-colors duration-300 group-hover:text-terracotta"
                />
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg font-medium text-charcoal mb-2">
                {title}
              </h3>

              {/* Body */}
              <p className="font-sans text-sm text-mid-gray leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
