/**
 * Footer
 * Full-width multi-column footer with:
 *  - Brand column (logo + tagline + social icons)
 *  - Four link columns (Shop, Help, Company, Legal)
 *  - Bottom bar with copyright + payment method icons
 */

import {
  Instagram,
  Facebook,
  Youtube,
  CreditCard,
  Globe,
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

interface FooterColumn {
  heading: string
  links: { label: string; href: string }[]
}

const columns: FooterColumn[] = [
  {
    heading: 'Shop',
    links: [
      { label: 'All Rugs', href: '#' },
      { label: 'New Arrivals', href: '#' },
      { label: 'Best Sellers', href: '#' },
      { label: 'Sale', href: '#' },
      { label: 'Outdoor Rugs', href: '#' },
      { label: 'Rug Pads', href: '#' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { label: 'FAQs', href: '#' },
      { label: 'Washing Guide', href: '#' },
      { label: 'Rug Size Guide', href: '#' },
      { label: 'Order Status', href: '#' },
      { label: 'Returns & Exchanges', href: '#' },
      { label: 'Contact Us', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Our Story', href: '#' },
      { label: 'Sustainability', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Affiliate Program', href: '#' },
      { label: 'Trade Program', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Settings', href: '#' },
      { label: 'Accessibility', href: '#' },
    ],
  },
]

const socialLinks = [
  { Icon: Instagram, label: 'Instagram', href: '#' },
  { Icon: Globe, label: 'Pinterest', href: '#' },
  { Icon: Facebook, label: 'Facebook', href: '#' },
  { Icon: Youtube, label: 'YouTube', href: '#' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-ivory">
      {/* Main grid */}
      <div className="section-container pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <a
              href="/"
              className="font-serif text-2xl font-semibold tracking-tight text-ivory hover:text-blush transition-colors mb-4 inline-block"
            >
              RugCo
            </a>
            <p className="font-sans text-sm text-ivory/60 leading-relaxed max-w-xs mb-6">
              Machine-washable rugs designed for real life. Because your home
              should be lived in.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-ivory/20 text-ivory/60 hover:border-blush hover:text-blush transition-all duration-200"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="font-sans font-semibold text-xs tracking-[0.18em] uppercase text-ivory/40 mb-5">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-sans text-sm text-ivory/70 hover:text-ivory transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ivory/10">
        <div className="section-container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-ivory/40">
            © {year} RugCo, Inc. All rights reserved.
          </p>

          {/* Payment method icons (placeholder badges) */}
          <div className="flex items-center gap-2">
            {['Visa', 'MC', 'Amex', 'PayPal', 'Apple'].map((method) => (
              <span
                key={method}
                className="inline-flex items-center gap-1 px-2 py-1 rounded border border-ivory/20 bg-ivory/5 text-ivory/50"
              >
                <CreditCard size={12} strokeWidth={1.5} />
                <span className="font-sans text-[10px] font-medium">{method}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
