import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Waves,
  Shield,
  Leaf,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  Layers,
  Check,
  ChevronDown
} from 'lucide-react'
import { Link } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.45, ease: 'easeOut' as const } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

const steps = [
  {
    num: '01',
    title: 'Prep & Lay',
    desc: 'Roll out your non-slip Rug Pad on a clean, dry floor. Our rug pads use a patented Cling-Effect™ backing (similar to Velcro) that prevents shifting and sliding.',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=600&q=80'
  },
  {
    num: '02',
    title: 'Roll & Cling',
    desc: 'Fold the lightweight Rug Cover in half, align it with the corners of the pad, and smooth it down. The cover immediately locks onto the pad without wrinkles.',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80'
  },
  {
    num: '03',
    title: 'Live & Wash',
    desc: 'Spills, muddy paws, pet stains, or dust? No stress. Simply peel the Rug Cover off the pad and toss it in your standard home washing machine. It comes out looking brand new!',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=600&q=80'
  }
]

const faqs = [
  {
    q: 'Do I really need both the Rug Cover and the Rug Pad?',
    a: 'Yes, our washable rugs are designed as a two-piece system. The Rug Cover is lightweight, soft, and completely machine washable, but it does not have a heavy backing. The non-slip Rug Pad is what gives the rug its structure, keeps it flat on the floor, and ensures it does not slide. They work together perfectly!'
  },
  {
    q: 'How many times can I wash the Rug Cover?',
    a: 'Our covers are engineered for high-frequency washing. They can be washed up to 100 times without losing their structure, vibrant color, or spill-repellent qualities. Always wash cold on a gentle cycle and tumble dry on low.'
  },
  {
    q: 'Is the Rug Pad washable too?',
    a: 'No, the Rug Pad should NOT be washed in a machine. If the pad gets dirty, simply spot clean it with soap and warm water, vacuum it, or wipe it down. Because it lies underneath the cover, it rarely needs heavy cleaning!'
  },
  {
    q: 'Are your rugs safe for kids and pets?',
    a: 'Absolutely. All RugCo rugs are OEKO-TEX® Standard 100 certified, which means they are completely free of harmful substances, toxic dyes, and chemicals. They are hypoallergenic, pet-friendly, and safe for babies to crawl on.'
  }
]

// Calculator Data
const RUG_SIZES = [
  { value: '2x3', label: "Accent Rug (2' × 3')" },
  { value: 'runner', label: "Runner (2.5' × 7')" },
  { value: '4x6', label: "Area Rug (4' × 6')" },
  { value: 'round6', label: "Round Rug (6')" },
  { value: '5x8', label: "Medium Area Rug (5' × 8')" },
  { value: '8x10', label: "Large Area Rug (8' × 10')" },
  { value: '9x12', label: "Extra Large Area Rug (9' × 12')" }
]

const WASHER_SIZES = [
  { value: 'compact', label: 'Compact Home Washer (2.0 - 2.4 cu. ft.)' },
  { value: 'standard', label: 'Standard Home Washer (3.0 - 3.7 cu. ft.)' },
  { value: 'large', label: 'Large Home Washer (3.8 - 4.2 cu. ft.)' },
  { value: 'xlarge', label: 'Extra-Large Home Washer (4.3+ cu. ft.)' },
  { value: 'agitator', label: 'Top-Load Washer with Center Agitator' }
]

