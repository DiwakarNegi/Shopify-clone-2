/**
 * Navbar — sticky header with mega-dropdown and mobile drawer.
 * Uses React Router Link for client-side navigation.
 */

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MegaMenuSection { heading: string; links: { label: string; href: string }[] }
interface NavItem { label: string; to: string; megaMenu?: MegaMenuSection[] }

const navItems: NavItem[] = [
  {
    label: 'Shop Rugs', to: '/collection',
    megaMenu: [
      { heading: 'By Style', links: [
        { label: 'Modern & Contemporary', href: '/collection' },
        { label: 'Traditional & Oriental', href: '/collection' },
        { label: 'Bohemian', href: '/collection' },
        { label: 'Minimalist', href: '/collection' },
        { label: 'Coastal & Nautical', href: '/collection' },
      ]},
      { heading: 'By Size', links: [
        { label: '2×3 / Accent', href: '/collection' },
        { label: '4×6', href: '/collection' },
        { label: '5×8', href: '/collection' },
        { label: '8×10', href: '/collection' },
        { label: 'Runner', href: '/collection' },
        { label: 'Round', href: '/collection' },
      ]},
      { heading: 'By Room', links: [
        { label: 'Living Room', href: '/collection' },
        { label: 'Bedroom', href: '/collection' },
        { label: 'Dining Room', href: '/collection' },
        { label: 'Kitchen', href: '/collection' },
        { label: 'Outdoor', href: '/collection' },
        { label: "Kids' Room", href: '/collection' },
      ]},
      { heading: 'Collections', links: [
        { label: 'New Arrivals', href: '/collection' },
        { label: 'Best Sellers', href: '/collection' },
        { label: 'Designer Collabs', href: '/collection' },
        { label: 'Sale', href: '/collection' },
      ]},
    ],
  },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'Design Your Own', to: '/#design' },
  { label: 'About', to: '/#about' },
]

function MegaMenu({ sections }: { sections: MegaMenuSection[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-screen max-w-4xl bg-ivory border-t border-light-border shadow-2xl z-50"
    >
      <div className="grid grid-cols-4 divide-x divide-light-border py-10 px-8">
        {sections.map((section) => (
          <div key={section.heading} className="px-6 first:pl-0 last:pr-0">
            <p className="font-sans font-semibold text-xs tracking-widest uppercase text-stone mb-4">
              {section.heading}
            </p>
            <ul className="space-y-2.5">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-charcoal hover:text-terracotta transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex"
        >
          <motion.div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="relative ml-auto w-full max-w-sm bg-ivory h-full overflow-y-auto shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-light-border">
              <Link to="/" onClick={onClose} className="font-serif font-semibold text-xl tracking-tight">RugCo</Link>
              <button onClick={onClose} className="p-1 text-charcoal hover:text-terracotta transition-colors">
                <X size={22} />
              </button>
            </div>
            <nav className="px-6 py-4">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-light-border last:border-0">
                  {item.megaMenu ? (
                    <>
                      <button
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between py-4 font-sans font-medium text-base text-charcoal"
                      >
                        {item.label}
                        <ChevronDown size={16} className={`transition-transform duration-200 ${expanded === item.label ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {expanded === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4 space-y-5">
                              {item.megaMenu.map((section) => (
                                <div key={section.heading}>
                                  <p className="text-xs font-semibold tracking-widest uppercase text-stone mb-2">{section.heading}</p>
                                  <ul className="space-y-2">
                                    {section.links.map((link) => (
                                      <li key={link.label}>
                                        <Link to={link.href} onClick={onClose} className="text-sm text-charcoal hover:text-terracotta transition-colors">
                                          {link.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link to={item.to} onClick={onClose} className="flex items-center py-4 font-sans font-medium text-base text-charcoal hover:text-terracotta transition-colors">
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            <div className="px-6 py-6 border-t border-light-border space-y-4">
              <a href="#" className="flex items-center gap-3 text-sm text-charcoal hover:text-terracotta transition-colors"><User size={18} /> My Account</a>
              <a href="#" className="flex items-center gap-3 text-sm text-charcoal hover:text-terracotta transition-colors"><Search size={18} /> Search</a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = (label: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setActiveMenu(label)
  }
  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 120)
  }

  return (
    <>
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? 'bg-ivory/95 backdrop-blur-md shadow-sm' : 'bg-ivory'}`}>
        <div className="section-container">
          <div className="flex items-center justify-between h-[68px]">
            <Link to="/" className="flex-shrink-0 font-serif font-semibold text-2xl tracking-tight text-charcoal hover:text-terracotta transition-colors">
              RugCo
            </Link>

            <nav className="hidden lg:flex items-center gap-0">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.megaMenu && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.to}
                    className={`inline-flex items-center gap-1 px-4 py-2 font-sans text-sm font-medium tracking-wide transition-colors duration-150 ${activeMenu === item.label ? 'text-terracotta' : 'text-charcoal hover:text-terracotta'}`}
                  >
                    {item.label}
                    {item.megaMenu && (
                      <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === item.label ? 'rotate-180 text-terracotta' : ''}`} />
                    )}
                  </Link>
                  <AnimatePresence>
                    {item.megaMenu && activeMenu === item.label && (
                      <MegaMenu sections={item.megaMenu} />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <button className="hidden sm:flex p-2.5 text-charcoal hover:text-terracotta transition-colors rounded-full hover:bg-warm-gray">
                <Search size={20} strokeWidth={1.5} />
              </button>
              <button className="hidden sm:flex p-2.5 text-charcoal hover:text-terracotta transition-colors rounded-full hover:bg-warm-gray">
                <User size={20} strokeWidth={1.5} />
              </button>
              <button className="relative p-2.5 text-charcoal hover:text-terracotta transition-colors rounded-full hover:bg-warm-gray">
                <ShoppingBag size={20} strokeWidth={1.5} />
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-ivory text-[10px] font-semibold">2</span>
              </button>
              <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2.5 text-charcoal hover:text-terracotta transition-colors rounded-full hover:bg-warm-gray ml-1">
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
        <div className={`absolute bottom-0 left-0 right-0 h-px bg-light-border transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
      </header>
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