export default function AboutPage() {
  // Calculator state
  const [selectedSize, setSelectedSize] = useState('5x8')
  const [selectedWasher, setSelectedWasher] = useState('standard')
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  // Calculate compatibility report
  const checkCompatibility = () => {
    if (selectedWasher === 'agitator') {
      if (selectedSize === '2x3' || selectedSize === 'runner') {
        return {
          compatible: true,
          status: 'warning',
          title: 'Fits with Care',
          text: 'Fits, but top-load washers with center agitators can sometimes catch rug edges. We highly recommend washing in a delicate mesh bag or using a front-loader if possible.',
          tip: 'Tip: Ensure the rug is folded evenly around the agitator to prevent imbalance.'
        }
      } else {
        return {
          compatible: false,
          status: 'danger',
          title: 'Not Recommended',
          text: 'We do NOT recommend washing rugs larger than 4x6 in a washer with a center agitator. The mechanical movement can wrap and stretch the rug fibers, causing damage over time.',
          tip: 'Alternative: We advise using a front-load washer, a top-load washer without an agitator, or a commercial laundromat.'
        }
      }
    }

    switch (selectedSize) {
      case '2x3':
      case 'runner':
        return {
          compatible: true,
          status: 'success',
          title: 'Perfect Fit!',
          text: 'This size is highly compact and fits effortlessly in all washing machine sizes, including small European apartment-sized washers.',
          tip: 'Tip: You can wash this alongside other small towels or items easily.'
        }
      case '4x6':
      case 'round6':
        if (selectedWasher === 'compact') {
          return {
            compatible: true,
            status: 'warning',
            title: 'Tight Fit',
            text: 'It will fit, but it will occupy most of the drum. Wash alone on a gentle cycle to ensure thorough rinsing.',
            tip: 'Tip: Shake out the cover before washing to reduce wrinkles.'
          }
        }
        return {
          compatible: true,
          status: 'success',
          title: 'Perfect Fit!',
          text: 'Fits comfortably with plenty of room to spare in any standard, large, or extra-large home washer.',
          tip: 'Tip: Wash alone on a cold, delicate cycle for best results.'
        }
      case '5x8':
        if (selectedWasher === 'compact') {
          return {
            compatible: false,
            status: 'danger',
            title: 'Too Large for Washer',
            text: 'A 5x8 cover is too bulky for a compact apartment-sized washer. Overloading can result in an incomplete wash and put stress on your machine motor.',
            tip: 'Alternative: Visit a laundromat or use a standard standard-sized washer (3.0+ cu. ft.).'
          }
        }
        return {
          compatible: true,
          status: 'success',
          title: 'Fits Great!',
          text: 'Fits easily in standard (3.0+ cu. ft.) and larger home front-load washers or top-loaders without an agitator.',
          tip: 'Tip: Tumble dry low or air dry flat.'
        }
      case '8x10':
        if (selectedWasher === 'compact' || selectedWasher === 'standard') {
          return {
            compatible: false,
            status: 'danger',
            title: 'Too Bulky',
            text: 'An 8x10 rug cover requires a high-volume washer. Standard and compact home washers do not have the drum depth to properly spin and wash this load.',
            tip: 'Requirement: You need a Large home washer (3.8+ cu. ft.) or a front-load commercial laundromat machine.'
          }
        }
        return {
          compatible: true,
          status: 'success',
          title: 'Fits Great!',
          text: 'Fits perfectly in large (3.8+ cu. ft.) or extra-large home front-loaders.',
          tip: 'Tip: Use extra-spin cycle to draw out water before drying on low.'
        }
      case '9x12':
        if (selectedWasher === 'xlarge') {
          return {
            compatible: true,
            status: 'warning',
            title: 'Fits in XL Washer Only',
            text: 'Can be washed at home ONLY if you have an extra-large front-loader drum with 4.3+ cu. ft. capacity.',
            tip: 'Recommendation: If your home washer is standard, please use a multi-load commercial laundromat washer (approx. 40-50 lb capacity).'
          }
        }
        return {
          compatible: false,
          status: 'danger',
          title: 'Requires Commercial Washer',
          text: 'Our massive 9x12 rug covers are heavy and dense. Compact, standard, and standard-large washers will overload, which prevents a proper clean.',
          tip: 'Recommendation: We recommend using an extra-large home machine (4.3+ cu. ft.) or a high-capacity commercial washer at a laundromat.'
        }
      default:
        return {
          compatible: true,
          status: 'success',
          title: 'Fits',
          text: 'Standard fit.',
          tip: ''
        }
    }
  }

  const result = checkCompatibility()

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="bg-ivory text-charcoal">
      {/* 1. Hero Section */}
      <section className="relative py-20 md:py-32 bg-warm-gray border-b border-light-border overflow-hidden">
        <div className="section-container relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <span className="inline-block font-sans text-xs font-semibold tracking-[0.2em] uppercase text-terracotta mb-3">Our Story</span>
            <h1 className="font-serif text-display-md sm:text-display-lg font-medium leading-tight text-charcoal mb-6">
              Rugs Designed for <br /><em className="not-italic text-terracotta">Real Life.</em>
            </h1>
            <p className="font-sans text-base text-mid-gray leading-relaxed mb-6">
              It started with a simple question: **Why are rugs so hard to clean?** Traditional rugs collect dirt, spillages, pet hair, and allergens, and getting them cleaned professionally is expensive, heavy, and exhausting. 
            </p>
            <p className="font-sans text-base text-mid-gray leading-relaxed">
              That is why we created **RugCo** (inspired by Ruggable's washing breakthrough). We invented the world’s first high-fidelity **Two-Piece Washable Rug System**. By splitting the rug cover from the pad, you get a premium, heavy-weight rug that peels off and fits right inside your household washing machine. 
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=800&q=80"
              alt="Cozy clean living room with pets"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* 2. How the Two-Piece System Works */}
      <section className="py-16 md:py-24 bg-ivory">
        <div className="section-container text-center max-w-2xl mb-16">
          <span className="p-2 bg-blush/40 text-terracotta rounded-full h-10 w-10 flex items-center justify-center mx-auto mb-4">
            <Layers size={20} />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4 text-charcoal">
            The Two-Piece Rug System
          </h2>
          <p className="font-sans text-sm text-mid-gray leading-relaxed">
            One rug, two simple pieces. A lightweight, beautiful cover that goes into your washer, and a heavy, non-slip pad that grips your floor.
          </p>
        </div>

        <div className="section-container grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="group flex flex-col bg-warm-gray/30 border border-light-border p-6 rounded-sm transition-all duration-300 hover:shadow-lg">
              <div className="aspect-[3/2] overflow-hidden bg-warm-gray mb-6 rounded-sm relative">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-charcoal text-ivory font-sans font-bold text-xs px-2.5 py-1 tracking-wider uppercase rounded-sm shadow">
                  Step {step.num}
                </span>
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3 text-charcoal flex items-center gap-2">
                {step.title}
              </h3>
              <p className="font-sans text-sm text-mid-gray leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive Washing Machine Calculator */}
      <section id="washer-calculator" className="py-16 md:py-24 bg-warm-gray border-y border-light-border">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left explanation */}
            <div className="lg:col-span-5">
              <span className="inline-flex p-2 bg-sage/20 text-sage rounded-full mb-4">
                <Waves size={20} />
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-charcoal leading-tight mb-4">
                Washing Machine <br />Compatibility Guide
              </h2>
              <p className="font-sans text-sm text-mid-gray leading-relaxed mb-6">
                Are you wondering if your large rug will fit in your home washer? Unlike traditional stiff rugs, our covers fold like sheets. 
              </p>
              <p className="font-sans text-sm text-mid-gray leading-relaxed mb-8">
                Use our interactive fit calculator to select your desired rug size and your home washer type. We will let you know instantly if it fits safely and provide useful tips for your wash cycle.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <span className="h-5 w-5 rounded-full bg-sage/10 text-sage flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                  <p className="font-sans text-xs font-medium text-charcoal">Fits easily in standard 3.8+ cu. ft. washers up to 8'x10' sizes.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="h-5 w-5 rounded-full bg-sage/10 text-sage flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                  <p className="font-sans text-xs font-medium text-charcoal">Our covers are spill-resistant and liquid repellent — stains wash right out.</p>
                </div>
              </div>
            </div>

            {/* Right Interactive Card */}
            <div className="lg:col-span-7 bg-ivory border border-light-border p-6 md:p-8 rounded-sm shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-terracotta via-blush to-sage" />
              
              <h3 className="font-serif text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
                <Sparkles size={18} className="text-terracotta" /> Will It Fit? Test Your Washer
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* 1. Rug size select */}
                <div>
                  <label htmlFor="rug-size-select" className="block font-sans text-xs font-bold uppercase tracking-wider text-stone mb-2">
                    1. Select Rug Size
                  </label>
                  <select
                    id="rug-size-select"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full font-sans text-sm text-charcoal border border-light-border bg-ivory p-3.5 focus:outline-none focus:ring-1 focus:ring-charcoal cursor-pointer rounded-sm"
                  >
                    {RUG_SIZES.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>

                {/* 2. Washer type select */}
                <div>
                  <label htmlFor="washer-type-select" className="block font-sans text-xs font-bold uppercase tracking-wider text-stone mb-2">
                    2. Select Washer Type
                  </label>
                  <select
                    id="washer-type-select"
                    value={selectedWasher}
                    onChange={(e) => setSelectedWasher(e.target.value)}
                    className="w-full font-sans text-sm text-charcoal border border-light-border bg-ivory p-3.5 focus:outline-none focus:ring-1 focus:ring-charcoal cursor-pointer rounded-sm"
                  >
                    {WASHER_SIZES.map((w) => (
                      <option key={w.value} value={w.value}>{w.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dynamic Compatibility Result Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSize + '_' + selectedWasher}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`p-6 border rounded-sm flex flex-col md:flex-row gap-5 ${
                    result.status === 'success'
                      ? 'border-sage/40 bg-sage/5'
                      : result.status === 'warning'
                      ? 'border-terracotta/30 bg-terracotta/5'
                      : 'border-charcoal/20 bg-warm-gray'
                  }`}
                >
                  {/* Result Status Icon */}
                  <div className="flex-shrink-0">
                    {result.status === 'success' ? (
                      <span className="p-3 bg-sage/10 text-sage rounded-full h-12 w-12 flex items-center justify-center font-bold shadow-inner">
                        <CheckCircle2 size={24} />
                      </span>
                    ) : result.status === 'warning' ? (
                      <span className="p-3 bg-terracotta/15 text-terracotta rounded-full h-12 w-12 flex items-center justify-center font-bold shadow-inner">
                        <HelpCircle size={24} />
                      </span>
                    ) : (
                      <span className="p-3 bg-charcoal/10 text-charcoal rounded-full h-12 w-12 flex items-center justify-center font-bold shadow-inner">
                        <AlertTriangle size={24} />
                      </span>
                    )}
                  </div>

                  {/* Result Text Content */}
                  <div className="flex-1">
                    <h4 className="font-serif text-lg font-bold text-charcoal mb-1">
                      {result.title}
                    </h4>
                    <p className="font-sans text-sm text-charcoal/80 leading-relaxed mb-3">
                      {result.text}
                    </p>
                    {result.tip && (
                      <p className="font-sans text-xs font-semibold text-stone italic border-t border-light-border/40 pt-2 leading-relaxed">
                        {result.tip}
                      </p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action */}
              <div className="mt-8 text-center md:text-right">
                <Link to="/collection" className="btn-primary text-xs tracking-widest px-6 py-3.5">
                  Browse Compatible Rugs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values & Sustainability */}
      <section className="py-16 md:py-24 bg-ivory">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="p-2 bg-sage/25 text-sage rounded-full h-10 w-10 flex items-center justify-center mx-auto mb-4">
              <Leaf size={20} />
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-charcoal">
              Sustainably & Safely Woven
            </h2>
            <p className="font-sans text-sm text-mid-gray leading-relaxed mt-3">
              We care about our footprint. Our rugs are built with planet-friendly materials to protect both your family and the earth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-light-border bg-warm-gray/10 rounded-sm">
              <span className="p-2.5 bg-blush/40 text-terracotta rounded-full h-10 w-10 flex items-center justify-center mb-5">
                <Leaf size={20} />
              </span>
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-3">Recycled Yarns</h3>
              <p className="font-sans text-sm text-mid-gray leading-relaxed">
                An average 5x8 area rug is woven from **75 recycled plastic water bottles**, keeping waste out of oceans and landfills.
              </p>
            </div>

            <div className="p-6 border border-light-border bg-warm-gray/10 rounded-sm">
              <span className="p-2.5 bg-sage/20 text-sage rounded-full h-10 w-10 flex items-center justify-center mb-5">
                <Shield size={20} />
              </span>
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-3">OEKO-TEX® Certified</h3>
              <p className="font-sans text-sm text-mid-gray leading-relaxed">
                100% free of harmful industrial chemicals and heavy metals. Guaranteed safe, non-toxic, and hypoallergenic for babies and pets.
              </p>
            </div>

            <div className="p-6 border border-light-border bg-warm-gray/10 rounded-sm">
              <span className="p-2.5 bg-charcoal/10 text-charcoal rounded-full h-10 w-10 flex items-center justify-center mb-5">
                <Waves size={20} />
              </span>
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-3">Longer Lifespan</h3>
              <p className="font-sans text-sm text-mid-gray leading-relaxed">
                Most cheap rugs are thrown away when they get dirty. Our washable covers are washed, not discarded, reducing household waste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQs section */}
      <section className="py-16 md:py-24 bg-warm-gray border-t border-light-border">
        <div className="section-container max-w-3xl">
          <h2 className="font-serif text-3xl font-medium text-charcoal text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-light-border bg-ivory rounded-sm">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 font-sans font-semibold text-sm text-charcoal text-left"
                >
                  {faq.q}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 text-stone ${activeFaq === idx ? 'rotate-180 text-charcoal' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-light-border/40">
                        <p className="font-sans text-sm text-mid-gray leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
